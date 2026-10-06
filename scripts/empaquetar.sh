#!/usr/bin/env bash
# Regenera los datos y empaqueta el sitio en un único index.html (raíz del repo) para GitHub Pages.
# Uso: bash scripts/empaquetar.sh [inventario.csv]
set -euo pipefail
cd "$(dirname "$0")/.."
python3 scripts/construir_datos.py "${1:-data/fuentes/inventario_base.csv}"
cd app
[ -d node_modules ] || pnpm install
pnpm exec tsc -b
rm -rf dist .parcel-cache
pnpm exec parcel build index.html --dist-dir dist --no-source-maps
pnpm exec html-inline dist/index.html > ../index.html
echo "index.html actualizado ($(du -h ../index.html | cut -f1))"
