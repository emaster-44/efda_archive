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

Uso: python3 scripts/construir_datos.py [inventario.csv]
"""
import csv
import json
import re
import sys
from pathlib import Path

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
            m = re.search(r"\b(19\d{2})\b", entrada_indice["titulo"])
            if m:
                foto["fecha"] = m[1]
                foto["fecha_inferida"] = True
                rango = (int(m[1]), int(m[1]), "")
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
            s = sobres_entrada.setdefault(f["indice_n"], [])
            if f["sobre"] not in s:
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
