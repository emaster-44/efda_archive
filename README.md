# Archivo Fotográfico EFDA

Fondo de consulta del archivo fotográfico de **El Fogón de los Arrieros** (Resistencia, Chaco).
Prototipo del proyecto *El dispositivo expográfico de El Fogón de los Arrieros: colecciones, fotografías y boletín* (SGCyT-UNNE).

**Fase 1 (este prototipo):** consulta de fotografías con ficha, búsqueda, facetas, navegación por el orden original (sobres e índice manuscrito) y cita académica.
**Fase 2 (si se aprueba):** enriquecimiento documental y atlas hipervisual.

## Estructura

| Ruta | Contenido |
|---|---|
| `index.html` | Sitio empaquetado (un solo archivo, con los datos incluidos). Es lo que publica GitHub Pages. |
| `app/` | Código fuente (React, TypeScript, Tailwind y shadcn/ui). |
| `data/fuentes/indice_sobres.csv` | Transcripción del *Índice Fotografías* manuscrito (sobres 1–119), con lecturas dudosas señaladas. |
| `data/fuentes/inventario_base.csv` | Inventario: una fila por fotografía, con anverso y reverso emparejados y columnas de catalogación vacías. |
| `data/fotografias.json`, `data/sobres.json` | Datos que consume el sitio (generados). |
| `data/config.json` | Nombre del archivo, modo de imágenes, facetas y paginación. |
| `scripts/` | `inventario_desde_drive.py` (listado de Drive → inventario), `construir_datos.py` (inventario → JSON), `empaquetar.sh` (todo → `index.html`). |

## Flujo de trabajo

1. Catalogar en la planilla (importar `data/fuentes/inventario_base.csv` a Google Sheets).
2. Exportar la planilla como CSV y reemplazar `data/fuentes/inventario_base.csv`.
3. `bash scripts/empaquetar.sh`. Esto requiere Python 3, Node 18 o superior y pnpm.
4. Hacer commit y push a `main`. GitHub Pages publica desde la raíz (*Settings → Pages → Deploy from branch → main / root*).

### Reglas de catalogación

- **Signatura:** `EFDA-F-S<sobre>-<número>` (por ejemplo, `EFDA-F-S030-0001`). Es estable: no se cambia.
- **Fecha:** formato EDTF, por ejemplo `1956`, `1956-04`, `1950/1955`, `~1956` (circa), `1956?` (incierta) o `195X` (década).
- **Listas** (personas, materias, documentos relacionados, bibliografía): valores separados con `;`, escritos siempre de la misma forma.
- **Título:** si queda vacío, se usa el del índice del sobre y se muestra entre corchetes como título atribuido.
- **`publicable` = `no`:** la ficha no se publica.
- **`estado_ficha`:** `pendiente`, `borrador` o `revisada`.

## Imágenes

Las imágenes **no** se guardan en el repositorio. Son unos 1,3 GB y su publicación requiere la autorización de la Fundación.
`data/config.json → imagenes.modo`:

- `drive`: miniaturas servidas desde Google Drive. Solo se ven si las carpetas están compartidas con *cualquier persona con el enlace*.
- `local`: archivos en `media/miniaturas/` y `media/ficha/`, nombrados por signatura.
- `ninguna`: solo se publican las fichas.

Si una imagen no está disponible, la tarjeta muestra la signatura.
