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

## Normalización piloto de entidades
- **Se aplica en `scripts/construir_datos.py` al armar los JSON, NO en la planilla.** La planilla y `data/fuentes/inventario_base.csv` / `indice_manuscrito.csv` no se tocan; `titulo`, `leyenda_reverso` e `inscripciones_reverso` son transcripciones y no se normalizan.
- Tabla: `data/fuentes/normalizacion_piloto.csv` (`variante | tipo | forma_normalizada | n_llave | origen | confianza`), generada con `python3 scripts/normalizacion.py`. Después, `scripts/construir_datos.py` (o `empaquetar.sh`, que no regenera la tabla).
- **Precedencia de fuentes:** equipo (`data/fuentes/autoridades/*.csv`, `entidades_verificadas.txt`, casos fijos) > recortes (`recortes_periodisticos.csv`) > decisiones (`decisiones_entidades.csv`) > notebook (`referencia_autoridades.csv`, no verificado) > regla (sin tratamientos, tildes, mayúsculas, Ma. → María).
- En `scripts/normalizacion.py`: `CASOS_FIJOS`, `SUELTOS_CONSIGNADOS` (nombres sueltos asignados por el equipo el 07/10/2026), `RENOMBRAR`, `LUGARES`, `FOTOGRAFOS`, `OBRAS`, `EVENTOS`.
- Personas en orden natural. Los valores de la planilla se muestran normalizados; los campos vacíos se completan desde `indice_titulo`, `leyenda_reverso` e `inscripciones_reverso` (sin sellos). Nombres sueltos: solo si el nombre completo está en el mismo sobre o entrada, o si están consignados; si no, quedan fuera de las facetas. El n.º 1 de cada sobre (escaneo del sobre) no se completa desde los textos.
- Evento: planilla normalizada; si no, recorte a ±7 días con persona o palabra clave en común; si no, la obra teatral («Representación de «…»»). Cada foto guarda `normalizacion: {campo: {origen, confianza, …}}`.
- Estado al cierre (07/10/2026), sobre 1.634 fotos publicadas: personas 5,5 % → 46,5 %; lugar 2,1 % → 12,4 %; evento 2,9 % → 19,2 %; fotógrafo 5,7 % y fecha 12,8 % casi sin cambios. Facetas: Caja, Década, Personas, Lugar, Evento, Fotógrafo/estudio.

## Pendientes
- **Eventos desde recortes = 0.** Solo hay coincidencias (±7 días) en S33-0003 (Bergallo) y S129-0003 (placa a Aldo Boglietti, 8 candidatos en R058), y las dos ya tienen evento en la planilla. Las fechas con día son pocas.
- **5 personas sin origen** (señaladas en la revisión; falta identificarlas y asignarles fuente).
- **Confianza de los derivados de «Vedinger»** (A. M. / M. Vedinger → Ana María Kédinger, «Casamiento Kédinger - Rizzotti»): baja, sin verificar. La decisión P1/P5 atribuye la Llave 280 a Ana María Kedinger, pero en el Libro de Llaves la 280 es «Rizzotti, Luis David»: se dejó sin llave.
- **Pendientes del equipo** (docs): nombres sueltos que quedan fuera («Jaulín», «Susana» de S132, «Dr. Torres», «Medina», entre otros); posibles mismas personas sin unificar (Manolo / Manuel Varela / Manuel Varela (h); Toto Cáceres / Julián Reinaldo Cáceres); `personas_verificadas.csv` da Llave 1978 a Córdova Iturburu (se usa 133).
- `app/src/lib/citas.ts` sigue citando los títulos atribuidos entre corchetes.
- **Lista de autoridades de personas** (pestaña `personas` con forma normalizada, variantes y nota biográfica) y **página por persona**. La tabla piloto es el punto de partida.
- Revisar las 150 fichas en borrador y las entradas del índice marcadas como dudosas.
- Sobres S120 a S149 (121 fotos): no tienen entrada en el índice; hace falta escanear reversos o que el usuario aporte títulos.
- Asignar signatura a los 4 archivos de Oscar Alemán que están sin normalizar en S56.
- Verificar que las miniaturas de Drive carguen en el sitio publicado; si no cargan, evaluar `imagenes.modo = local`, con autorización de la Fundación.
- Fase 2, si se aprueba: enriquecimiento documental y atlas hipervisual.
