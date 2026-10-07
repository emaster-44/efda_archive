#!/usr/bin/env python3
"""Convierte el inventario (CSV exportado de la planilla de catalogación) en los
JSON que consume el sitio.

Entrada:  data/fuentes/inventario_base.csv (o la ruta que se indique)
          data/fuentes/indice_manuscrito.csv
Salida:   data/fotografias.json, data/cajas.json, data/indice.json

Reglas:
- Orden de precedencia: Caja -> Sobre -> Fotografía (unidad de archivo).
- Se excluyen las filas con publicable = "no" y las que no tienen signatura.
- config.json → publicacion.criterio: "con_datos" publica solo las fotos con
  título catalogado, entrada del índice o información del reverso
  (leyenda o inscripciones); "todas" publica el inventario completo.
- Índice manuscrito: la entrada N corresponde al sobre SN (indice_n = N en todas
  las fotos del sobre; los sobres desdoblados, p. ej. S106b, van con su número).
- Título, en este orden: el catalogado; el de la entrada del índice manuscrito
  vinculada (indice_n); la leyenda transcripta del reverso (leyenda_reverso).
  Los dos últimos se marcan como atribuidos y registran su fuente.
- Fecha en EDTF (1956, 1956-04, 1950/1955, ~1956, 1956?, 195X).
- Listas (personas, materias, documentos_relacionados, bibliografia) separadas con ";".
- Normalización piloto (data/fuentes/normalizacion_piloto.csv, generada por
  scripts/normalizacion.py): los valores de la planilla en personas, lugar,
  fotografo y evento se muestran en su forma normalizada; si están vacíos se
  completan desde indice_titulo, leyenda_reverso e inscripciones_reverso. Los
  nombres sueltos («Hilda», «Aldo») solo se vinculan si el nombre completo está en
  el mismo sobre o entrada del índice. El evento sale de un recorte periodístico
  (±7 días y una persona o palabra clave en común) o, en teatro, de la obra. Cada
  foto registra el origen y la confianza en `normalizacion`.

Uso: python3 scripts/construir_datos.py [inventario.csv]
"""
import csv
import json
import re
import sys
from collections import defaultdict
from datetime import date
from pathlib import Path

from normalizacion import (
    MESES, RANGO_CONFIANZA, RECORTES, TABLA, clasificar, fecha_recorte, plegar, regla_a, representacion,
    separar_menciones,
)

RAIZ = Path(__file__).resolve().parent.parent
ENTRADA = RAIZ / "data/fuentes/inventario_base.csv"
INDICE = RAIZ / "data/fuentes/indice_manuscrito.csv"
CONFIG = RAIZ / "data/config.json"

LISTAS = ("personas", "materias", "documentos_relacionados", "bibliografia")
TEXTO = (
    "descripcion", "lugar", "evento", "fotografo", "tecnica", "soporte",
    "dimensiones", "inscripciones_reverso", "estado_conservacion", "nota_historica",
    "nota_biografica", "derechos", "observaciones", "leyenda_reverso",
)


def lista(valor):
    return [v.strip() for v in (valor or "").split(";") if v.strip()]


def rango_edtf(fecha):
    """Devuelve (año_inicio, año_fin, calificador) o None."""
    f = (fecha or "").strip()
    if not f:
        return None
    calif = ""
    if f.startswith("~") or f.endswith("~"):
        calif = "circa"
    elif f.endswith("?"):
        calif = "incierta"
    f = f.strip("~?%")
    if "/" in f:
        a, b = (rango_edtf(p) for p in f.split("/", 1))
        return (a[0], b[1], calif) if a and b else None
    m = re.match(r"^(\d{3})X", f, re.I)
    if m:
        d = int(m[1]) * 10
        return d, d + 9, "decada"
    m = re.match(r"^(\d{4})", f)
    return (int(m[1]), int(m[1]), calif) if m else None


def etiqueta_caja(nombre):
    m = re.match(r"C0*(\d+)a(\d+)", nombre)
    return f"Sobres {int(m[1]):02d} a {int(m[2]):02d}" if m else nombre


def tiene_datos(f):
    """Criterio "con_datos": título propio, entrada del índice o datos del reverso."""
    return bool(
        not f["sin_titulo"] or f.get("indice_n")
        or f.get("leyenda_reverso") or f.get("inscripciones_reverso")
    )


