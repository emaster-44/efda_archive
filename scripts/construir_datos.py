#!/usr/bin/env python3
"""Convierte el inventario (CSV exportado de la planilla de catalogación) en los
JSON que consume el sitio.

Entrada:  data/fuentes/inventario_base.csv (o la ruta que se indique)
          data/fuentes/indice_manuscrito.csv
Salida:   data/fotografias.json, data/cajas.json, data/indice.json

Reglas:
- Orden de precedencia: Caja -> Sobre -> Fotografía (unidad de archivo).
- Se excluyen las filas con publicable = "no" y las que no tienen signatura.
- Título: el catalogado; si falta y la foto está vinculada a una entrada del
  índice manuscrito (indice_n), el de esa entrada, marcado como atribuido.
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

LISTAS = ("personas", "materias", "documentos_relacionados", "bibliografia")
TEXTO = (
    "descripcion", "lugar", "evento", "fotografo", "tecnica", "soporte",
    "dimensiones", "inscripciones_reverso", "estado_conservacion", "nota_historica",
    "nota_biografica", "derechos", "observaciones",
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


def main(entrada):
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

        foto = {
            "id": sig,
            "caja": r["caja"].strip(),
            "sobre": r["sobre"].strip(),
            "numero": int(r["numero"]) if (r.get("numero") or "").strip().isdigit() else None,
            "anverso": (r.get("drive_id_anverso") or "").strip(),
            "reverso": (r.get("drive_id_reverso") or "").strip(),
            "archivo": (r.get("archivo_anverso") or "").strip(),
            "estado_ficha": (r.get("estado_ficha") or "pendiente").strip(),
            "titulo": titulo or (entrada_indice["titulo"] if entrada_indice else "Sin título"),
            "titulo_atribuido": not titulo and bool(entrada_indice),
            "sin_titulo": not titulo and not entrada_indice,
        }
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

    # Cajas -> sobres (ubicación física)
    cajas = {}
    for f in fotos:
        c = cajas.setdefault(f["caja"], {"id": f["caja"], "etiqueta": etiqueta_caja(f["caja"]), "sobres": {}})
        s = c["sobres"].setdefault(f["sobre"], {"id": f["sobre"], "cantidad": 0, "portada": f["id"]})
        s["cantidad"] += 1
    lista_cajas = sorted(cajas.values(), key=lambda c: int(re.match(r"C0*(\d+)", c["id"])[1]))
    for i, c in enumerate(lista_cajas, 1):
        c["numero"] = i
        c["sobres"] = sorted(c["sobres"].values(), key=lambda s: clave_sobre(s["id"]))
        c["cantidad"] = sum(s["cantidad"] for s in c["sobres"])

    # Índice manuscrito con sus vínculos
    vinculos = {}
    for f in fotos:
        if f.get("indice_n"):
            vinculos.setdefault(f["indice_n"], []).append(f["id"])
    lista_indice = [
        {"n": n, "titulo": e["titulo"], "lectura_dudosa": e["lectura_dudosa"] == "si",
         "nota": e["nota"], "fotos": vinculos.get(n, [])}
        for n, e in sorted(indice.items())
    ]

    salida = RAIZ / "data"
    (salida / "fotografias.json").write_text(
        json.dumps(fotos, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    (salida / "cajas.json").write_text(json.dumps(lista_cajas, ensure_ascii=False, indent=1), encoding="utf-8")
    (salida / "indice.json").write_text(json.dumps(lista_indice, ensure_ascii=False, indent=1), encoding="utf-8")

    print(f"{len(fotos)} fotografías · {len(lista_cajas)} cajas · "
          f"{sum(len(c['sobres']) for c in lista_cajas)} sobres · "
          f"{sum(1 for e in lista_indice if e['fotos'])}/{len(lista_indice)} entradas del índice vinculadas")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else ENTRADA)
