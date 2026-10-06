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
| `data/fuentes/indice_manuscrito.csv` | Transcripción del *Índice Fotografías* manuscrito (119 entradas; la entrada N describe el sobre SN), con lecturas dudosas señaladas. |
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
| Fotografía | `C01a20-S20-0004` | Caja-sobre-número, con el nombre de carpeta de la caja (archivo digital: `C1a20-S20-0004.jpg`; reverso con sufijo `r`). |

La **entrada N del índice manuscrito corresponde al sobre SN**. Se registra en la columna `indice_n` de cada fotografía del sobre: por ejemplo, las fotografías del sobre S24 llevan `indice_n` = 24 («Teatro: "El café de Pomona"»). Los sobres desdoblados (S106b, S141b) van con su número. Para registrar una fotografía fuera de lugar, se corrige su `indice_n` a mano y se anota en `observaciones`: por ejemplo, `C101a119-S106-0016` lleva «Sobre 19» en el reverso, así que tiene `indice_n` = 19 y sigue guardada en S106.

## Flujo de trabajo

1. Catalogar en la planilla de Google Sheets (pestañas `inventario_base` e `indice_manuscrito`; su ID está en `data/config.json`).
2. Exportar la pestaña `inventario_base` como CSV y reemplazar `data/fuentes/inventario_base.csv`.
3. `bash scripts/empaquetar.sh`. Esto requiere Python 3, Node 18 o superior y pnpm.
4. Hacer commit y push a `main`. GitHub Pages publica desde la raíz (*Settings → Pages → Deploy from branch → main / root*).

### Reglas de catalogación

- **Signatura:** `C01a20-S20-0004`. Es estable: no se cambia.
- **`indice_n`:** el número de la entrada del índice manuscrito que describe el sobre de la foto (igual al número de sobre). `indice_titulo` se completa solo.
- **Fecha:** formato EDTF, por ejemplo `1956`, `1956-04`, `1950/1955`, `~1956` (circa), `1956?` (incierta) o `195X` (década).
- **Listas** (personas, materias, documentos relacionados, bibliografía): valores separados con `;`, escritos siempre de la misma forma.
- **Título:** si queda vacío, se atribuye (entre corchetes) en este orden: el título de la entrada del índice (`indice_n`) y, si no hay entrada, la leyenda del reverso (`leyenda_reverso`). La ficha indica de dónde se tomó. Sin ninguna de las dos, figura como *Sin título*.
- **Reverso:** `leyenda_reverso` lleva la leyenda descriptiva normalizada, que puede servir de título. `inscripciones_reverso` lleva la transcripción completa: manuscritos, sellos, numeraciones y anotaciones. La ficha muestra siempre anverso y reverso; si el reverso no está digitalizado, lo indica.
- **`publicable` = `no`:** la ficha no se publica.
- **Selección piloto** (`data/config.json → publicacion.criterio`):
  - `con_datos` (actual): se publican solo las fotografías con título catalogado, entrada del índice o información del reverso.
  - `todas`: se publica el inventario completo.

  El inventario y la planilla no cambian; el filtro se aplica al empaquetar.
- **`estado_ficha`:** `pendiente`, `borrador` o `revisada`.

## Imágenes

Las imágenes **no** se guardan en el repositorio. Son unos 1,3 GB y su publicación requiere la autorización de la Fundación.
`data/config.json → imagenes.modo`:

- `drive`: miniaturas servidas desde Google Drive. Solo se ven si las carpetas están compartidas con *cualquier persona con el enlace*.
- `local`: archivos en `media/miniaturas/` y `media/ficha/`, nombrados por signatura.
- `ninguna`: solo se publican las fichas.

Las carpetas de `03_fondo_fotografico` están compartidas con cualquier persona que tenga el enlace. Si una imagen no está disponible, la tarjeta muestra la signatura.
