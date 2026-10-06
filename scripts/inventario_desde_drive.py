#!/usr/bin/env python3
"""Genera el inventario base del fondo fotográfico a partir del listado de Drive.

Orden de precedencia del fondo: Caja -> Sobre -> Fotografía.
- Caja y sobre son unidades de resguardo (ubicación física).
- La fotografía es la unidad de archivo. Su signatura es caja-sobre-número con el
  nombre de carpeta de la caja (p. ej. C01a20-S20-0004 para el archivo
  C1a20-S20-0004.jpg); el reverso del archivo lleva sufijo "r".
- El índice manuscrito describe fotografías individuales. El vínculo entre una
  entrada del índice y una fotografía (columna indice_n) se carga a mano.

Entrada:  JSON con [{title, id, parentId}, ...] (listado de imágenes en Drive)
Salida:   data/fuentes/inventario_base.csv

Uso: python3 scripts/inventario_desde_drive.py listado_drive.json
"""
import csv
import json
import re
import sys
from collections import defaultdict
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
SALIDA = RAIZ / "data/fuentes/inventario_base.csv"

# C41a60-S56-0002r.jpg | C101a119-S106b-0017b.jpg | C1a20-S10-0006(1).jpg
PATRON = re.compile(
    r"^(?P<base>C(?P<ini>\d+)a(?P<fin>\d+)-(?P<sobre>S\d+[a-z]?)-(?P<num>\d+)(?P<var>[a-z]?))(?P<dup>\(\d+\))?\.jpe?g$",
    re.I,
)

CAMPOS_CATALOGO = [
    "titulo", "descripcion", "personas", "lugar", "fecha", "evento", "materias",
    "fotografo", "tecnica", "soporte", "dimensiones", "inscripciones_reverso", "estado_conservacion",
    "nota_historica", "nota_biografica", "documentos_relacionados", "bibliografia",
    "derechos", "publicable", "estado_ficha", "catalogador", "observaciones",
]


def nombre_caja(ini, fin):
    """Nombre de la carpeta de la caja: C01a20, C21a40, … C120a149."""
    return f"C{int(ini):02d}a{fin}"


def main(listado_path):
    archivos = json.loads(Path(listado_path).read_text(encoding="utf-8"))
    carpeta = {}
    unidades = defaultdict(dict)
    sueltos = []

    for a in archivos:
        if "Indice" in a["title"]:
            continue
        m = PATRON.match(a["title"])
        if not m:
            sueltos.append(a)
            continue
        caja = nombre_caja(m["ini"], m["fin"])
        carpeta[a["parentId"]] = (caja, m["sobre"])
        reverso = m["var"].lower() == "r"
        var = "" if reverso else m["var"]
        sig = f"{caja}-{m['sobre']}-{m['num']}{var}"
        u = unidades[sig]
        u.update(caja=caja, sobre=m["sobre"], numero=int(m["num"]))
        lado = "reverso" if reverso else "anverso"
        if lado in u:
            u.setdefault("duplicados", []).append(a["title"])
        else:
            u[lado] = a

    def orden(sig):
        u = unidades[sig]
        n = re.match(r"S(\d+)([a-z]?)", u["sobre"])
        return (int(n[1]), n[2], u["numero"], sig)

    filas = []
    for sig in sorted(unidades, key=orden):
        u = unidades[sig]
        obs = []
        if "anverso" not in u:
            obs.append("sin anverso digitalizado")
        if u.get("duplicados"):
            obs.append("duplicado en Drive: " + ", ".join(u["duplicados"]))
        filas.append({
            "signatura": sig, "caja": u["caja"], "sobre": u["sobre"], "numero": u["numero"],
            "indice_n": "", "indice_titulo": "",
            "archivo_anverso": u.get("anverso", {}).get("title", ""),
            "drive_id_anverso": u.get("anverso", {}).get("id", ""),
            "archivo_reverso": u.get("reverso", {}).get("title", ""),
            "drive_id_reverso": u.get("reverso", {}).get("id", ""),
            **{c: "" for c in CAMPOS_CATALOGO},
            "estado_ficha": "pendiente",
            "observaciones": "; ".join(obs),
        })

    for a in sueltos:
        caja, sobre = carpeta.get(a["parentId"], ("", ""))
        filas.append({
            "signatura": "", "caja": caja, "sobre": sobre, "numero": "",
            "indice_n": "", "indice_titulo": "",
            "archivo_anverso": a["title"], "drive_id_anverso": a["id"],
            "archivo_reverso": "", "drive_id_reverso": "",
            **{c: "" for c in CAMPOS_CATALOGO},
            "estado_ficha": "pendiente",
            "observaciones": "nombre de archivo no normalizado: asignar signatura",
        })

    with SALIDA.open("w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=list(filas[0].keys()))
        w.writeheader()
        w.writerows(filas)
    print(f"{len(filas)} fotografías -> {SALIDA.relative_to(RAIZ)} ({len(sueltos)} con nombre no normalizado)")


if __name__ == "__main__":
    main(sys.argv[1])
