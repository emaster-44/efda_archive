# Tarea: normalización piloto de entidades (cierre del prototipo de fotografía)

## Contexto

- Repo: `efda_archive`, rama `explorador-cajas-sobres`. Leé primero `CLAUDE.md`.
- Fondo fotográfico de El Fogón de los Arrieros (Resistencia, Chaco). Modelo **Caja → Sobre → Fotografía**. La entrada N del índice manuscrito describe el sobre SN (desdoblados S106b, S141b con su número). La foto n.º 1 de cada sobre es el escaneo del sobre, no una fotografía.
- El prototipo se va a mostrar como piloto: **los nombres de personas, lugares, fotógrafos y eventos tienen que verse normalizados y coherentes**, aunque la normalización no sea totalmente precisa. Se prioriza la coherencia, sin inventar datos que no estén en las fuentes.

## Restricciones

- **No modificar la planilla maestra** ni `data/fuentes/inventario_base.csv` ni `indice_manuscrito.csv`. Toda la normalización se aplica al construir los JSON.
- No tocar `titulo`, `leyenda_reverso` ni `inscripciones_reverso`: son transcripciones.
- No reinstalar dependencias (pnpm tiene `minimumReleaseAge`); usar binarios de `app/node_modules/.bin`.
- **No commitear** hasta que el usuario revise. Cuando haya commit: `git add` explícito por archivo, nunca `-A` ni `.`.
- `kb/` queda fuera del repo.

## Fuentes y precedencia

De mayor a menor autoridad:

1. **Equipo (verificado)**
   - `data/fuentes/autoridades/libro_llaves.csv` (Orden de la Llave, 1–499; el Nº 34 está duplicado: Giangrande / Penchasky).
   - `data/fuentes/autoridades/personas_verificadas.csv` (100 fichas con variantes y apodos).
   - `data/fuentes/autoridades/indices_cajas.csv`.
   - Origen: `data/fuentes/entidades_verificadas.txt`.
2. **Recortes periodísticos (verificado)**: `data/fuentes/recortes_periodisticos.csv`, 1.835 filas, columnas `Fuente, Fecha, Medio/Publicación, Titular o tema del recorte, Personas o instituciones mencionadas`. Es la fuente de eventos.
3. **Decisiones propuestas**: `data/fuentes/decisiones_entidades.csv` (columna `decision_propuesta`).
4. **Cuaderno (no verificado)**: `data/fuentes/referencia_autoridades.csv`.
5. **Regla A**: quitar tratamientos (Dr., Don, Sr., Sra., Dña., Prof., Mr., Ing., Arq.), normalizar tildes, mayúsculas y abreviaturas (Ma. → María).

Referencia del diagnóstico: `docs/diagnostico_entidades.md`.

## Pasos

### 1. Recortes

- Parsear `Fecha` a EDTF:
  - `dd-mm-aa` → `19aa-mm-dd`;
  - «novembre-dicembre 1978» → `1978-11/1978-12`;
  - sin año → año de la caja **solo** si la caja cubre un único año (p. ej. R058 = 1981); si no, vacío.
- Extraer personas e instituciones (separadas por coma) como variantes con `origen=recortes`.

### 2. Tabla de equivalencias

Generar `data/fuentes/normalizacion_piloto.csv` con las columnas:
`variante | tipo (persona/institucion/lugar/fotografo/evento/obra) | forma_normalizada | n_llave | origen (equipo/recortes/decision/notebook/regla) | confianza (alta/media/baja)`

**Forma de visualización de personas:** orden natural «Nombre Apellido» (*Hilda Torres Varela*, *Aldo Boglietti*, *Juan de Dios Mena*). Invertir las formas «Apellido, Nombre» del Libro de Llaves y conservar `n_llave`.

**Casos fijos:**

