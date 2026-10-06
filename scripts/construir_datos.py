#!/usr/bin/env python3
"""Convierte el inventario (CSV exportado de la planilla de catalogación) en los
JSON que consume el sitio.

Entrada:  data/fuentes/inventario_base.csv (o la ruta que se indique)
Salida:   data/fotografias.json, data/sobres.json

Reglas:
- Se excluyen las filas con publicable = "no" y las que no tienen signatura.
- Si la ficha no tiene título, se usa el del sobre según el índice manuscrito,
  marcado como título atribuido (entre corchetes, según práctica archivística).
- La fecha se expresa en EDTF (1956, 1956-04, 1950/1955, ~1956, 1956?, 195X).
  Si falta, se intenta inferir el año desde el título del índice y se marca.
- Las listas (personas, materias, documentos_relacionados) se separan con ";".

Uso: python3 scripts/construir_datos.py [inventario.csv]
"""
import csv
import json
import re
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
ENTRADA = RAIZ / "data/fuentes/inventario_base.csv"
INDICE = RAIZ / "data/fuentes/indice_sobres.csv"

LISTAS = ("personas", "materias", "documentos_relacionados", "bibliografia")
TEXTO = (
    "titulo", "descripcion", "lugar", "evento", "fotografo", "tecnica", "soporte",
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
        a, b = (p.strip() for p in f.split("/", 1))
        ra, rb = rango_edtf(a), rango_edtf(b)
        if ra and rb:
            return ra[0], rb[1], calif
        return None
    m = re.match(r"^(\d{3})X", f, re.I)
    if m:
        d = int(m[1]) * 10
        return d, d + 9, "decada"
    m = re.match(r"^(\d{4})", f)
    if m:
        y = int(m[1])
        return y, y, calif
    return None


def main(entrada):
    with INDICE.open(encoding="utf-8") as f:
        indice = {int(r["sobre"]): r for r in csv.DictReader(f)}

    with Path(entrada).open(encoding="utf-8") as f:
        filas = list(csv.DictReader(f))

    fotos, sobres = [], {}
    for r in filas:
        sig = (r.get("signatura") or "").strip()
        if not sig or (r.get("publicable") or "").strip().lower() == "no":
            continue
        sobre = r["sobre"].strip()
        titulo_sobre = (r.get("titulo_sobre_indice") or "").strip()

        foto = {
            "id": sig,
            "sobre": sobre,
            "numero": int(r["numero"]) if r.get("numero", "").isdigit() else None,
            "titulo_sobre": titulo_sobre,
            "titulo_atribuido": not (r.get("titulo") or "").strip(),
            "anverso": (r.get("drive_id_anverso") or "").strip(),
            "reverso": (r.get("drive_id_reverso") or "").strip(),
            "archivo": (r.get("archivo_anverso") or "").strip(),
            "estado_ficha": (r.get("estado_ficha") or "pendiente").strip(),
        }
        for c in TEXTO:
            v = (r.get(c) or "").strip()
            if v:
                foto[c] = v
        for c in LISTAS:
            v = lista(r.get(c))
            if v:
                foto[c] = v
        if foto["titulo_atribuido"]:
            foto["titulo"] = titulo_sobre or "Sin título"

        fecha = (r.get("fecha") or "").strip()
        rango = rango_edtf(fecha)
        if fecha:
            foto["fecha"] = fecha
        elif titulo_sobre:
            m = re.search(r"\b(19\d{2})\b", titulo_sobre)
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
        s = sobres.setdefault(sobre, {
            "id": sobre,
            "titulo": titulo_sobre,
            "lectura_dudosa": (r.get("indice_lectura_dudosa") or "") == "si",
            "cantidad": 0,
            "portada": foto["anverso"],
        })
        s["cantidad"] += 1

    # Sobres listados en el índice pero ausentes en la digitalización
    presentes = {int(re.match(r"S(\d+)", s)[1]) for s in sobres}
    faltantes = [
        {"id": f"S{n:03d}", "titulo": r["titulo_indice"], "cantidad": 0, "faltante": True}
        for n, r in sorted(indice.items()) if n not in presentes
    ]

    clave = lambda f: (f["sobre"], f["numero"] or 0, f["id"])
    fotos.sort(key=clave)
    lista_sobres = sorted(list(sobres.values()) + faltantes, key=lambda s: s["id"])

    salida = RAIZ / "data"
    (salida / "fotografias.json").write_text(
        json.dumps(fotos, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    (salida / "sobres.json").write_text(
        json.dumps(lista_sobres, ensure_ascii=False, indent=1), encoding="utf-8")

    print(f"{len(fotos)} fotografías · {len(sobres)} sobres · {len(faltantes)} sobres del índice sin digitalizar")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else ENTRADA)