_MES = "(" + "|".join(sorted(MESES, key=len, reverse=True)) + ")"


def fecha_indice(titulo, dudosa):
    """Fecha de una entrada del índice → EDTF («3 de junio de 1961», «Abril de 1956», «30-6-61», «1959»)."""
    t = plegar(titulo)
    m = re.search(rf"\b(\d{{1,2}}) de {_MES} de (\d{{4}})\b", t)
    if m:
        return f"{m[3]}-{MESES[m[2]]:02d}-{int(m[1]):02d}"
    m = re.search(r"\b(\d{1,2}) (\d{1,2}) (\d{2})\b", t)
    if m:
        return f"19{m[3]}-{int(m[2]):02d}-{int(m[1]):02d}" + ("?" if dudosa else "")
    m = re.search(rf"\b{_MES} de (\d{{4}})\b", t)
    if m:
        return f"{m[2]}-{MESES[m[1]]:02d}"
    m = re.search(r"\b(19\d{2})\b", t)
    return m[1] if m else ""


# ---------------------------------------------------------------- normalización piloto

SELLOS = re.compile(r"^\s*(sello|marca de agua|logotipo|impreso)", re.I)
CAMPOS_TEXTO = ("indice_titulo", "leyenda_reverso", "inscripciones_reverso")
NO_CLAVE = set(
    "fogon arrieros resistencia chaco chaqueno chaquena sobre entre desde hasta para durante nuestro nuestra "
    "nuevo nueva nuevos nuevas ciudad provincia cultura cultural fueron estuvo tiene donde cuando porque como "
    "habia otros otras todos todas muestra senor senora".split()
)


def peor(*confianzas):
    return max(confianzas, key=RANGO_CONFIANZA.get)


def patron(claves, prefijo=""):
    alt = "|".join(re.escape(k) for k in sorted(claves, key=len, reverse=True))
    return re.compile(rf"(?<![a-z0-9]){prefijo}({alt})(?![a-z0-9])")


def dias(edtf):
    """EDTF con día (o intervalo de días) → (desde, hasta) como date; si no tiene día, None."""
    partes = (edtf or "").strip("~?%").split("/")
    try:
        ds = [date.fromisoformat(p.strip("~?%")) for p in partes if re.fullmatch(r"\d{4}-\d{2}-\d{2}", p.strip("~?%"))]
    except ValueError:
        return None
    return (ds[0], ds[-1]) if len(ds) == len(partes) and ds else None


def distancia(a, b):
    return max(0, (b[0] - a[1]).days, (a[0] - b[1]).days)


def palabras(texto):
    return {w for w in plegar(texto).split() if len(w) >= 5 and w not in NO_CLAVE}


class Normalizador:
    def __init__(self):
        self.filas = defaultdict(dict)
        with TABLA.open(encoding="utf-8") as fh:
            for r in csv.DictReader(fh):
                self.filas[r["tipo"]][plegar(r["variante"])] = r
        per = self.filas["persona"]
        self.re_persona = patron([k for k, r in per.items() if len(k.split()) >= 2])
        self.re_suelto = patron([k for k, r in per.items() if len(k.split()) == 1])
        lug = self.filas["lugar"]
        self.re_lugar = patron([k for k in lug if len(k.split()) >= 2])
        self.re_lugar_en = patron([k for k in lug if len(k.split()) == 1], r"en (?:la ciudad de )?")
        self.re_fotografo = patron(self.filas["fotografo"])
        self.re_obra = patron(self.filas["obra"])
        # Mayúsculas de nombres propios para los titulares en mayúsculas sostenidas
        self.mayusculas = {}
        for tipo in ("persona", "lugar", "institucion"):
            for r in self.filas[tipo].values():
                for w in re.findall(r"[^\W\d_]+", r["forma_normalizada"]):
                    if w[:1].isupper() and len(w) > 2:
                        self.mayusculas.setdefault(plegar(w), w)

    def fila(self, tipo, valor):
        return self.filas[tipo].get(plegar(valor)) or self.filas[tipo].get(plegar(regla_a(valor)))

    def oracion(self, titular):
        """Titular → mayúscula inicial (los nombres propios conocidos conservan la suya)."""
        letras = [c for c in titular if c.isalpha()]
        t = titular.strip()
        if letras and sum(c.isupper() for c in letras) / len(letras) > 0.7:
            t = re.sub(r"[^\W\d_]+", lambda m: self.mayusculas.get(plegar(m[0]), m[0].lower()), t.lower())
        return t[:1].upper() + t[1:]