- Aldo Boglietti = Llave 11. Efraín Boglietti = 3.
- «Alfredo» / «Don Alfredo Boglietti» → *Alfredo Boglietti*, **sin llave** (21 y 118 sin decidir).
- José Babini (125) y José Banti (81): **separados**.
- Cayetano Córdova Iturburu (133).
- Kédinger: grafía «Kédinger». Enrique Kédinger = 151. «Vedinger» → Kédinger con confianza baja.
- Susana Glombovsky de Landman (61).
- Hilda Torres Varela (13) e Hilda Dianda (203): separadas.
- del Villar y «Henri» Kédinger: forma más frecuente, confianza baja.
- Limpiar artefactos: «Aerolíneas Argentinas 17», «… Chon», «Secretariachurro de Barea», «y Saa».

**Nombres sueltos** («Hilda», «Aldo», «Mena»…): vincular solo si el nombre completo aparece en el mismo sobre o entrada del índice; si no, excluir de las facetas.

**Lugares:** formas canónicas («Resistencia (Chaco)», «El Fogón de los Arrieros, Resistencia», «Buenos Aires», «Corrientes»…). Las direcciones (Brown 188 / 350) van a nota, no a lugar.

**Fotógrafos:** desde los sellos de `inscripciones_reverso` (Pissano, Boschetti, Grete Stern, Lescano, Paquiri, Alvarez, Nigris, Portillo). Usar la forma de la lista del equipo si existe (p. ej. Grete Stern, Llave 231).

**Obras teatrales:** forma normalizada de la obra (unificar «La libra de carne» / «Una libra de carne»).

**Instituciones** (Fogón de los Arrieros, UNNE, Chacotur…): normalizarlas; nunca como personas.

### 3. Eventos desde recortes

Asignar evento a una foto **solo si**:

- la fecha de la foto, o la de su entrada del índice, está a ±7 días de un recorte, **y**
- comparten al menos una persona normalizada o una palabra clave del titular.

Cuando se asigna:

- Evento = titular del recorte en mayúscula inicial (no en mayúsculas sostenidas).
- Guardar en `normalizacion.evento` `{origen: "recortes", fuente: <caja>, medio, fecha}`.
- Si no hay recorte que coincida y la foto corresponde a una obra teatral, evento = «Representación de «<obra>»».
- Sin coincidencia: sin evento.

### 4. `scripts/construir_datos.py`

- Después de armar cada foto, completar `personas`, `lugar`, `fotografo` y `evento` **solo si están vacíos en la planilla**, usando `normalizacion_piloto.csv` sobre `indice_titulo`, `leyenda_reverso` e `inscripciones_reverso`.
- Guardar en cada foto `normalizacion: {campo: {origen, confianza, ...}}`.
- Si la entrada del índice tiene fecha y la foto no, asignar la fecha con `fecha_inferida=true` (mecanismo existente).

### 5. Configuración y sitio

- `data/config.json`: facetas en este orden: Caja, Década, Personas, Lugar, Evento, Fotógrafo/estudio. Sin «Estado de la ficha».
- `app/src/vistas/Acerca.tsx`:
  - Agregar: «Los nombres de personas, lugares y eventos están normalizados de forma provisoria para este piloto, a partir del índice manuscrito, los reversos, los recortes periodísticos y las listas de autoridades del equipo de investigación.»
  - Corregir la mención a los títulos atribuidos «entre corchetes»: ya no se usan corchetes.

### 6. Reconstruir y verificar en local

Reconstruir los datos (`python3 scripts/construir_datos.py`) y levantar el sitio (`pnpm dev` en `app/`, o pedirle al usuario que lo levante). Verificar:

- Faceta Personas: sin nombres sueltos, sin duplicados por tratamiento, todas en orden natural.
- Aldo Boglietti con su total de fotos.
- Fotos de S12 con Jorge Rigaud, Santiago Gómez Cou y Carlos Ginés.
- Faceta Fotógrafo/estudio con Pissano y Boschetti.
- `tsc -b` y oxlint sin errores.

## Reporte esperado (sin commitear)

1. Porcentaje de fotos con personas, lugar, fotógrafo, evento y fecha, antes y después.
2. Las 20 personas más frecuentes (forma normalizada, Llave, cantidad de fotos).
3. Cuántos valores tienen confianza baja, por campo.
4. Eventos desde recortes: cuántas fotos recibieron evento, 10 ejemplos (foto, entrada del índice, recorte asignado) y las coincidencias dudosas (más de un recorte candidato).
5. Lo que quedó sin resolver y por qué.
