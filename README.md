# Archivo Fotográfico EFDA

Fondo de consulta del archivo fotográfico de **El Fogón de los Arrieros** (Resistencia, Chaco).
Prototipo del proyecto *El dispositivo expográfico de El Fogón de los Arrieros: colecciones, fotografías y boletín* (SGCyT-UNNE).

**Fase 1 (este prototipo):** consulta de fotografías con ficha, búsqueda, facetas, navegación por ubicación física (cajas y sobres), índice manuscrito y cita académica.
**Fase 2 (si se aprueba):** enriquecimiento documental y atlas hipervisual.

## Estructura

| Ruta | Contenido |
|---|---|
| `index.html` | Sitio empaquetado (un solo archivo, con los datos incluidos). Es lo que publica GitHub Pages. |
| `app/` | Código fuente (React, TypeScript, Tailwind y shadcn/ui). |
| `data/fuentes/indice_manuscrito.csv` | Transcripción del *Índice Fotografías* manuscrito (119 entradas, una por fotografía), con lecturas dudosas señaladas. |
| `data/fuentes/inventario_base.csv` | Inventario: una fila por fotografía, con anverso y reverso emparejados (copia de la planilla de catalogación). |
| `data/fotografias.json`, `data/cajas.json`, `data/indice.json` | Datos que consume el sitio (generados). |
| `data/config.json` | Nombre del archivo, modo de imágenes, facetas y paginación. |
| `scripts/` | `inventario_desde_drive.py` (listado de Drive → inventario), `construir_datos.py` (inventario → JSON), `empaquetar.sh` (todo → `index.html`). |

## Orden de precedencia

**Caja → Sobre → Fotografía.** Cajas y sobres son unidades de resguardo (ubicación física); la fotografía es la unidad de archivo.

| Nivel | Ejemplo | Notas |
|---|---|---|
| Caja | `C01a20` = Caja 1, sobres 01 a 20 | Nombre de la carpeta, sin cambios. |
| Sobre | `S20` | |
| Fotografía | `C1a20-S20-0004` | La signatura es el nombre del archivo digital sin extensión. El reverso lleva el sufijo `r`. |

El índice manuscrito describe **fotografías individuales**. El vínculo entre cada entrada y su fotografía se carga a mano en la columna `indice_n` (por ejemplo, entrada 24 → `C1a20-S20-0004`).

## Flujo de trabajo

1. Catalogar en la planilla de Google Sheets (pestañas `inventario_base` e `indice_manuscrito`; su ID está en `data/config.json`).
2. Exportar la pestaña `inventario_base` como CSV y reemplazar `data/fuentes/inventario_base.csv`.
3. `bash scripts/empaquetar.sh`. Esto requiere Python 3, Node 18 o superior y pnpm.
4. Hacer commit y push a `main`. GitHub Pages publica desde la raíz (*Settings → Pages → Deploy from branch → main / root*).

### Reglas de catalogación

- **Signatura:** la del archivo digital (`C1a20-S20-0004`). Es estable: no se cambia.
- **`indice_n`:** el número de la entrada del índice manuscrito que describe la foto. `indice_titulo` se completa solo.
- **Fecha:** formato EDTF, por ejemplo `1956`, `1956-04`, `1950/1955`, `~1956` (circa), `1956?` (incierta) o `195X` (década).
- **Listas** (personas, materias, documentos relacionados, bibliografía): valores separados con `;`, escritos siempre de la misma forma.
- **Título:** si queda vacío y la foto tiene `indice_n`, se usa el título de esa entrada entre corchetes, como título atribuido. Si no, la ficha figura como *Sin título*.
- **`publicable` = `no`:** la ficha no se publica.
- **`estado_ficha`:** `pendiente`, `borrador` o `revisada`.

## Imágenes

Las imágenes **no** se guardan en el repositorio. Son unos 1,3 GB y su publicación requiere la autorización de la Fundación.
`data/config.json → imagenes.modo`:

- `drive`: miniaturas servidas desde Google Drive. Solo se ven si las carpetas están compartidas con *cualquier persona con el enlace*.
- `local`: archivos en `media/miniaturas/` y `media/ficha/`, nombrados por signatura.
- `ninguna`: solo se publican las fichas.

Las carpetas de `03_fondo_fotografico` están compartidas con cualquier persona que tenga el enlace. Si una imagen no está disponible, la tarjeta muestra la signatura.
