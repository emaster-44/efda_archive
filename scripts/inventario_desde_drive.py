#!/usr/bin/env python3
"""Genera el inventario base del fondo fotográfico a partir del listado de Drive.

Entrada:  JSON con [{title, id, parentId, fileSize}, ...] (listado de imágenes en Drive)
          data/fuentes/indice_sobres.csv (transcripción del índice manuscrito)
Salida:   data/fuentes/inventario_base.csv — una fila por unidad fotográfica,
          con anverso y reverso emparejados y el título del sobre según el índice.

Uso: python3 scripts/inventario_desde_drive.py listado_drive.json
"""
import csv
import json
import re
import sys
from collections import defaultdict
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
INDICE = RAIZ / "data/fuentes/indice_sobres.csv"
SALIDA = RAIZ / "data/fuentes/inventario_base.csv"

# C41a60-S56-0002r.jpg | C101a119-S106b-0017b.jpg | C1a20-S10-0006(1).jpg
PATRON = re.compile(
    r"^C(?P<rango>\d+a\d+)-S(?P<sobre>\d+)(?P<sub>[a-z]?)-(?P<num>\d+)(?P<var>[a-z]?)(?P<dup>\(\d+\))?\.jpe?g$",
    re.I,
)

CAMPOS_CATALOGO = [
    # Identificación y contenido
    "titulo", "descripcion", "personas", "lugar", "fecha", "evento", "materias",
    # Producción y soporte
    "fotografo", "tecnica", "soporte", "dimensiones", "inscripciones_reverso", "estado_conservacion",
    # Enriquecimiento (opcional)
    "nota_historica", "nota_biografica", "documentos_relacionados", "bibliografia",
    # Gestión
    "derechos", "publicable", "estado_ficha", "catalogador", "observaciones",
]


def cargar_indice():
    with INDICE.open(encoding="utf-8") as f:
        return {int(r["sobre"]): r for r in csv.DictReader(f)}


def main(listado_path):
    archivos = json.loads(Path(listado_path).read_text(encoding="utf-8"))
    indice = cargar_indice()

    # Carpeta de Drive -> sobre, para ubicar archivos con nombre no normalizado
    carpeta_sobre = {}
    unidades = defaultdict(dict)
    sueltos, indice_imgs = [], []

    for a in archivos:
        m = PATRON.match(a["title"])
        if not m:
            if "Indice" in a["title"]:
                indice_imgs.append(a)
            else:
                sueltos.append(a)
            continue
        sobre = int(m["sobre"])
        carpeta_sobre[a["parentId"]] = (m["rango"], sobre, m["sub"].lower())
        clave = (sobre, m["sub"].lower(), int(m["num"]), m["var"].lower() if m["var"].lower() != "r" else "")
        lado = "reverso" if m["var"].lower() == "r" else "anverso"
        u = unidades[clave]
        u["rango"] = m["rango"]
        if lado in u:  # duplicado "(1)": se conserva el primero y se anota
            u.setdefault("duplicados", []).append(a["title"])
            continue
        u[lado] = a

    filas = []
    for (sobre, sub, num, var), u in sorted(unidades.items()):
        ref = indice.get(sobre, {})
        sobre_cod = f"S{sobre:03d}{sub}"
        signatura = f"EFDA-F-{sobre_cod}-{num:04d}{var}"
        obs = []
        if "anverso" not in u:
            obs.append("sin anverso digitalizado")
        if u.get("duplicados"):
            obs.append("duplicado en Drive: " + ", ".join(u["duplicados"]))
        filas.append({
            "signatura": signatura,
            "sobre": sobre_cod,
            "numero": num,
            "rango_digitalizacion": "C" + u["rango"],
            "titulo_sobre_indice": ref.get("titulo_indice", ""),
            "indice_lectura_dudosa": ref.get("lectura_dudosa", ""),
            "archivo_anverso": u.get("anverso", {}).get("title", ""),
            "drive_id_anverso": u.get("anverso", {}).get("id", ""),
            "archivo_reverso": u.get("reverso", {}).get("title", ""),
            "drive_id_reverso": u.get("reverso", {}).get("id", ""),
            **{c: "" for c in CAMPOS_CATALOGO},
            "observaciones": "; ".join(obs),
            "estado_ficha": "pendiente",
        })

    # Archivos con nombre no normalizado: se ubican por carpeta y quedan marcados
    for a in sueltos:
        rango, sobre, sub = carpeta_sobre.get(a["parentId"], ("", 0, ""))
        ref = indice.get(sobre, {})
        filas.append({
            "signatura": "", "sobre": f"S{sobre:03d}{sub}" if sobre else "",
            "numero": "", "rango_digitalizacion": "C" + rango if rango else "",
            "titulo_sobre_indice": ref.get("titulo_indice", ""),
            "indice_lectura_dudosa": ref.get("lectura_dudosa", ""),
            "archivo_anverso": a["title"], "drive_id_anverso": a["id"],
            "archivo_reverso": "", "drive_id_reverso": "",
            **{c: "" for c in CAMPOS_CATALOGO},
            "observaciones": "nombre de archivo no normalizado: asignar signatura",
            "estado_ficha": "pendiente",
        })

    columnas = list(filas[0].keys())
    with SALIDA.open("w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=columnas)
        w.writeheader()
        w.writerows(filas)

    sobres = {f["sobre"] for f in filas if f["sobre"]}
    print(f"{len(filas)} unidades en {len(sobres)} sobres -> {SALIDA.relative_to(RAIZ)}")
    print(f"  con reverso: {sum(1 for f in filas if f['archivo_reverso'])}")
    print(f"  sin título en índice: {len({f['sobre'] for f in filas if not f['titulo_sobre_indice']})} sobres")
    print(f"  nombres no normalizados: {len(sueltos)} · páginas del índice: {len(indice_imgs)}")


if __name__ == "__main__":
    main(sys.argv[1])