def textos(f):
    if f.get("numero") == 1:  # escaneo del sobre, no una fotografía: no se completa desde los textos
        return
    for campo in CAMPOS_TEXTO:
        v = f.get(campo) or ""
        if campo == "inscripciones_reverso":
            v = " | ".join(s for s in v.split("|") if not SELLOS.match(s))
        if v:
            yield campo, v


def normalizar(fotos, indice, recortes, nz):
    dudosas = {n for n, e in indice.items() if e["lectura_dudosa"] == "si"}
    previo = {}
    # 1. Personas con nombre completo (y nombres sueltos pendientes) por foto
    for f in fotos:
        llenos, sueltos, excluidos, origenes = [], [], [], []
        if f.get("personas"):
            origen_campo = "planilla"
            for v in f["personas"]:
                r = nz.fila("persona", v)
                if nz.fila("institucion", v) or clasificar(v) == "institucion":
                    excluidos.append(v)
                elif r and r["forma_normalizada"] and len(regla_a(v).split()) >= 2:
                    llenos.append((r["forma_normalizada"], r["n_llave"], r["origen"], r["confianza"], "personas"))
                elif len(regla_a(v).split()) < 2 or (r and not r["forma_normalizada"]):
                    sueltos.append((regla_a(v), "personas", "media", v))
                else:
                    llenos.append((regla_a(v), "", "regla", "media", "personas"))
        else:
            origen_campo = "texto"
            for campo, texto in textos(f):
                conf = "baja" if campo == "indice_titulo" and f.get("indice_n") in dudosas else "alta"
                t = plegar(texto)
                for m in nz.re_persona.finditer(t):
                    r = nz.filas["persona"][m[1]]
                    if t[:m.start()].endswith("foto "):  # «Foto Grete Stern»: autora, no retratada
                        continue
                    if r["forma_normalizada"]:
                        llenos.append((r["forma_normalizada"], r["n_llave"], r["origen"], peor(r["confianza"], conf), campo))
                    else:
                        excluidos.append(r["variante"])
                t = nz.re_persona.sub(lambda m: " " * len(m[0]), t)
                for m in nz.re_suelto.finditer(t):
                    sueltos.append((nz.filas["persona"][m[1]]["variante"], campo, peor("media", conf), m[1]))
        previo[f["id"]] = (llenos, sueltos, excluidos, origen_campo)

    # 2. Contexto: nombres completos del mismo sobre y de la misma entrada del índice
    ctx_sobre, ctx_indice = defaultdict(set), defaultdict(set)
    for f in fotos:
        for forma, *_ in previo[f["id"]][0]:
            ctx_sobre[f["sobre"]].add(forma)
            if f.get("indice_n"):
                ctx_indice[f["indice_n"]].add(forma)

    for f in fotos:
        llenos, sueltos, excluidos, origen_campo = previo[f["id"]]
        ctx = ctx_sobre[f["sobre"]] | ctx_indice.get(f.get("indice_n"), set())
        resueltos = []
        for nombre, campo, conf, variante in sueltos:
            clave = plegar(nombre)
            cand = {c for c in ctx if clave and clave in plegar(c).split()}
            if len(cand) == 1:
                forma = cand.pop()
                resueltos.append((forma, "", "regla", conf, campo))
            elif (r := nz.filas["persona"].get(clave)) and r["forma_normalizada"]:
                # Nombre suelto consignado por el equipo (SUELTOS_CONSIGNADOS)
                resueltos.append((r["forma_normalizada"], r["n_llave"], r["origen"], peor(r["confianza"], conf), campo))
            else:
                excluidos.append(variante if isinstance(variante, str) and not variante.islower() else nombre)
        personas, vistos = [], set()
        for forma, llave, origen, conf, campo in llenos + resueltos:
            if forma not in vistos:
                vistos.add(forma)
                personas.append((forma, llave, origen, conf, campo))
        if personas:
            f["personas"] = [p[0] for p in personas]
            f.setdefault("normalizacion", {})["personas"] = {
                "origen": ", ".join(sorted({p[2] for p in personas}, key=lambda o: o)),
                "confianza": peor(*(p[3] for p in personas)),
                "fuente": origen_campo if origen_campo == "planilla" else ", ".join(sorted({p[4] for p in personas})),
                "detalle": [{"forma": p[0], **({"n_llave": p[1]} if p[1] else {}), "origen": p[2], "confianza": p[3]}
                            for p in personas],
            }
        elif "personas" in f:
            del f["personas"]
        if excluidos:
            f.setdefault("normalizacion", {}).setdefault("personas", {})["excluidos"] = sorted(set(excluidos))

    # 3. Lugar y fotógrafo
    for f in fotos:
        for campo, tipo in (("lugar", "lugar"), ("fotografo", "fotografo")):
            v = f.get(campo)
            if v:
                r = nz.fila(tipo, v)
                if r:
                    f[campo] = r["forma_normalizada"]
                    f.setdefault("normalizacion", {})[campo] = {
                        "origen": r["origen"], "confianza": r["confianza"], "fuente": "planilla", "variante": v}
                continue
            hallado = None
            for fuente, texto in textos(f):
                t = plegar(texto)
                if tipo == "lugar":
                    t = nz.re_persona.sub(lambda m: " " * len(m[0]), t)
                    m = nz.re_lugar.search(t) or nz.re_lugar_en.search(t)
                else:
                    if fuente == "indice_titulo":
                        continue
                    t = plegar(f.get("inscripciones_reverso") or texto)
                    m = nz.re_fotografo.search(t)
                if m:
                    hallado = (nz.filas[tipo][m[1]], fuente)
                    break
            if hallado:
                r, fuente = hallado
                f[campo] = r["forma_normalizada"]
                f.setdefault("normalizacion", {})[campo] = {
                    "origen": r["origen"], "confianza": r["confianza"], "fuente": fuente, "variante": r["variante"]}

    # 4. Evento: planilla normalizada; si no, recorte periodístico (±7 días y persona o palabra clave
    #    en común); si no, la obra teatral de la entrada del índice o del reverso
    for f in fotos:
        v = f.get("evento")
        if v:
            r = nz.fila("evento", v)
            f.setdefault("normalizacion", {})["evento"] = {
                "origen": r["origen"] if r else "planilla", "confianza": r["confianza"] if r else "alta",
                "fuente": "planilla", **({"variante": v} if r and r["forma_normalizada"] != v else {})}
            if r:
                f["evento"] = r["forma_normalizada"]
            continue
        if f.get("numero") == 1:
            continue
        rango = dias(f.get("fecha"))
        candidatos = []
        if rango:
            personas = set(f.get("personas", []))
            claves = palabras(" ".join(f.get(c, "") for c in ("indice_titulo", "leyenda_reverso", "titulo")))
            for rec in recortes:
                d = distancia(rango, rec["dias"])
                if d > 7:
                    continue
                comunes, clave_comun = personas & rec["personas"], claves & rec["claves"]
                if comunes or clave_comun:
                    candidatos.append((-len(comunes), -len(clave_comun), d, rec, sorted(comunes), sorted(clave_comun)))
        if candidatos:
            candidatos.sort(key=lambda c: c[:3])
            _, _, d, rec, comunes, clave_comun = candidatos[0]
            f["evento"] = nz.oracion(rec["titular"])
            f.setdefault("normalizacion", {})["evento"] = {
                "origen": "recortes", "fuente": rec["fuente"], "medio": rec["medio"], "fecha": rec["fecha"],
                "confianza": "media" if len(candidatos) == 1 else "baja", "dias": d,
                **({"personas_comunes": comunes} if comunes else {}),
                **({"palabras_comunes": clave_comun} if clave_comun else {}),
                **({"candidatos": len(candidatos)} if len(candidatos) > 1 else {}),
            }
            continue
        obra, fuente = None, None
        it = f.get("indice_titulo") or ""
        if re.match(r"teatro\b", plegar(it)):
            m = nz.re_obra.search(plegar(it))
            if m:
                obra, fuente = representacion(nz.filas["obra"][m[1]]["forma_normalizada"]), "indice_titulo"
            else:
                m = re.search(r"[Oo]bra de ([^–-]+?)\s*(?:[–-]|$)", it)
                if m:
                    leido = "leído" in it
                    obra = f"{'Teatro leído: una obra' if leido else 'Representación de una obra'} de {m[1].strip()}"
                    fuente = "indice_titulo"
        if not obra and f.get("leyenda_reverso"):
            m = nz.re_obra.search(plegar(f["leyenda_reverso"]))
            if m and re.search(r"[«“\"]", f["leyenda_reverso"]):
                obra, fuente = representacion(nz.filas["obra"][m[1]]["forma_normalizada"]), "leyenda_reverso"
        if obra:
            f["evento"] = obra
            f.setdefault("normalizacion", {})["evento"] = {"origen": "regla", "confianza": "media", "fuente": fuente}


