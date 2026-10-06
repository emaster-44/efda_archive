# Contexto para Claude: Archivo Fotográfico EFDA

Fondo de consulta del archivo fotográfico de El Fogón de los Arrieros (Resistencia, Chaco). Es el prototipo de fase 1 del proyecto SGCyT-UNNE *El dispositivo expográfico de El Fogón de los Arrieros: colecciones, fotografías y boletín*. El investigador responsable trabaja en español.

## Cómo trabajar con el usuario
- Responder en español, con resúmenes ejecutivos y listas de tareas. No pegar archivos completos: indicar la ruta y la función.
- **Respetar el orden de precedencia del fondo y no reinterpretar su estructura sin confirmación.** Ante una evidencia nueva (por ejemplo, una anotación en un reverso), informarla de forma neutral y esperar la decisión del usuario.
- No descargar ni abrir fotos del fondo sin necesidad.

## Recursos
- Sitio: https://emaster-44.github.io/efda_archive/. GitHub Pages publica desde `main`, en la raíz (`index.html`).
- Planilla maestra (fuente de verdad): Google Sheets `11u4hZu6P0aiuukPV4WYlq7kXzvc4wT8sjt8O_7KB_mw`. Pestañas `inventario_base` e `indice_manuscrito`. El locale usa `;` como separador en las fórmulas.
- Drive: carpeta `EFDA_KB` (`1UYyHkEJ8H6FJOnx1jkBwEE78BmbWzROR`); fotos en `03_fondo_fotografico` (`1yGh67EmX9lZEz0O5QWBNw9bz-YrC7BwZ`), compartida con cualquier persona que tenga el enlace.

## Modelo archivístico
- **Caja → Sobre → Fotografía.** Cajas y sobres son unidades de resguardo; la fotografía es la unidad de archivo.
- Las cajas conservan el nombre de su carpeta: `C01a20` es «Caja 1 · Sobres 01 a 20».
- **Signatura:** `C01a20-S20-0004`. Es estable y no se cambia. El archivo digital correspondiente es `C1a20-S20-0004.jpg`, y su reverso, `…r.jpg`.
- **Índice manuscrito:** la entrada N describe el sobre SN. Se registra en `indice_n` de cada foto. Los sobres desdoblados (S106b, S141b) van con su número.
  - Las fotos fuera de lugar llevan el `indice_n` que indica su reverso y una nota en `observaciones`. Por ejemplo, `C101a119-S106-0016` va con la entrada 19 y `S106-0017` con la 69.
- **Título**, en este orden de prioridad:
  1. `titulo` catalogado;
  2. entrada del índice, entre corchetes;
  3. `leyenda_reverso`, entre corchetes;
  4. *Sin título*.
- **Reverso:** `leyenda_reverso` lleva la leyenda normalizada e `inscripciones_reverso` la transcripción completa (manuscritos, sellos, números). Los 150 reversos digitalizados están transcriptos, con `estado_ficha` = `borrador`.
- **Fechas** en EDTF. **Listas** separadas con `;`.

## Publicación
- `data/config.json → publicacion.criterio`:
  - `con_datos` (piloto actual): solo las fotos con título, entrada del índice o datos del reverso; hoy son 1.634 de 1.755.
  - `todas`: el inventario completo.
- Flujo de actualización:
  1. Editar la planilla.
  2. Exportar la pestaña `inventario_base` como CSV a `data/fuentes/inventario_base.csv` (y el índice a `data/fuentes/indice_manuscrito.csv`).
  3. Correr `bash scripts/empaquetar.sh`.
  4. Abrir un PR a `main` y mergearlo.
- Scripts: `scripts/construir_datos.py` (CSV → JSON y reglas de título y publicación) y `scripts/inventario_desde_drive.py` (listado de Drive → inventario).
- App: `app/src` (React, Vite, Tailwind y MiniSearch). Las vistas están en `app/src/vistas`; los datos y tipos, en `app/src/lib/datos.ts`.

## Pendientes
- **Lista de autoridades de personas** (pestaña `personas` con forma normalizada, variantes y nota biográfica) y **página por persona**. Hoy la misma persona aparece de varias formas: «Hilda» / «Hilda Torres Varela», «Aldo» / «Aldo Boglietti».
- Revisar las 150 fichas en borrador y las entradas del índice marcadas como dudosas.
- Sobres S120 a S149 (121 fotos): no tienen entrada en el índice; hace falta escanear reversos o que el usuario aporte títulos.
- Asignar signatura a los 4 archivos de Oscar Alemán que están sin normalizar en S56.
- Verificar que las miniaturas de Drive carguen en el sitio publicado; si no cargan, evaluar `imagenes.modo = local`, con autorización de la Fundación.
- Fase 2, si se aprueba: enriquecimiento documental y atlas hipervisual.