def leer_recortes(nz):
    recortes = []
    with RECORTES.open(encoding="utf-8") as fh:
        for r in csv.DictReader(fh):
            fecha = fecha_recorte(r["Fecha"], r["Fuente"])
            rango = dias(fecha)
            if not rango:
                continue
            personas = set()
            for m in separar_menciones(r["Personas o instituciones mencionadas"]):
                fila = nz.fila("persona", m)
                if fila and fila["forma_normalizada"] and len(regla_a(m).split()) >= 2:
                    personas.add(fila["forma_normalizada"])
            recortes.append({
                "fuente": r["Fuente"].split(" - ")[0].strip(), "medio": r["Medio/Publicación"].strip(),
                "fecha": fecha, "dias": rango, "titular": r["Titular o tema del recorte"].strip(),
                "personas": personas, "claves": palabras(r["Titular o tema del recorte"]),
            })
    return recortes


def main(entrada):
    criterio = json.loads(CONFIG.read_text(encoding="utf-8")).get("publicacion", {}).get("criterio", "todas")
    with INDICE.open(encoding="utf-8") as f:
        indice = {int(r["n"]): r for r in csv.DictReader(f)}
    with Path(entrada).open(encoding="utf-8") as f:
        filas = list(csv.DictReader(f))

    fotos = []
    for r in filas:
        sig = (r.get("signatura") or "").strip()
        if not sig or (r.get("publicable") or "").strip().lower() == "no":
            continue
        n_raw = (r.get("indice_n") or "").strip()
        indice_n = int(float(n_raw)) if re.fullmatch(r"\d+(\.0)?", n_raw) else None
        entrada_indice = indice.get(indice_n) if indice_n else None
        titulo = (r.get("titulo") or "").strip()
        leyenda = (r.get("leyenda_reverso") or "").strip()
        if titulo:
            titulo_final, fuente = titulo, None
        elif entrada_indice:
            titulo_final, fuente = entrada_indice["titulo"], "indice"
        elif leyenda:
            titulo_final, fuente = leyenda, "reverso"
        else:
            titulo_final, fuente = "Sin título", None

        foto = {
            "id": sig,
            "caja": r["caja"].strip(),
            "sobre": r["sobre"].strip(),
            "numero": int(r["numero"]) if (r.get("numero") or "").strip().isdigit() else None,
            "anverso": (r.get("drive_id_anverso") or "").strip(),
            "reverso": (r.get("drive_id_reverso") or "").strip(),
            "archivo": (r.get("archivo_anverso") or "").strip(),
            "estado_ficha": (r.get("estado_ficha") or "pendiente").strip(),
            "titulo": titulo_final,
            "titulo_atribuido": fuente is not None,
            "sin_titulo": not titulo and fuente is None,
        }
        if fuente:
            foto["titulo_fuente"] = fuente
        if entrada_indice:
            foto["indice_n"] = indice_n
            foto["indice_titulo"] = entrada_indice["titulo"]
        for c in TEXTO:
            v = (r.get(c) or "").strip()
            if v:
                foto[c] = v
        for c in LISTAS:
            v = lista(r.get(c))
            if v:
                foto[c] = v

        fecha = (r.get("fecha") or "").strip()
        rango = rango_edtf(fecha)
        if fecha:
            foto["fecha"] = fecha
        elif entrada_indice:
            inferida = fecha_indice(entrada_indice["titulo"], entrada_indice["lectura_dudosa"] == "si")
            if inferida:
                foto["fecha"] = inferida
                foto["fecha_inferida"] = True
                foto["normalizacion"] = {"fecha": {"origen": "indice", "confianza": "media", "fuente": "indice_titulo"}}
                rango = rango_edtf(inferida)
        if rango:
            foto["anio_desde"], foto["anio_hasta"] = rango[0], rango[1]
            foto["decada"] = f"{rango[0] // 10 * 10}s"
            if rango[2]:
                foto["fecha_calificador"] = rango[2]
        fotos.append(foto)

    def clave_sobre(s):
        m = re.match(r"S(\d+)([a-z]?)", s)
        return (int(m[1]), m[2])

    fotos.sort(key=lambda f: (clave_sobre(f["sobre"]), f["numero"] or 0, f["id"]))
    nz = Normalizador()
    normalizar(fotos, indice, leer_recortes(nz), nz)

    # El número de caja sale del inventario completo, para que no cambie al filtrar
    nombres_caja = sorted({f["caja"] for f in fotos}, key=lambda c: int(re.match(r"C0*(\d+)", c)[1]))
    numero_caja = {c: i for i, c in enumerate(nombres_caja, 1)}
    inventario = len(fotos)
    if criterio == "con_datos":
        fotos = [f for f in fotos if tiene_datos(f)]

    # Cajas -> sobres (ubicación física)
    cajas = {}
    for f in fotos:
        c = cajas.setdefault(f["caja"], {"id": f["caja"], "etiqueta": etiqueta_caja(f["caja"]), "sobres": {}})
        s = c["sobres"].setdefault(f["sobre"], {"id": f["sobre"], "cantidad": 0, "portada": f["id"]})
        s["cantidad"] += 1
    lista_cajas = sorted(cajas.values(), key=lambda c: int(re.match(r"C0*(\d+)", c["id"])[1]))
    for c in lista_cajas:
        c["numero"] = numero_caja[c["id"]]
        c["sobres"] = sorted(c["sobres"].values(), key=lambda s: clave_sobre(s["id"]))
        c["cantidad"] = sum(s["cantidad"] for s in c["sobres"])

    # Índice manuscrito con sus vínculos
    vinculos, sobres_entrada = {}, {}
    for f in fotos:
        if f.get("indice_n"):
            vinculos.setdefault(f["indice_n"], []).append(f["id"])
            # Solo el sobre propio de la entrada (SN); las fotos fuera de lugar
            # se vinculan a la entrada sin sumar su sobre de guarda.
            s = sobres_entrada.setdefault(f["indice_n"], [])
            if int(re.match(r"S(\d+)", f["sobre"])[1]) == f["indice_n"] and f["sobre"] not in s:
                s.append(f["sobre"])
    lista_indice = [
        {"n": n, "titulo": e["titulo"], "lectura_dudosa": e["lectura_dudosa"] == "si",
         "nota": e["nota"], "fotos": vinculos.get(n, []), "sobres": sobres_entrada.get(n, [])}
        for n, e in sorted(indice.items())
    ]

    salida = RAIZ / "data"
    (salida / "fotografias.json").write_text(
        json.dumps(fotos, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    (salida / "cajas.json").write_text(json.dumps(lista_cajas, ensure_ascii=False, indent=1), encoding="utf-8")
    (salida / "indice.json").write_text(json.dumps(lista_indice, ensure_ascii=False, indent=1), encoding="utf-8")
    (salida / "resumen.json").write_text(json.dumps({
        "criterio": criterio, "inventario": inventario, "publicadas": len(fotos),
        "cajas_inventario": len(nombres_caja),
    }, ensure_ascii=False, indent=1), encoding="utf-8")

    fuentes = {k: sum(1 for f in fotos if f.get("titulo_fuente") == k) for k in ("indice", "reverso")}
    print(f"{len(fotos)} de {inventario} fotografías publicadas (criterio: {criterio}) · {len(lista_cajas)} cajas · "
          f"{sum(len(c['sobres']) for c in lista_cajas)} sobres · "
          f"{sum(1 for e in lista_indice if e['fotos'])}/{len(lista_indice)} entradas del índice vinculadas · "
          f"títulos del índice: {fuentes['indice']}, del reverso: {fuentes['reverso']} · "
          f"reversos digitalizados: {sum(1 for f in fotos if f['reverso'])}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else ENTRADA)
