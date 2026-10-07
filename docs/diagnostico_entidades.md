# Diagnóstico de entidades — fondo fotográfico EFDA

Solo diagnóstico: no se modificó ningún dato. Fuentes: `data/fuentes/inventario_base.csv` (1759 filas) y `data/fuentes/indice_manuscrito.csv` (119 entradas), cotejadas con la planilla maestra el 06/10/2026.

**Método.** Extracción heurística sin NER: secuencias con mayúscula inicial (con conectores *de/del/de la/y*), lista de palabras vacías, diccionario de lugares (campo `lugar` + topónimos frecuentes), patrones de instituciones y eventos por palabra clave, obras teatrales entre comillas. El campo `titulo` está vacío en todo el inventario, así que no aporta menciones. El índice se cuenta por **entrada** (no por foto), y sus sobres son los de las fotos vinculadas a esa entrada. Hay que revisar a mano: habrá falsos positivos (palabras comunes con mayúscula) y algunos tipos mal asignados.

## a. Campos vacíos (sin portadas de sobre)

Base: 1613 fotografías (se excluyen las 146 portadas, `numero` = 1).

| Campo | Vacíos | % vacío |
| --- | ---: | ---: |
| `personas` | 1523 | 94.4 % |
| `lugar` | 1578 | 97.8 % |
| `evento` | 1565 | 97.0 % |
| `materias` | 1613 | 100.0 % |
| `fotografo` | 1521 | 94.3 % |

## b. Nombres propios más frecuentes

Menciones = registros distintos (foto o entrada del índice) en que aparece la forma, por campo.

### Personas (probables)

410 formas distintas: 208 con 2 o más menciones y 202 con una sola.

| Forma | Menciones | Campos | Sobres |
| --- | ---: | --- | --- |
| Aldo Boglietti | 22 | leyenda_reverso (11), inscripciones_reverso (11) | S01, S09, S14, S15, S16, S19, S21, S26, S114, S129 |
| Aldo | 20 | inscripciones_reverso (8), leyenda_reverso (7), indice_titulo (5) | S01, S09, S19, S26, S32, S67, S68, S69, S88, S130, S131, S132 |
| Hilda | 13 | leyenda_reverso (7), inscripciones_reverso (6) | S16, S47, S87, S126, S127, S130, S132 |
| Linda Banti | 12 | leyenda_reverso (6), inscripciones_reverso (6) | S25, S39, S46, S53, S65 |
| Faustino Doglio | 11 | inscripciones_reverso (6), leyenda_reverso (5) | S38, S53, S65, S78, S96 |
| Mena | 11 | leyenda_reverso (4), inscripciones_reverso (4), indice_titulo (3) | S01, S30, S47, S90, S119, S141 |
| Hilda Torres Varela | 10 | leyenda_reverso (5), inscripciones_reverso (5) | S09, S11, S16, S32, S78 |
| Coco Celada | 9 | inscripciones_reverso (5), leyenda_reverso (4) | S32, S39, S78, S96 |
| Efraín Boglietti | 9 | inscripciones_reverso (5), leyenda_reverso (4) | S09, S14, S39, S78 |
| Pedro López Lagar | 7 | leyenda_reverso (3), inscripciones_reverso (3), indice_titulo (1) | S09 |
| Toto Cáceres | 7 | inscripciones_reverso (4), leyenda_reverso (3) | S38, S39, S65, S78 |
| Arturo Barea | 6 | inscripciones_reverso (3), leyenda_reverso (2), indice_titulo (1) | S19, S106 |
| Héctor Castrillo | 6 | leyenda_reverso (3), inscripciones_reverso (3) | S25, S39, S65 |
| Poen Alarcón | 6 | leyenda_reverso (3), inscripciones_reverso (3) | S24, S32, S65 |
| Dr. Alberto Torres | 5 | leyenda_reverso (2), inscripciones_reverso (2), indice_titulo (1) | S20, S31 |
| Dr. Carlos R. Guichón | 5 | leyenda_reverso (2), inscripciones_reverso (2), indice_titulo (1) | S16, S26 |
| Efraín | 5 | inscripciones_reverso (3), leyenda_reverso (2) | S26, S129, S130 |
| Jorge Luis Borges | 5 | leyenda_reverso (2), inscripciones_reverso (2), indice_titulo (1) | S14 |
| Mabel Bonome | 5 | leyenda_reverso (2), inscripciones_reverso (2), indice_titulo (1) | S115 |
| Nelly Vaccarezza de Vaccarezza | 5 | leyenda_reverso (2), inscripciones_reverso (2), indice_titulo (1) | S95 |
| Santiago | 5 | inscripciones_reverso (3), leyenda_reverso (2) | S53, S78 |
| Víctor Marchese | 5 | leyenda_reverso (2), inscripciones_reverso (2), indice_titulo (1) | S01, S09, S27 |
| Antonio | 4 | leyenda_reverso (2), inscripciones_reverso (2) | S04, S65 |
| Antonio De Raco | 4 | leyenda_reverso (2), inscripciones_reverso (2) | S15 |
| Avelino Hermida | 4 | leyenda_reverso (2), inscripciones_reverso (2) | S14 |
| Beba Gabardini | 4 | leyenda_reverso (2), inscripciones_reverso (2) | S11, S38 |
| Cuzzani | 4 | leyenda_reverso (3), inscripciones_reverso (1) | S58, S78 |
| Dr. Carman | 4 | leyenda_reverso (2), inscripciones_reverso (2) | S146 |
| Dr. Faustino Doglio | 4 | leyenda_reverso (2), inscripciones_reverso (2) | S21, S58 |
| Dr. Luis Govi | 4 | leyenda_reverso (2), inscripciones_reverso (2) | S19, S26 |
| Fray Mocho | 4 | leyenda_reverso (2), inscripciones_reverso (2) | S04 |
| Helvecia U. de Boglietti | 4 | leyenda_reverso (2), inscripciones_reverso (2) | S14, S26 |
| José Banti | 4 | leyenda_reverso (2), inscripciones_reverso (2) | S46, S53 |
| Manuel Varela | 4 | leyenda_reverso (2), inscripciones_reverso (2) | S14 |
| Mimí | 4 | leyenda_reverso (2), inscripciones_reverso (2) | S65 |
| Nazario Maderna | 4 | leyenda_reverso (2), inscripciones_reverso (2) | S53 |
| Noel Coward | 4 | leyenda_reverso (2), inscripciones_reverso (2) | S46 |
| Pilán Alarcón | 4 | leyenda_reverso (2), inscripciones_reverso (2) | S32, S46 |
| Santiago Gómez Cou | 4 | indice_titulo (2), leyenda_reverso (1), inscripciones_reverso (1) | S12, S92, S93 |
| Ugo Betti | 4 | leyenda_reverso (2), inscripciones_reverso (2) | S25 |
| Vanzo | 4 | leyenda_reverso (2), inscripciones_reverso (2) | S15, S88 |
| Adolfo Guntoni | 3 | indice_titulo (1), leyenda_reverso (1), inscripciones_reverso (1) | S50 |
| Adolfo Petraglia | 3 | inscripciones_reverso (2), leyenda_reverso (1) | S30, S78 |
| Ana María Kedinger | 3 | leyenda_reverso (2), inscripciones_reverso (1) | S30, S96 |
| Brigadier Moragues | 3 | indice_titulo (1), leyenda_reverso (1), inscripciones_reverso (1) | S82 |
| Cía | 3 | inscripciones_reverso (2), leyenda_reverso (1) | S09, S131 |
| Don Alfredo Boglietti | 3 | leyenda_reverso (2), inscripciones_reverso (1) | S11, S26 |
| Dr. José R. Bergallo | 3 | indice_titulo (1), leyenda_reverso (1), inscripciones_reverso (1) | S33 |
| Eduardo Falú | 3 | indice_titulo (1), leyenda_reverso (1), inscripciones_reverso (1) | S104 |
| Emilio Novas | 3 | indice_titulo (1), leyenda_reverso (1), inscripciones_reverso (1) | S21, S40 |
| Emilio Pettoruti | 3 | indice_titulo (1), leyenda_reverso (1), inscripciones_reverso (1) | S113, S139 |
| Enrique Kédinger | 3 | inscripciones_reverso (2), leyenda_reverso (1) | S39, S78 |
| Francisco Javier | 3 | indice_titulo (1), leyenda_reverso (1), inscripciones_reverso (1) | S53, S64 |
| Haydée Helguera | 3 | indice_titulo (1), leyenda_reverso (1), inscripciones_reverso (1) | S23 |
| Ionesco | 3 | inscripciones_reverso (2), leyenda_reverso (1) | S53, S78 |
| Jacinto Castillo | 3 | indice_titulo (1), leyenda_reverso (1), inscripciones_reverso (1) | S09, S83 |
| Jorge Romero Brest | 3 | indice_titulo (1), leyenda_reverso (1), inscripciones_reverso (1) | S59, S114 |
| José Babini | 3 | indice_titulo (1), leyenda_reverso (1), inscripciones_reverso (1) | S31 |
| Juan de Dios Mena | 3 | indice_titulo (1), leyenda_reverso (1), inscripciones_reverso (1) | S02 |
| Juan L. Ortiz | 3 | indice_titulo (1), leyenda_reverso (1), inscripciones_reverso (1) | S21 |
| Libero Badii | 3 | indice_titulo (1), leyenda_reverso (1), inscripciones_reverso (1) | S114 |
| María Antonia Doglio | 3 | inscripciones_reverso (2), leyenda_reverso (1) | S65, S78 |
| Mediterráneo | 3 | leyenda_reverso (2), inscripciones_reverso (1) | S127 |
| Servicio Latino Americano | 3 | inscripciones_reverso (2), leyenda_reverso (1) | S19, S106 |
| Tito Divic | 3 | indice_titulo (1), leyenda_reverso (1), inscripciones_reverso (1) | S50 |
| Abel Henry | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S23 |
| Abuela | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S53 |
| Acevez | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S126 |
| Acosta | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S21 |
| Adamov | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S39, S78 |
| Alberto Torres | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S51 |
| Alejandro Boletta | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S133 |
| Alicia Moguilianes | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S30 |
| Alitalia | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S69 |
| Amelia | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S65 |
| América Latina | 2 | inscripciones_reverso (2) | S19, S106 |
| Ana María | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S01 |
| Annick Sanjurjo | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S39 |
| Antonia Doglio | 2 | leyenda_reverso (2) | S38, S53 |
| Apelaciones Dr. José R. Bergallo | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S33 |
| Arq | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S88 |
| Arquitecto Romaño | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S31 |
| Arsenio | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S65 |
| Bambina | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S126 |
| Barea | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S19 |
| Belúver | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S58 |
| Broadcasting House | 2 | inscripciones_reverso (2) | S19, S106 |
| Buez | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S65 |
| C. Jarreguy | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S130 |
| Carlos Mariscotti | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S09 |
| Carlos Schenone | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S01 |
| Carmen de Manzoni | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S26 |
| Carpa C. Bermont | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S02 |
| Córdova Iturburu | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S146 |
| Destacamento Naval | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S125 |
| Diplomático | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S46 |
| Dita Palacio | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S22 |
| Dña. Josefa Palacio | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S01 |
| Don Enrique Kédinger | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S96 |
| Don Medina | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S02 |
| Don Moisés Chilese | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S11 |
| Dr. Bronermon | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S31 |
| Dr. Dillon | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S31 |
| Dr. José Babini | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S31 |
| Dr. Michel Lataza | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S09 |
| Dr. Torres | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S02 |
| Eduardo Unertl | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S88 |
| Ercilia Boglietti | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S26 |
| Esteban Piccolini | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S88 |
| Estela Obario | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S04 |
| Eugenio Ionesco | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S53 |
| Eva | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S01 |
| Gallego Manolo Varela | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S88 |
| Georges Rigaud | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S12 |
| Gordo Cerrutti | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S12 |
| Héctor | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S67 |
| Helvecia Urdapilleta de Boglietti | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S14 |
| Horacio Aguirre | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S39 |
| Horacio Mascheroni | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S88 |
| Horacio Rivero Sosa | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S31 |
| Hugo Sudriá | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S58 |
| India | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S69 |
| Irene Panelo | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S04 |
| Isabelle | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S38 |
| Islas Orcadas | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S125 |
| Iva | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S25 |
| J. D. Mena | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S30 |
| Jaime Dávalos | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S30 |
| Joaquín del Villar | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S65 |
| Jorge | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S38 |
| Juan de Castilla | 2 | inscripciones_reverso (2) | S19, S106 |
| Julián R. Cáceres | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S26 |
| Kodacolor | 2 | inscripciones_reverso (2) | S127 |
| Lachaise | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S126 |
| Lidia Guasti | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S09 |
| London | 2 | inscripciones_reverso (2) | S19, S106 |
| López Lagar | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S09 |
| Lorenzo Schenone | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S09 |
| Loreta Melovo | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S09 |
| Luis Ángel Firpo | 2 | indice_titulo (1), leyenda_reverso (1) | S22 |
| Ma. Antonia Doglio | 2 | inscripciones_reverso (2) | S38, S53 |
| Madre | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S53 |
| Manolo Varela | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S11 |
| Marcelo | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S67 |
| Marchese | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S01 |
| Marcos Sanjurjo | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S58 |
| María Fux | 2 | indice_titulo (2) | S66, S116 |
| María Moeskops | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S24 |
| María Rosa González | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S139 |
| Mr. Kay | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S148 |
| Negra | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S127 |
| Nilda Britos | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S04 |
| Norma | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S24 |
| Oscar Ferriño | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S04 |
| Oscar Manzoni | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S26 |
| Pablo Rojas Paz | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S87 |
| Padre | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S53 |
| Pascal | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S24 |
| Paulina Ossona | 2 | indice_titulo (2) | S63, S111 |
| Pepe Banti | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S65 |
| Philémon | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S38 |
| Pía | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S130 |
| Pierre Baunere | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S130 |
| Pintor Arcidiácono | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S87 |
| Prof. Lino R. Torres | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S26 |
| Prof. Taranne | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S39 |
| Prov. Corrientes | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S01 |
| Radojka Pleticovic | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S16 |
| Raúl Nicotra | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S132 |
| René Rausseug | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S24 |
| Rizzotti | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S130 |
| Rosa | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S24 |
| Rosario Maderna | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S24 |
| Rubén Rolón | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S39 |
| S. Salvador | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S24 |
| Saa | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S31 |
| Santiaguita | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S53 |
| Silvio Bertini | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S09 |
| Sr | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S65 |
| Sr. Aldo Boglietti | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S146 |
| Sra. Ancelín | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S65 |
| Sra. de Bauti | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S04 |
| Sra. de Doglio | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S04 |
| Sra. de Maderna | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S04 |
| Sra. de Rossi | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S130 |
| Sra. Delachaume | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S38 |
| Sra. Ilsa | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S19 |
| Sra. Ilsa de Barea | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S106 |
| Sra. Montalembreuse | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S38 |
| Sras | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S65 |
| Susana | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S132 |
| Susana Glombovsky | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S53 |
| Susana Slomkovsky | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S04 |
| Tatalo | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S22 |
| Tennessee Williams | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S49 |
| Teresa Varela de Torres | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S26 |
| Torres | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S65 |
| Toto Maderna | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S65 |
| Trinaz Fox | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S09 |
| Ud | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S35 |
| Urruchúa | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S51 |
| Varela | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S65 |
| Velasco | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S127 |
| Vélez | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S127 |
| Viky Abouissac | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S30 |
| Yvonne de Kedinger | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S65 |
| Yvonne Kédinger | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S24 |
| Zapaletta | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S24 |

<details><summary>Formas con una sola mención</summary>

| Forma | Campo | Sobre | Registro |
| --- | --- | --- | --- |
| Acompañan Arturo Fraser | inscripciones_reverso | S11 | C01a20-S11-0009 |
| Alberto Borfitz | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Alberto Gollan | inscripciones_reverso | S129 | C120a149-S129-0003 |
| Amour | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Ana Maria Kedinger | inscripciones_reverso | S30 | C21a40-S30-0015 |
| Ángel de Seta | leyenda_reverso | S22 | C21a40-S22-0005 |
| Angel de Seta | inscripciones_reverso | S22 | C21a40-S22-0005 |
| Anouilh | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Antonia | leyenda_reverso | S96 | C81a100-S96-0003 |
| Antonio de Raco | indice_titulo | S15 | entrada 15 |
| Antonio Vázquez | indice_titulo | S74 | entrada 74 |
| Aquiles Bruno | inscripciones_reverso | S19 | C01a20-S19-0059 |
| Ariel Ramírez | indice_titulo | S52 | entrada 52 |
| Armando Asti Vera | indice_titulo | S84 | entrada 84 |
| Arturito Barea Pitillo-Juan de Castilla | inscripciones_reverso | S19 | C01a20-S19-0059 |
| Arturo Fraser | leyenda_reverso | S11 | C01a20-S11-0009 |
| Arturo Frondizi | indice_titulo | S41 | entrada 41 |
| Así | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Automóvil | leyenda_reverso | S146 | C120a149-S146-0005 |
| B. Canal Feijóo | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Bahía Blanca | inscripciones_reverso | S132 | C120a149-S132-0002 |
| Baunere | inscripciones_reverso | S130 | C120a149-S130-0002 |
| Ben Silberstein | inscripciones_reverso | S88 | C81a100-S88-0018 |
| Bernardo Canal Feijóo | indice_titulo | S107 | entrada 107 |
| Bigote Iscaro | inscripciones_reverso | S19 | C01a20-S19-0059 |
| Bilito Borfitz | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Botella | leyenda_reverso | S65 | C61a80-S65-0040 |
| Bs | leyenda_reverso | S69 | C61a80-S69-0016 |
| Bustos | indice_titulo | S102 | entrada 102 |
| C. Pellegrini | inscripciones_reverso | S131 | C120a149-S131-0001 |
| Camus | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Carlos | inscripciones_reverso | S16 | C01a20-S16-0005 |
| Carlos Erro | indice_titulo | S43 | entrada 43 |
| Carlos Ginés | indice_titulo | S12 | entrada 12 |
| Carmelitas | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Carricart | inscripciones_reverso | S19 | C01a20-S19-0059 |
| César Fernández Navarro | indice_titulo | S55 | entrada 55 |
| Chon | inscripciones_reverso | S126 | C120a149-S126-0015 |
| Claude | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Colombani | leyenda_reverso | S65 | C61a80-S65-0040 |
| Contraalmirante Isaac Rojas | indice_titulo | S75 | entrada 75 |
| Córdoba Iturburu | indice_titulo | S113 | entrada 113 |
| Coward | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Crítico | inscripciones_reverso | S02 | C01a20-S02-0009 |
| Cruz | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Cultura-es | inscripciones_reverso | S19 | C01a20-S19-0059 |
| Delfor Augé | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Demetrio Urruchúa | indice_titulo | S51 | entrada 51 |
| Diálogo | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Dic | inscripciones_reverso | S77 | C61a80-S77-0013 |
| Don Alfredo Boglietti Mientras Continua Su Relato | inscripciones_reverso | S11 | C01a20-S11-0009 |
| Don Moisés | leyenda_reverso | S11 | C01a20-S11-0008 |
| Dr | inscripciones_reverso | S16 | C01a20-S16-0005 |
| Dr. Abraham Jaroslavsky | indice_titulo | S47 | entrada 47 |
| Dr. Guichón | leyenda_reverso | S16 | C01a20-S16-0005 |
| Dr. Nicolás Juárez García | indice_titulo | S70 | entrada 70 |
| Eichmann | indice_titulo | S93 | entrada 93 |
| Élida Castells | leyenda_reverso | S46 | C41a60-S46-0025 |
| Elizabeth Westerkamp | indice_titulo | S15 | entrada 15 |
| Ernesto Sábato | indice_titulo | S98 | entrada 98 |
| Estela Quatrocchio | indice_titulo | S05 | entrada 5 |
| Euclides Ventura Cardoso | indice_titulo | S48 | entrada 48 |
| Eva Sas | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Ezequiel Martínez Estrada | indice_titulo | S36 | entrada 36 |
| F. Hochwalder | inscripciones_reverso | S78 | C61a80-S78-0002 |
| F. Mauriac | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Faluggi’s Brothers | leyenda_reverso | S95 | C81a100-S95-0004 |
| Faluggi’’s Brothers | inscripciones_reverso | S95 | C81a100-S95-0004 |
| Fd | inscripciones_reverso | S01 | C01a20-S01-0040 |
| Ferenc Molnár | leyenda_reverso | S78 | C61a80-S78-0002 |
| Fermín José María Martinicorena | inscripciones_reverso | S19 | C01a20-S19-0059 |
| Fernando Arranz | indice_titulo | S72 | entrada 72 |
| Fernando Birri | indice_titulo | S13 | entrada 13 |
| Ficsur | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Flaco del Grabador | inscripciones_reverso | S19 | C01a20-S19-0059 |
| Francisco Reyes | inscripciones_reverso | S129 | C120a149-S129-0003 |
| Fuego | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Futboll | inscripciones_reverso | S19 | C01a20-S19-0059 |
| G. Bernanos | inscripciones_reverso | S78 | C61a80-S78-0002 |
| G. Marcel | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Gallego Charlatán | inscripciones_reverso | S19 | C01a20-S19-0059 |
| Gallego Hermida | indice_titulo | S108 | entrada 108 |
| Gerente L | inscripciones_reverso | S19 | C01a20-S19-0059 |
| Glasiris | leyenda_reverso | S88 | C81a100-S88-0018 |
| Gral. Montgomery | indice_titulo | S06 | entrada 6 |
| Guardián | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Guerrieri | inscripciones_reverso | S19 | C01a20-S19-0059 |
| Guichón | inscripciones_reverso | S16 | C01a20-S16-0005 |
| Gustar | inscripciones_reverso | S11 | C01a20-S11-0008 |
| H. de Montherland | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Haydée Loustaunau | indice_titulo | S57 | entrada 57 |
| Henri Kédinger | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Hermanos Carrillo | indice_titulo | S10 | entrada 10 |
| Hermanos Micrófonos | inscripciones_reverso | S19 | C01a20-S19-0059 |
| Hilda Dianda | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Hochw | leyenda_reverso | S32 | C21a40-S32-0007 |
| Hochwalder | inscripciones_reverso | S32 | C21a40-S32-0007 |
| Hugo del Carril | indice_titulo | S62 | entrada 62 |
| J L Barrault | inscripciones_reverso | S78 | C61a80-S78-0002 |
| J. P. Sartre | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Jaime Dagnino | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Jaulín | indice_titulo | S100 | entrada 100 |
| Jefe Programas L | inscripciones_reverso | S19 | C01a20-S19-0059 |
| Jorge Rigaud | indice_titulo | S12 | entrada 12 |
| José Arizaga | inscripciones_reverso | S78 | C61a80-S78-0002 |
| José Lasa | inscripciones_reverso | S19 | C01a20-S19-0059 |
| José Luis Camargo | inscripciones_reverso | S78 | C61a80-S78-0002 |
| José M | leyenda_reverso | S96 | C81a100-S96-0004 |
| José Ma. Orentanz | inscripciones_reverso | S96 | C81a100-S96-0004 |
| José Zaii | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Joven Hollunder | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Juan Mantovani | indice_titulo | S79 | entrada 79 |
| Juan Manuel Fangio | indice_titulo | S104 | entrada 104 |
| Juan Pablo Jaroslavsky | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Juana | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Jueces | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Juez | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Julia | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Julián del Villar | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Letras | inscripciones_reverso | S19 | C01a20-S19-0059 |
| Linzman | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Litografías Pettoruti | indice_titulo | S101 | entrada 101 |
| Loco | inscripciones_reverso | S19 | C01a20-S19-0059 |
| Lucrecia Morgan | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Luis Angel Firpo | inscripciones_reverso | S22 | C21a40-S22-0005 |
| Luisa | inscripciones_reverso | S78 | C61a80-S78-0002 |
| M. de Ghelderode | inscripciones_reverso | S78 | C61a80-S78-0002 |
| M. Perrin | inscripciones_reverso | S78 | C61a80-S78-0002 |
| M. Vedinger | inscripciones_reverso | S130 | C120a149-S130-0002 |
| Ma. Antonia | inscripciones_reverso | S96 | C81a100-S96-0003 |
| Ma. Élida Castells | inscripciones_reverso | S46 | C41a60-S46-0025 |
| Mademoiselle Jaire | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Maestro Luis Gusberti | indice_titulo | S110 | entrada 110 |
| Mamá Hollunder | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Marcos Moncada | inscripciones_reverso | S78 | C61a80-S78-0002 |
| María | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Mario Mangiaterra | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Martín Rampín | indice_titulo | S72 | entrada 72 |
| Mauro Núñez | indice_titulo | S07 | entrada 7 |
| Médico | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Medina Ortiz | indice_titulo | S37 | entrada 37 |
| Melenita | inscripciones_reverso | S19 | C01a20-S19-0059 |
| Mientras Arturo Fraser | leyenda_reverso | S11 | C01a20-S11-0008 |
| Mientras Arturo Fraser Ceba Un Mate Que Don Moises Apredio | inscripciones_reverso | S11 | C01a20-S11-0008 |
| Miguelito Bruno | inscripciones_reverso | S19 | C01a20-S19-0059 |
| Miura | leyenda_reverso | S32 | C21a40-S32-0007 |
| Moisés Chilese | indice_titulo | S11 | entrada 11 |
| Montoya | inscripciones_reverso | S19 | C01a20-S19-0059 |
| Muskat | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Neptuno | leyenda_reverso | S69 | C61a80-S69-0014 |
| Nicolás Antonio de San Luis | indice_titulo | S73 | entrada 73 |
| Nicolás Guillén | indice_titulo | S61 | entrada 61 |
| Nuestra Tierra | inscripciones_reverso | S11 | C01a20-S11-0008 |
| Oberdan Caletti | indice_titulo | S105 | entrada 105 |
| Orentanz | leyenda_reverso | S96 | C81a100-S96-0004 |
| Organización Fotográfica | inscripciones_reverso | S136 | C120a149-S136-0005 |
| Oscar Alemán | indice_titulo | S56 | entrada 56 |
| Pablo Luis | inscripciones_reverso | S131 | C120a149-S131-0001 |
| Panza Verde | inscripciones_reverso | S30 | C21a40-S30-0014 |
| Paolera | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Pasión | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Peña | inscripciones_reverso | S44 | C41a60-S44-0019 |
| Peón | inscripciones_reverso | S19 | C01a20-S19-0059 |
| Pepe Díaz | inscripciones_reverso | S19 | C01a20-S19-0059 |
| Perla Sas | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Policía | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Puerta | inscripciones_reverso | S78 | C61a80-S78-0002 |
| R. Arlt | inscripciones_reverso | S78 | C61a80-S78-0002 |
| R. Bonome | indice_titulo | S72 | entrada 72 |
| R) Miguel Ángel Mascaró | indice_titulo | S29 | entrada 29 |
| Rattigan | indice_titulo | S94 | entrada 94 |
| Raúl Insaurralde | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Raúl Monsegur | indice_titulo | S77 | entrada 77 |
| René Brusau | indice_titulo | S08 | entrada 8 |
| Rep | leyenda_reverso | S03 | C01a20-S03-0021 |
| Robert Mac Errin | indice_titulo | S54 | entrada 54 |
| Roberto Klappenbach | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Rossi | leyenda_reverso | S130 | C120a149-S130-0002 |
| S. de Bustamante | indice_titulo | S102 | entrada 102 |
| Salacrou | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Samuel Sanchez de Bustamante | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Secretariachurro de Barea | inscripciones_reverso | S19 | C01a20-S19-0059 |
| Sic Transit Gloria Mundi | inscripciones_reverso | S88 | C81a100-S88-0018 |
| Silverio Leguizamón | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Sr. Di Luzio | inscripciones_reverso | S129 | C120a149-S129-0003 |
| Sr. W | inscripciones_reverso | S19 | C01a20-S19-0060 |
| Suicida | inscripciones_reverso | S78 | C61a80-S78-0002 |
| T. Williams | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Tarjeta Postal República Argentina | inscripciones_reverso | S67 | C61a80-S67-0036 |
| Tate | inscripciones_reverso | S19 | C01a20-S19-0060 |
| Témpanos Flotantes | inscripciones_reverso | S125 | C120a149-S125-0008 |
| Th | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Tierra Graham | leyenda_reverso | S125 | C120a149-S125-0006 |
| Tierra Graham Antártida Argentina | inscripciones_reverso | S125 | C120a149-S125-0006 |
| Tila Morgs | indice_titulo | S100 | entrada 100 |
| Tte | leyenda_reverso | S26 | C21a40-S26-0049 |
| U. Betti | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Ubaldo Martínez | indice_titulo | S76 | entrada 76 |
| Ujier | inscripciones_reverso | S78 | C61a80-S78-0002 |
| Vedinger | leyenda_reverso | S130 | C120a149-S130-0002 |
| Witold Malcuzynski | indice_titulo | S17 | entrada 17 |
| Wolff | inscripciones_reverso | S78 | C61a80-S78-0002 |

</details>

### Lugares

20 formas distintas: 17 con 2 o más menciones y 3 con una sola.

| Forma | Menciones | Campos | Sobres |
| --- | ---: | --- | --- |
| Resistencia | 17 | inscripciones_reverso (12), leyenda_reverso (5) | S03, S04, S19, S77, S88, S106, S131, S132, S133, S136, S143 |
| Sáenz Peña | 7 | leyenda_reverso (4), inscripciones_reverso (3) | S44 |
| Chaco | 6 | inscripciones_reverso (5), leyenda_reverso (1) | S03, S19, S106, S132, S136 |
| Antártida Argentina | 5 | leyenda_reverso (3), inscripciones_reverso (2) | S125 |
| Antártida Arg | 4 | leyenda_reverso (2), inscripciones_reverso (2) | S125 |
| Argentina | 4 | inscripciones_reverso (3), leyenda_reverso (1) | S03, S19, S106 |
| París | 4 | leyenda_reverso (2), inscripciones_reverso (2) | S119, S126 |
| Bahía Buen Suceso | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S125 |
| Córdoba | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S19 |
| Granada | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S127 |
| Málaga | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S127 |
| Nerja | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S127 |
| Sierra Nevada | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S127 |
| Torre del Mar | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S127 |
| Tuy | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S126 |
| Verona | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S69 |
| Virasoro | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S01 |

<details><summary>Formas con una sola mención</summary>

| Forma | Campo | Sobre | Registro |
| --- | --- | --- | --- |
| Cuba | indice_titulo | S60 | entrada 60 |
| Italia | indice_titulo | S103 | entrada 103 |
| Tucumán | indice_titulo | S70 | entrada 70 |

</details>

### Instituciones

24 formas distintas: 14 con 2 o más menciones y 10 con una sola.

| Forma | Menciones | Campos | Sobres |
| --- | ---: | --- | --- |
| El Fogón de los Arrieros | 58 | inscripciones_reverso (27), leyenda_reverso (19), indice_titulo (12) | S01, S03, S04, S09, S12, S15, S19, S23, S24, S26, S33, S34, S35, S81, S85, S87, S88, S89, S97, S106, S129, S141, S146 |
| Comisión Municipal de Cultura | 4 | leyenda_reverso (2), inscripciones_reverso (2) | S44 |
| BBC | 3 | inscripciones_reverso (2), leyenda_reverso (1) | S19, S106 |
| Aerolíneas | 2 | indice_titulo (2) | S45, S82 |
| BBC COPYRIGHT PHOTOGRAPH | 2 | inscripciones_reverso (2) | S19, S106 |
| BBC Latin | 2 | leyenda_reverso (2) | S19, S106 |
| BBC LATIN | 2 | inscripciones_reverso (2) | S19, S106 |
| Club Argentino | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S146 |
| Club de los 12 | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S129 |
| Club Social | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S44 |
| Conjunto "Fray Mocho | 2 | indice_titulo (2) | S04, S71 |
| Directorio de la Forestal Argentina | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S87 |
| Hotel Covadonga | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S01 |
| LA PRENSA | 2 | inscripciones_reverso (2) | S01, S21 |

<details><summary>Formas con una sola mención</summary>

| Forma | Campo | Sobre | Registro |
| --- | --- | --- | --- |
| Aerolíneas Argentinas | leyenda_reverso | S82 | C81a100-S82-0014 |
| Aerolíneas Argentinas 17 | inscripciones_reverso | S82 | C81a100-S82-0014 |
| Caja Ahorro | indice_titulo | S48 | entrada 48 |
| Compañía Glasiris | inscripciones_reverso | S88 | C81a100-S88-0018 |
| Directorio de La Forestal Argentina | indice_titulo | S80 | entrada 80 |
| Hostal del Conde de Gondomar | inscripciones_reverso | S126 | C120a149-S126-0015 |
| Hostal del Conde de Gondomar. Chon | leyenda_reverso | S126 | C120a149-S126-0015 |
| LV3 RADIO CORDOBA | inscripciones_reverso | S19 | C01a20-S19-0059 |
| REVISTA ESSO | inscripciones_reverso | S02 | C01a20-S02-0009 |
| Rotary Club Internacional | indice_titulo | S42 | entrada 42 |

</details>

### Eventos

35 formas distintas: 3 con 2 o más menciones y 32 con una sola.

| Forma | Menciones | Campos | Sobres |
| --- | ---: | --- | --- |
| Fiesta de gala en el Fogón | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S26 |
| Homenaje a Mena | 2 | indice_titulo (2) | S30, S90 |
| Juramento de la llave de Santiago Gómez Cou | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S93 |

<details><summary>Formas con una sola mención</summary>

| Forma | Campo | Sobre | Registro |
| --- | --- | --- | --- |
| Casamiento Vedinger - Rizzotti: Efraín, C. Jarreguy (?), Pierre Baunere (?), Sra | leyenda_reverso | S130 | C120a149-S130-0002 |
| Charlatán, Profesor de Letras y Cultura-es medio analfabeto y boca sucia.- / | inscripciones_reverso | S19 | C01a20-S19-0059 |
| Concentración Aerolíneas | indice_titulo | S82 | entrada 82 |
| Conferencia de Aldo | indice_titulo | S32 | entrada 32 |
| Conferencia del Dr. Alberto Torres | leyenda_reverso | S20 | C01a20-S20-0008 |
| Conferencia del Dr. Alberto Torres / Foto Nº 1 | inscripciones_reverso | S20 | C01a20-S20-0008 |
| Construcción Ingº BEN SILBERSTEIN que sabemos, para bostezo la obra.- Como represe | inscripciones_reverso | S88 | C81a100-S88-0018 |
| Cumpleaños de Aldo | indice_titulo | S26 | entrada 26 |
| Despedida de soltero: Tila Morgs | indice_titulo | S100 | entrada 100 |
| Despedida Gallego Hermida | indice_titulo | S108 | entrada 108 |
| Despedida matrimonio Bustos y S. de Bustamante | indice_titulo | S102 | entrada 102 |
| Entregas de llaves | indice_titulo | S18 | entrada 18 |
| Festejo Día del Niño | indice_titulo | S112 | entrada 112 |
| Fiesta y baile en "El Fogón de los Arrieros | indice_titulo | S85 | entrada 85 |
| Homenaje a la libertad de Cuba | indice_titulo | S60 | entrada 60 |
| Homenaje a Mena placa en el viejo Fogón | inscripciones_reverso | S141 | C120a149-S141-0002 |
| Homenaje a Mena, placa en el viejo Fogón, 4 de abril de 1963 | leyenda_reverso | S141 | C120a149-S141-0002 |
| Homenaje al Maestro Luis Gusberti | indice_titulo | S110 | entrada 110 |
| Inauguración mural de Demetrio Urruchúa | indice_titulo | S51 | entrada 51 |
| Juramento de la llave del Brigadier Moragues de Aerolíneas Argentinas 17-5-61 | inscripciones_reverso | S82 | C81a100-S82-0014 |
| Juramento de la llave del Brigadier Moragues de Aerolíneas Argentinas, 17-5-61 | leyenda_reverso | S82 | C81a100-S82-0014 |
| Mesa redonda sobre A. Eichmann | indice_titulo | S93 | entrada 93 |
| Muestra de las obras de Mena | indice_titulo | S119 | entrada 119 |
| Premier del "Fogón | indice_titulo | S97 | entrada 97 |
| Revolución septiembre de 1955 | indice_titulo | S45 | entrada 45 |
| Visita ARTURO BAREA y ALDO BOGLIETTI A LA CIUDAD DE CORDOBA | inscripciones_reverso | S19 | C01a20-S19-0059 |
| Visita de Arturo Barea y Aldo Boglietti a la ciudad de Córdoba | leyenda_reverso | S19 | C01a20-S19-0059 |
| Visita de poetas correntinos y Ballet del "Fogón | indice_titulo | S34 | entrada 34 |
| Visita de «Fray Mocho»: Nilda Britos, Estela Obario, Irene Panelo y Antonio | leyenda_reverso | S04 | C01a20-S04-0006 |
| Visita de «Fray Mocho»: Oscar Ferriño abre la marcha, en la entrada triunfal | leyenda_reverso | S04 | C01a20-S04-0007 |
| Visita del hijo del Gral. Montgomery | indice_titulo | S06 | entrada 6 |
| Visita del Presidente del Rotary Club Internacional | indice_titulo | S42 | entrada 42 |

</details>

### Fotógrafos y estudios (menciones en los textos)

8 formas distintas: 5 con 2 o más menciones y 3 con una sola.

| Forma | Menciones | Campos | Sobres |
| --- | ---: | --- | --- |
| Pissano | 55 | inscripciones_reverso (55) | S01, S02, S03, S04, S08, S09, S11, S12, S15, S16, S20, S22, S23, S24, S25, S26, S30, S32, S35, S38, S39, S46, S49, S51, S53, S55, S58, S65, S87, S88 |
| Boschetti | 29 | inscripciones_reverso (28), leyenda_reverso (1) | S03, S14, S15, S26, S31, S33, S50, S56, S67, S82, S87, S93, S95, S104, S106, S114, S115, S131, S133, S143 |
| Lescano | 3 | inscripciones_reverso (3) | S44 |
| Grete Stern | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S77 |
| Paquiri | 2 | leyenda_reverso (1), inscripciones_reverso (1) | S136 |

<details><summary>Formas con una sola mención</summary>

| Forma | Campo | Sobre | Registro |
| --- | --- | --- | --- |
| Alvarez | inscripciones_reverso | S26 | C21a40-S26-0050 |
| Nigris | inscripciones_reverso | S67 | C61a80-S67-0036 |
| Portillo | inscripciones_reverso | S119 | C101a119-S119-0014 |

</details>

### Obras teatrales

15 formas distintas: 11 con 2 o más menciones y 4 con una sola.

| Forma | Menciones | Campos | Sobres |
| --- | ---: | --- | --- |
| Una libra de carne | 7 | inscripciones_reverso (4), leyenda_reverso (3) | S58, S78 |
| Cita en Senlis | 6 | inscripciones_reverso (3), leyenda_reverso (2), indice_titulo (1) | S38, S78 |
| El jugador | 6 | inscripciones_reverso (3), leyenda_reverso (2), indice_titulo (1) | S25, S78 |
| Fin de semana | 6 | inscripciones_reverso (3), leyenda_reverso (2), indice_titulo (1) | S46, S78 |
| Antígona | 5 | leyenda_reverso (2), inscripciones_reverso (2), indice_titulo (1) | S44 |
| El café de Pomona | 4 | inscripciones_reverso (2), indice_titulo (1), leyenda_reverso (1) | S24, S78 |
| El profesor Taranne | 4 | inscripciones_reverso (2), indice_titulo (1), leyenda_reverso (1) | S39, S78 |
| El zoo de cristal | 4 | inscripciones_reverso (2), indice_titulo (1), leyenda_reverso (1) | S49, S78 |
| Santiago o la sumisión | 4 | inscripciones_reverso (2), indice_titulo (1), leyenda_reverso (1) | S53, S78 |
| Azouk | 3 | indice_titulo (1), leyenda_reverso (1), inscripciones_reverso (1) | S65 |
| Liliom | 3 | indice_titulo (1), leyenda_reverso (1), inscripciones_reverso (1) | S78 |

<details><summary>Formas con una sola mención</summary>

| Forma | Campo | Sobre | Registro |
| --- | --- | --- | --- |
| El que dice sí, el que dice no | indice_titulo | S118 | entrada 118 |
| La gran furia de Felipe Hotz | indice_titulo | S117 | entrada 117 |
| La libra de carne | indice_titulo | S58 | entrada 58 |
| Un sabor a miel | indice_titulo | S99 | entrada 99 |

</details>

## c. Variantes probables de una misma entidad

Similitud con rapidfuzz (`ratio` y `token_sort_ratio` ≥ 85, sin tildes, mayúsculas ni tratamientos como «Dr.»). Para personas se suman las formas del campo `personas`.

### Personas: grupos por similitud (43)

**P1.** «A. M. Vedinger» · «M. Vedinger»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| A. M. Vedinger | personas | S130 | C120a149-S130-0002 | Efraín; A. M. Vedinger; Rizzotti; Hilda; Aldo |
| M. Vedinger | inscripciones_reverso | S130 | C120a149-S130-0002 | Manuscrito, lista: «Efraín / C. Jarreguy / Pierre Baunere / A. M. Vedinger / Rizzotti - / Sra. de Rossi / Hilde / Aldo / Pía / Rossi»; ll… |

**P2.** «Alberto Torres» · «Dr. Alberto Torres»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Alberto Torres | leyenda_reverso | S51 | C41a60-S51-0023 | Habla Alberto Torres y Urruchúa aguza el oído |
| Alberto Torres | inscripciones_reverso | S51 | C41a60-S51-0023 | Leyenda manuscrita, tachada en rojo: «= Habla Alberto Torres y Urruchúa aguza el oído. =» \| Anotación: «17-41» \| Sello: PISSANO \| Anotaci… |
| Alberto Torres | personas | S20 | C01a20-S20-0008 | Alberto Torres |
| Alberto Torres | personas | S31 | C21a40-S31-0011 | Romaño; Horacio Rivero Sosa y Saa; Bronermon; Alberto Torres; José Babini; Dillon |
| Alberto Torres | personas | S51 | C41a60-S51-0023 | Alberto Torres; Demetrio Urruchúa |
| Dr. Alberto Torres | indice_titulo | S20 | entrada 20 | Dr. Alberto Torres |
| Dr. Alberto Torres | leyenda_reverso | S20 | C01a20-S20-0008 | Conferencia del Dr. Alberto Torres. Foto Nº 1 |
| Dr. Alberto Torres | leyenda_reverso | S31 | C21a40-S31-0011 | Arquitecto Romaño, Horacio Rivero Sosa y Saa, Dr. Bronermon, Dr. Alberto Torres, Dr. José Babini, Dr. Dillon |
| Dr. Alberto Torres | inscripciones_reverso | S20 | C01a20-S20-0008 | Manuscrito: «Conferencia del Dr. Alberto Torres / Foto Nº 1» \| Anotación: «13-37» \| Sello: PISSANO |
| Dr. Alberto Torres | inscripciones_reverso | S31 | C21a40-S31-0011 | Manuscrito: «Arquitecto Romaño / Horacio Rivero Sosa y Saa / Dr. Bronermon - / Dr. Alberto Torres / Dr. José Babini / Dr. Dillon» \| Sello… |

**P3.** «Aldo Boglietti» · «Alfredo Boglietti» · «Don Alfredo Boglietti» · «Sr. Aldo Boglietti»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Aldo Boglietti | leyenda_reverso | S01 | C01a20-S01-0042 | Rincón de la pieza de Aldo Boglietti (León). Hay 1 escultura (grotesco: «Eva») de Mena; 1 terracota Marchese («Los incomprendidos») y 1 e… |
| Aldo Boglietti | leyenda_reverso | S09 | C01a20-S09-0016 | Aldo Boglietti y Víctor Marchese. Fogón viejo |
| Aldo Boglietti | leyenda_reverso | S14 | C01a20-S14-0002 | Junto a la «cocina atómica», en la galería: al frente Jorge Luis Borges, Helvecia Urdapilleta de Boglietti, Efraín Boglietti; atrás Aveli… |
| Aldo Boglietti | leyenda_reverso | S14 | C01a20-S14-0003 | De izquierda a derecha: Ingº Manuel Varela (h.), Aldo Boglietti (Barítono), Efraín Boglietti (padre de familia), Jorge Luis Borges, Helve… |
| Aldo Boglietti | leyenda_reverso | S15 | C01a20-S15-0014 | El concertista de piano Antonio De Raco con Aldo Boglietti, frente a un cuadro del pintor rosarino Julio Vanzo |
| Aldo Boglietti | leyenda_reverso | S16 | C01a20-S16-0004 | En la pulpería: Dr. Carlos R. Guichón, Hilda Torres Varela, Aldo Boglietti, Radojka Pleticovic |
| Aldo Boglietti | leyenda_reverso | S19 | C01a20-S19-0059 | Visita de Arturo Barea y Aldo Boglietti a la ciudad de Córdoba |
| Aldo Boglietti | leyenda_reverso | S21 | C21a40-S21-0004 | Junto a la estufa: Aldo Boglietti, poeta Julio Acosta, Dr. Faustino Doglio, Emilio Novas, el poeta Juan L. Ortiz |
| Aldo Boglietti | leyenda_reverso | S26 | C21a40-S26-0049 | Una fiesta de gala en el Fogón: Julián R. Cáceres, Tte. Cnel. Oscar Manzoni, Dr. Carlos R. Guichón, Carmen de Manzoni, Aldo Boglietti, He… |
| Aldo Boglietti | leyenda_reverso | S114 | C101a119-S114-0004 | Libero Badii, Jorge Romero Brest, Aldo Boglietti |
| Aldo Boglietti | leyenda_reverso | S129 | C120a149-S129-0003 | Placa homenaje a Aldo Boglietti, Club de los 12, jardín delantero del Fogón, 12/4/1981 |
| Aldo Boglietti | inscripciones_reverso | S01 | C01a20-S01-0042 | Leyenda manuscrita: «Rincón de la pieza de Aldo Boglietti (León) / Hay 1 escultura (grotesco: “Eva”) de Mena; 1 terracota Marchese (“Los … |
| Aldo Boglietti | inscripciones_reverso | S09 | C01a20-S09-0016 | Manuscrito a lápiz: «Aldo Boglietti y Víctor Marchese» \| Manuscrito: «Fogón Viejo» |
| Aldo Boglietti | inscripciones_reverso | S14 | C01a20-S14-0002 | Leyenda manuscrita: «Junto a la “cocina atómica”, en la galería: / al frente: Jorge Luis Borges / Helvecia Urdapilleta de Boglietti / Efr… |
| Aldo Boglietti | inscripciones_reverso | S14 | C01a20-S14-0003 | Leyenda manuscrita: «Izq. a derecha: / Ingº Manuel Varela (h.) / Aldo Boglietti (Barítono).- / Efraín Boglietti (padre de familia) / Jorg… |
| Aldo Boglietti | inscripciones_reverso | S15 | C01a20-S15-0014 | Leyenda manuscrita: «El concertista de piano Antonio De Raco con Aldo Boglietti, frente a un cuadro del pintor rosarino Julio Vanzo.-» \| … |
| Aldo Boglietti | inscripciones_reverso | S16 | C01a20-S16-0004 | Leyenda manuscrita: «En la pulpería: / Dr. Carlos R. Guichón / Hilda Torres Varela / Aldo Boglietti / Radojka Pleticovic» \| Anotación: «4… |
| Aldo Boglietti | inscripciones_reverso | S19 | C01a20-S19-0059 | Mecanografiado: «Nº 1-Bigote ISCARO, próximo aspirante a “matasanos” / Nº 2-pepe díaz llave 22 medio asustao- / Nº 3-ALDO Llave 11 lucien… |
| Aldo Boglietti | inscripciones_reverso | S21 | C21a40-S21-0004 | Leyenda manuscrita: «Junto a la estufa: / Aldo Boglietti.- / poeta Julio Acosta.- / Dr. Faustino Doglio.- / Emilio Novas / el poeta Juan … |
| Aldo Boglietti | inscripciones_reverso | S26 | C21a40-S26-0049 | Leyenda manuscrita: «Una fiesta de gala en el Fogón: / Julián R. Cáceres / Tte. Cnel. Oscar Manzoni - Dr. Carlos R. Guichón.- / Carmen de… |
| Aldo Boglietti | inscripciones_reverso | S114 | C101a119-S114-0004 | Manuscrito en azul: «Libero Badii / Jorge Romero Brest / Aldo Boglietti» \| Sello seco: BOSCHETTI |
| Aldo Boglietti | inscripciones_reverso | S129 | C120a149-S129-0003 | Manuscrito (birome azul): «Alberto Gollan - Club de los 12 - Placa homenaje a Aldo Boglietti - 12/4/81 - jardín delantero Fogón - Efraín … |
| Aldo Boglietti | personas | S01 | C01a20-S01-0042 | Aldo Boglietti; Juan de Dios Mena; Víctor Marchese; Carlos Schenone |
| Aldo Boglietti | personas | S09 | C01a20-S09-0013 | Pedro López Lagar; Hilda Torres Varela; Aldo Boglietti; Jacinto Castillo; Trinaz Fox |
| Aldo Boglietti | personas | S09 | C01a20-S09-0016 | Aldo Boglietti; Víctor Marchese |
| Aldo Boglietti | personas | S14 | C01a20-S14-0002 | Jorge Luis Borges; Helvecia Urdapilleta de Boglietti; Efraín Boglietti; Avelino Hermida; Manuel Varela (h.); Aldo Boglietti |
| Aldo Boglietti | personas | S14 | C01a20-S14-0003 | Manuel Varela (h.); Aldo Boglietti; Efraín Boglietti; Jorge Luis Borges; Helvecia Urdapilleta de Boglietti; Avelino Hermida |
| Aldo Boglietti | personas | S15 | C01a20-S15-0014 | Antonio De Raco; Aldo Boglietti; Julio Vanzo |
| Aldo Boglietti | personas | S16 | C01a20-S16-0004 | Carlos R. Guichón; Hilda Torres Varela; Aldo Boglietti; Radojka Pleticovic |
| Aldo Boglietti | personas | S19 | C01a20-S19-0059 | Arturo Barea; Aldo Boglietti; Iscaro; Pepe Díaz; Guerrieri; Montoya; Aquiles Bruno; José Lasa; Miguel Bruno; Fermín José María Martinicorena |
| Aldo Boglietti | personas | S21 | C21a40-S21-0004 | Aldo Boglietti; Julio Acosta; Faustino Doglio; Emilio Novas; Juan L. Ortiz |
| Aldo Boglietti | personas | S26 | C21a40-S26-0049 | Julián R. Cáceres; Oscar Manzoni; Carlos R. Guichón; Carmen de Manzoni; Aldo Boglietti; Helvecia Urdapilleta de Boglietti; Luis Govi |
| Aldo Boglietti | personas | S88 | C81a100-S88-0018 | Manuel Varela; Esteban Piccolini; Eduardo Unertl; Julio Vanzo; Aldo Boglietti; Horacio Mascheroni; Ben Silberstein |
| Aldo Boglietti | personas | S114 | C101a119-S114-0004 | Libero Badii; Jorge Romero Brest; Aldo Boglietti |
| Aldo Boglietti | personas | S146 | C120a149-S146-0003 | Carman; Aldo Boglietti |
| Alfredo Boglietti | personas | S11 | C01a20-S11-0009 | Alfredo Boglietti; Arturo Fraser; Manolo Varela; Beba Gabardini; Hilda Torres Varela; Moisés Chilese |
| Alfredo Boglietti | personas | S26 | C21a40-S26-0051 | Lino R. Torres; Ercilia Boglietti; María Teresa Varela de Torres; Alfredo Boglietti |
| Don Alfredo Boglietti | leyenda_reverso | S11 | C01a20-S11-0009 | Con su contemporáneo Don Alfredo Boglietti mientras continúa su relato. Lo acompañan Arturo Fraser, Manolo Varela, Beba Gabardini e Hilda… |
| Don Alfredo Boglietti | leyenda_reverso | S26 | C21a40-S26-0051 | En un rincón del «Salón Verde», atrás la biblioteca. De izq. a derecha: Prof. Lino R. Torres, Ercilia Boglietti, Mª Teresa Varela de Torr… |
| Don Alfredo Boglietti | inscripciones_reverso | S26 | C21a40-S26-0051 | Leyenda manuscrita: «En un rincón del “Salón Verde” - atrás la biblioteca: / De izq. a derecha: Prof. Lino R. Torres.- / Ercilia Bogliett… |
| Sr. Aldo Boglietti | leyenda_reverso | S146 | C120a149-S146-0003 | Dr. Carman y Sr. Aldo Boglietti |
| Sr. Aldo Boglietti | inscripciones_reverso | S146 | C120a149-S146-0003 | Manuscrito: «Dr. Carman y Sr. Aldo Boglietti» |

**P4.** «Alejandro Boletta» · «Alejandro Boletta (?)»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Alejandro Boletta | leyenda_reverso | S133 | C120a149-S133-0002 | Alejandro Boletta (?), julio 1968 |
| Alejandro Boletta | inscripciones_reverso | S133 | C120a149-S133-0002 | Manuscrito: «Alejandro Boletta (?) Julio 1968»; anotación «2 10x14» y número en círculo; sello «Si desea repetir esta foto cite el Nº — F… |
| Alejandro Boletta (?) | personas | S133 | C120a149-S133-0002 | Alejandro Boletta (?) |

**P5.** «Ana Maria Kedinger» · «Ana María Kedinger»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Ana Maria Kedinger | inscripciones_reverso | S30 | C21a40-S30-0015 | Manuscrito a lápiz: «ALICIA MOGUILIANES / VIKY ABOUISSAC / ANA MARIA KEDINGER / (Recitando en coro un poema de J. D. Mena)» \| Anotaciones… |
| Ana María Kedinger | leyenda_reverso | S30 | C21a40-S30-0015 | Alicia Moguilianes, Viky Abouissac, Ana María Kedinger (recitando en coro un poema de J. D. Mena) |
| Ana María Kedinger | leyenda_reverso | S96 | C81a100-S96-0002 | Ana María Kedinger. Tchékov |
| Ana María Kedinger | inscripciones_reverso | S96 | C81a100-S96-0002 | Manuscrito: «- Ana María Kedinger / - Tchékov -» \| Anotación: «4» \| Manchas y restos de adhesivo |
| Ana María Kedinger | personas | S30 | C21a40-S30-0015 | Alicia Moguilianes; Viky Abouissac; Ana María Kedinger; Juan de Dios Mena |
| Ana María Kedinger | personas | S96 | C81a100-S96-0002 | Ana María Kedinger |

**P6.** «Angel de Seta» · «Ángel de Seta»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Angel de Seta | inscripciones_reverso | S22 | C21a40-S22-0005 | Manuscrito a lápiz: «nov. 1960 / De nuestro archivo de visitantes: TATALO / LUIS ANGEL FIRPO / DITA PALACIO Y ANGEL DE SETA» \| Anotacione… |
| Ángel de Seta | leyenda_reverso | S22 | C21a40-S22-0005 | De nuestro archivo de visitantes: Tatalo, Luis Ángel Firpo, Dita Palacio y Ángel de Seta |
| Ángel de Seta | personas | S22 | C21a40-S22-0005 | Tatalo; Luis Ángel Firpo; Dita Palacio; Ángel de Seta |

**P7.** «Antonia Doglio» · «Ma. Antonia Doglio» · «María Antonia Doglio»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Antonia Doglio | leyenda_reverso | S38 | C21a40-S38-0019 | «Cita en Senlis», 3er acto: Sra. Delachaume (Beba Gabardini) e Isabelle (Mª Antonia Doglio) |
| Antonia Doglio | leyenda_reverso | S53 | C41a60-S53-0015 | Durante la conferencia de Francisco Javier, una escena de Ionesco: Abuelo (Faustino Doglio), Abuela (Susana Glombovsky), Padre (José Bant… |
| Ma. Antonia Doglio | inscripciones_reverso | S38 | C21a40-S38-0019 | Manuscrito: «25-IX-54 / “Cita en Senlis”» \| Leyenda manuscrita: «3er acto = Sra. Delachaume (Beba Gabardini) e Isabelle (Ma. Antonia Dogl… |
| Ma. Antonia Doglio | inscripciones_reverso | S53 | C41a60-S53-0015 | Leyenda manuscrita: «Durante la conferencia de Francisco Javier, una escena de Ionesco.- Abuelo (Faustino Doglio); Abuela (Susana Glombov… |
| María Antonia Doglio | leyenda_reverso | S65 | C61a80-S65-0039 | Nº 1: Honorato (Héctor Castrillo); Arsenio (Faustino Doglio); Azouk (Toto Cáceres, tras la careta); Amelia (Linda Banti); Mimí (María Ant… |
| María Antonia Doglio | inscripciones_reverso | S65 | C61a80-S65-0039 | Manuscrito: «Nº 1- / Honorato (Héctor Castrillo); Arsenio (Faustino Doglio); Azouk (Toto Cáceres, tras la careta); Amelia (Linda Banti); … |
| María Antonia Doglio | inscripciones_reverso | S78 | C61a80-S78-0002 | Impreso (programa de mano): «ferenc molnar / LILIOM (1909) / leyenda de suburbio» \| dirección HILDA TORRES VARELA; escenografía SAMUEL SA… |
| María Antonia Doglio | personas | S38 | C21a40-S38-0019 | Beba Gabardini; María Antonia Doglio |
| María Antonia Doglio | personas | S53 | C41a60-S53-0015 | Francisco Javier; Faustino Doglio; Susana Glombovsky; José Banti; Linda Banti; Nazario Maderna; María Antonia Doglio |
| María Antonia Doglio | personas | S65 | C61a80-S65-0039 | Héctor Castrillo; Faustino Doglio; Toto Cáceres; Linda Banti; María Antonia Doglio |
| María Antonia Doglio | personas | S78 | C61a80-S78-0002 | Hilda Torres Varela; Samuel Sánchez de Bustamante; Hilda Dianda; Toto Cáceres; Faustino Doglio; Eva Sas; María Antonia Doglio; Marcos Moncad |
| María Antonia Doglio | personas | S96 | C81a100-S96-0003 | Faustino Doglio; María Antonia Doglio |

**P8.** «Antonio De Raco» · «Antonio de Raco»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Antonio De Raco | leyenda_reverso | S15 | C01a20-S15-0014 | El concertista de piano Antonio De Raco con Aldo Boglietti, frente a un cuadro del pintor rosarino Julio Vanzo |
| Antonio De Raco | leyenda_reverso | S15 | C01a20-S15-0015 | El concertista Antonio De Raco, que fuera nuestro huésped y ocupó la cama de paracaidista del Fogón, durante su concierto pro nuevo edificio |
| Antonio De Raco | inscripciones_reverso | S15 | C01a20-S15-0014 | Leyenda manuscrita: «El concertista de piano Antonio De Raco con Aldo Boglietti, frente a un cuadro del pintor rosarino Julio Vanzo.-» \| … |
| Antonio De Raco | inscripciones_reverso | S15 | C01a20-S15-0015 | Leyenda manuscrita: «El concertista Antonio De Raco, que fuera nuestro huésped y ocupó la cama de paracaidista del Fogón, durante su conc… |
| Antonio De Raco | personas | S15 | C01a20-S15-0014 | Antonio De Raco; Aldo Boglietti; Julio Vanzo |
| Antonio De Raco | personas | S15 | C01a20-S15-0015 | Antonio De Raco |
| Antonio de Raco | indice_titulo | S15 | entrada 15 | Antonio de Raco – Elizabeth Westerkamp |

**P9.** «Arcidiácono» · «Pintor Arcidiácono»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Arcidiácono | personas | S87 | C81a100-S87-0029 | Arcidiácono |
| Pintor Arcidiácono | leyenda_reverso | S87 | C81a100-S87-0029 | Pintor Arcidiácono. Fogón de los Arrieros, varios |
| Pintor Arcidiácono | inscripciones_reverso | S87 | C81a100-S87-0029 | Manuscrito: «- Pintor Arcidiácono.-» \| Manuscrito a lápiz: «Fogón de los Arrieros Varios» \| Anotación: «16774» \| Sello seco ilegible |

**P10.** «Arquitecto Romaño» · «Romaño»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Arquitecto Romaño | leyenda_reverso | S31 | C21a40-S31-0011 | Arquitecto Romaño, Horacio Rivero Sosa y Saa, Dr. Bronermon, Dr. Alberto Torres, Dr. José Babini, Dr. Dillon |
| Arquitecto Romaño | inscripciones_reverso | S31 | C21a40-S31-0011 | Manuscrito: «Arquitecto Romaño / Horacio Rivero Sosa y Saa / Dr. Bronermon - / Dr. Alberto Torres / Dr. José Babini / Dr. Dillon» \| Sello… |
| Romaño | personas | S31 | C21a40-S31-0011 | Romaño; Horacio Rivero Sosa y Saa; Bronermon; Alberto Torres; José Babini; Dillon |

**P11.** «Brigadier Moragues» · «Moragues»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Brigadier Moragues | indice_titulo | S82 | entrada 82 | Brigadier Moragues – Concentración Aerolíneas |
| Brigadier Moragues | leyenda_reverso | S82 | C81a100-S82-0014 | Juramento de la llave del Brigadier Moragues de Aerolíneas Argentinas, 17-5-61 |
| Brigadier Moragues | inscripciones_reverso | S82 | C81a100-S82-0014 | Manuscrito a lápiz: «Juramento de la llave del Brigadier Moragues de Aerolíneas Argentinas 17-5-61» \| Anotación: «Nº 82» \| Sello: SI DESE… |
| Moragues | personas | S82 | C81a100-S82-0014 | Moragues |

**P12.** «Bronermon» · «Dr. Bronermon»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Bronermon | personas | S31 | C21a40-S31-0011 | Romaño; Horacio Rivero Sosa y Saa; Bronermon; Alberto Torres; José Babini; Dillon |
| Dr. Bronermon | leyenda_reverso | S31 | C21a40-S31-0011 | Arquitecto Romaño, Horacio Rivero Sosa y Saa, Dr. Bronermon, Dr. Alberto Torres, Dr. José Babini, Dr. Dillon |
| Dr. Bronermon | inscripciones_reverso | S31 | C21a40-S31-0011 | Manuscrito: «Arquitecto Romaño / Horacio Rivero Sosa y Saa / Dr. Bronermon - / Dr. Alberto Torres / Dr. José Babini / Dr. Dillon» \| Sello… |

**P13.** «Carlos R. Guichón» · «Dr. Carlos R. Guichón»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Carlos R. Guichón | personas | S16 | C01a20-S16-0004 | Carlos R. Guichón; Hilda Torres Varela; Aldo Boglietti; Radojka Pleticovic |
| Carlos R. Guichón | personas | S16 | C01a20-S16-0005 | Carlos R. Guichón; Hilda Torres Varela |
| Carlos R. Guichón | personas | S26 | C21a40-S26-0049 | Julián R. Cáceres; Oscar Manzoni; Carlos R. Guichón; Carmen de Manzoni; Aldo Boglietti; Helvecia Urdapilleta de Boglietti; Luis Govi |
| Dr. Carlos R. Guichón | indice_titulo | S16 | entrada 16 | Dr. Carlos R. Guichón |
| Dr. Carlos R. Guichón | leyenda_reverso | S16 | C01a20-S16-0004 | En la pulpería: Dr. Carlos R. Guichón, Hilda Torres Varela, Aldo Boglietti, Radojka Pleticovic |
| Dr. Carlos R. Guichón | leyenda_reverso | S26 | C21a40-S26-0049 | Una fiesta de gala en el Fogón: Julián R. Cáceres, Tte. Cnel. Oscar Manzoni, Dr. Carlos R. Guichón, Carmen de Manzoni, Aldo Boglietti, He… |
| Dr. Carlos R. Guichón | inscripciones_reverso | S16 | C01a20-S16-0004 | Leyenda manuscrita: «En la pulpería: / Dr. Carlos R. Guichón / Hilda Torres Varela / Aldo Boglietti / Radojka Pleticovic» \| Anotación: «4… |
| Dr. Carlos R. Guichón | inscripciones_reverso | S26 | C21a40-S26-0049 | Leyenda manuscrita: «Una fiesta de gala en el Fogón: / Julián R. Cáceres / Tte. Cnel. Oscar Manzoni - Dr. Carlos R. Guichón.- / Carmen de… |

**P14.** «Carman» · «Dr. Carman»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Carman | personas | S146 | C120a149-S146-0003 | Carman; Aldo Boglietti |
| Carman | personas | S146 | C120a149-S146-0005 | Carman |
| Dr. Carman | leyenda_reverso | S146 | C120a149-S146-0003 | Dr. Carman y Sr. Aldo Boglietti |
| Dr. Carman | leyenda_reverso | S146 | C120a149-S146-0005 | Dr. Carman, presidente del Automóvil Club Argentino |
| Dr. Carman | inscripciones_reverso | S146 | C120a149-S146-0003 | Manuscrito: «Dr. Carman y Sr. Aldo Boglietti» |
| Dr. Carman | inscripciones_reverso | S146 | C120a149-S146-0005 | Manuscrito: «Dr. Carman / Pte. Automóvil Club Argentino» |

**P15.** «Córdoba Iturburu» · «Córdova Iturburu»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Córdoba Iturburu | indice_titulo | S113 | entrada 113 | Emilio Pettoruti – Córdoba Iturburu |
| Córdova Iturburu | leyenda_reverso | S146 | C120a149-S146-0004 | El crítico de arte Córdova Iturburu usa de la palabra en nombre del Fogón |
| Córdova Iturburu | inscripciones_reverso | S146 | C120a149-S146-0004 | Manuscrito: «Crítico de arte CÓRDOVA ITURBURU usa de la palabra en nombre del Fogón» |
| Córdova Iturburu | personas | S146 | C120a149-S146-0004 | Córdova Iturburu |

**P16.** «Di Luzio» · «Sr. Di Luzio»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Di Luzio | personas | S129 | C120a149-S129-0003 | Alberto Gollan; Efraín; Francisco Reyes; Di Luzio |
| Sr. Di Luzio | inscripciones_reverso | S129 | C120a149-S129-0003 | Manuscrito (birome azul): «Alberto Gollan - Club de los 12 - Placa homenaje a Aldo Boglietti - 12/4/81 - jardín delantero Fogón - Efraín … |

**P17.** «Dillon» · «Dr. Dillon»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Dillon | personas | S31 | C21a40-S31-0011 | Romaño; Horacio Rivero Sosa y Saa; Bronermon; Alberto Torres; José Babini; Dillon |
| Dr. Dillon | leyenda_reverso | S31 | C21a40-S31-0011 | Arquitecto Romaño, Horacio Rivero Sosa y Saa, Dr. Bronermon, Dr. Alberto Torres, Dr. José Babini, Dr. Dillon |
| Dr. Dillon | inscripciones_reverso | S31 | C21a40-S31-0011 | Manuscrito: «Arquitecto Romaño / Horacio Rivero Sosa y Saa / Dr. Bronermon - / Dr. Alberto Torres / Dr. José Babini / Dr. Dillon» \| Sello… |

**P18.** «Dña. Josefa Palacio» · «Josefa Palacio»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Dña. Josefa Palacio | leyenda_reverso | S01 | C01a20-S01-0040 | Detalle de la chimenea. Incrustada en las lajas, cabecita de escultura de Víctor Marchese. El farol fue enviado desde Virasoro (Prov. Cor… |
| Dña. Josefa Palacio | inscripciones_reverso | S01 | C01a20-S01-0040 | Leyenda manuscrita: «Arriba / Detalle de la chimenea - Incrustada en las lajas, cabecita de escultura de Víctor Marchese.- El Farol fué e… |
| Josefa Palacio | personas | S01 | C01a20-S01-0040 | Víctor Marchese; Josefa Palacio |

**P19.** «Don Enrique Kédinger» · «Enrique Kédinger» · «Henri Kédinger»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Don Enrique Kédinger | leyenda_reverso | S96 | C81a100-S96-0006 | Don Enrique Kédinger. Tchékov |
| Don Enrique Kédinger | inscripciones_reverso | S96 | C81a100-S96-0006 | Manuscrito: «Don Enrique Kédinger / Tchékov.-» \| Anotación: «4» (?) \| Restos de adhesivo |
| Enrique Kédinger | leyenda_reverso | S39 | C21a40-S39-0012 | «El profesor Taranne», Adamov. Los enmascarados (Annick Sanjurjo, Héctor Castrillo, Efraín Boglietti, Horacio Aguirre, Enrique Kédinger, … |
| Enrique Kédinger | inscripciones_reverso | S39 | C21a40-S39-0012 | Leyenda manuscrita: «“EL PROFESOR TARANNE” - ADAMOV.- / Los enmascarados (Annick Sanjurjo - Héctor Castrillo [agregado sobre nombre tacha… |
| Enrique Kédinger | inscripciones_reverso | S78 | C61a80-S78-0002 | Impreso (programa de mano): «ferenc molnar / LILIOM (1909) / leyenda de suburbio» \| dirección HILDA TORRES VARELA; escenografía SAMUEL SA… |
| Enrique Kédinger | personas | S39 | C21a40-S39-0012 | Annick Sanjurjo; Héctor Castrillo; Efraín Boglietti; Horacio Aguirre; Enrique Kédinger; Linda Banti; Coco Celada; Rubén Rolón; Toto Cáceres |
| Enrique Kédinger | personas | S78 | C61a80-S78-0002 | Hilda Torres Varela; Samuel Sánchez de Bustamante; Hilda Dianda; Toto Cáceres; Faustino Doglio; Eva Sas; María Antonia Doglio; Marcos Moncad |
| Enrique Kédinger | personas | S96 | C81a100-S96-0006 | Enrique Kédinger |
| Henri Kédinger | inscripciones_reverso | S78 | C61a80-S78-0002 | Impreso (programa de mano): «ferenc molnar / LILIOM (1909) / leyenda de suburbio» \| dirección HILDA TORRES VARELA; escenografía SAMUEL SA… |

**P20.** «Don Medina» · «Medina»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Don Medina | leyenda_reverso | S02 | C01a20-S02-0005 | Don Medina |
| Don Medina | inscripciones_reverso | S02 | C01a20-S02-0005 | Manuscrito: «DON MEDINA» (subrayado) \| Manuscrito en rojo: «Inv. 1996 Nº 24» \| Anotaciones en azul: «13» (en círculo), «5» \| Sello seco i… |
| Medina | personas | S02 | C01a20-S02-0005 | Medina |

**P21.** «Don Moisés Chilese» · «Moisés Chilese»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Don Moisés Chilese | leyenda_reverso | S11 | C01a20-S11-0010 | Don Moisés Chilese, a los 85 años, durante su relato |
| Don Moisés Chilese | inscripciones_reverso | S11 | C01a20-S11-0010 | Manuscrito: «Don Moisés Chilese, a los 85 años, durante su relato.» \| Anotación: «9?-6» \| Sello: PISSANO |
| Moisés Chilese | indice_titulo | S11 | entrada 11 | Moisés Chilese |
| Moisés Chilese | personas | S11 | C01a20-S11-0008 | Arturo Fraser; Moisés Chilese |
| Moisés Chilese | personas | S11 | C01a20-S11-0009 | Alfredo Boglietti; Arturo Fraser; Manolo Varela; Beba Gabardini; Hilda Torres Varela; Moisés Chilese |
| Moisés Chilese | personas | S11 | C01a20-S11-0010 | Moisés Chilese |

**P22.** «Dr. Faustino Doglio» · «Faustino Doglio»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Dr. Faustino Doglio | leyenda_reverso | S21 | C21a40-S21-0004 | Junto a la estufa: Aldo Boglietti, poeta Julio Acosta, Dr. Faustino Doglio, Emilio Novas, el poeta Juan L. Ortiz |
| Dr. Faustino Doglio | leyenda_reverso | S58 | C41a60-S58-0052 | «Una libra de carne», Cuzzani: aspecto del público. En el banquillo, Belúver (Dr. Faustino Doglio) |
| Dr. Faustino Doglio | inscripciones_reverso | S21 | C21a40-S21-0004 | Leyenda manuscrita: «Junto a la estufa: / Aldo Boglietti.- / poeta Julio Acosta.- / Dr. Faustino Doglio.- / Emilio Novas / el poeta Juan … |
| Dr. Faustino Doglio | inscripciones_reverso | S58 | C41a60-S58-0052 | Manuscrito: «“UNA LIBRA DE CARNE” - CUZZANI.- / Aspecto del público.- En el banquillo, Belúver (Dr. Faustino Doglio).-» \| Anotaciones: «3… |
| Faustino Doglio | leyenda_reverso | S38 | C21a40-S38-0018 | «Cita en Senlis», 1er acto: Jorge (Faustino Doglio), Philémon (Toto Cáceres) y Sra. Montalembreuse |
| Faustino Doglio | leyenda_reverso | S53 | C41a60-S53-0015 | Durante la conferencia de Francisco Javier, una escena de Ionesco: Abuelo (Faustino Doglio), Abuela (Susana Glombovsky), Padre (José Bant… |
| Faustino Doglio | leyenda_reverso | S65 | C61a80-S65-0039 | Nº 1: Honorato (Héctor Castrillo); Arsenio (Faustino Doglio); Azouk (Toto Cáceres, tras la careta); Amelia (Linda Banti); Mimí (María Ant… |
| Faustino Doglio | leyenda_reverso | S96 | C81a100-S96-0003 | Faustino Doglio y Mª Antonia. Tchékov |
| Faustino Doglio | leyenda_reverso | S96 | C81a100-S96-0007 | Faustino Doglio. Tchékov |
| Faustino Doglio | inscripciones_reverso | S38 | C21a40-S38-0018 | Manuscrito: «25-IX-54 / “Cita en Senlis”» \| Leyenda manuscrita: «1er acto = Jorge (Faustino Doglio), Philémon (Toto Cáceres) y Sra. Monta… |
| Faustino Doglio | inscripciones_reverso | S53 | C41a60-S53-0015 | Leyenda manuscrita: «Durante la conferencia de Francisco Javier, una escena de Ionesco.- Abuelo (Faustino Doglio); Abuela (Susana Glombov… |
| Faustino Doglio | inscripciones_reverso | S65 | C61a80-S65-0039 | Manuscrito: «Nº 1- / Honorato (Héctor Castrillo); Arsenio (Faustino Doglio); Azouk (Toto Cáceres, tras la careta); Amelia (Linda Banti); … |
| Faustino Doglio | inscripciones_reverso | S78 | C61a80-S78-0002 | Impreso (programa de mano): «ferenc molnar / LILIOM (1909) / leyenda de suburbio» \| dirección HILDA TORRES VARELA; escenografía SAMUEL SA… |
| Faustino Doglio | inscripciones_reverso | S96 | C81a100-S96-0003 | Manuscrito: «Faustino Doglio y Ma. Antonia. / Tchékov -» \| Anotación: «8» \| Restos de adhesivo |
| Faustino Doglio | inscripciones_reverso | S96 | C81a100-S96-0007 | Manuscrito: «Faustino Doglio.- / Tchékov.» \| Anotación: «W» o «3» (?) \| Mancha de tinta |
| Faustino Doglio | personas | S21 | C21a40-S21-0004 | Aldo Boglietti; Julio Acosta; Faustino Doglio; Emilio Novas; Juan L. Ortiz |
| Faustino Doglio | personas | S38 | C21a40-S38-0018 | Faustino Doglio; Toto Cáceres |
| Faustino Doglio | personas | S53 | C41a60-S53-0015 | Francisco Javier; Faustino Doglio; Susana Glombovsky; José Banti; Linda Banti; Nazario Maderna; María Antonia Doglio |
| Faustino Doglio | personas | S58 | C41a60-S58-0052 | Faustino Doglio |
| Faustino Doglio | personas | S65 | C61a80-S65-0039 | Héctor Castrillo; Faustino Doglio; Toto Cáceres; Linda Banti; María Antonia Doglio |
| Faustino Doglio | personas | S78 | C61a80-S78-0002 | Hilda Torres Varela; Samuel Sánchez de Bustamante; Hilda Dianda; Toto Cáceres; Faustino Doglio; Eva Sas; María Antonia Doglio; Marcos Moncad |
| Faustino Doglio | personas | S96 | C81a100-S96-0003 | Faustino Doglio; María Antonia Doglio |
| Faustino Doglio | personas | S96 | C81a100-S96-0007 | Faustino Doglio |

**P23.** «Dr. Guichón» · «Guichón»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Dr. Guichón | leyenda_reverso | S16 | C01a20-S16-0005 | Dr. Guichón hablando durante la despedida de Hilda |
| Guichón | inscripciones_reverso | S16 | C01a20-S16-0005 | Manuscrito en azul: «Dr. [Carlos?] Guichón hablando durante la despedida de Hilda» \| Anotación: «3» |

**P24.** «Dr. José Babini» · «José Babini» · «José Banti»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Dr. José Babini | leyenda_reverso | S31 | C21a40-S31-0011 | Arquitecto Romaño, Horacio Rivero Sosa y Saa, Dr. Bronermon, Dr. Alberto Torres, Dr. José Babini, Dr. Dillon |
| Dr. José Babini | inscripciones_reverso | S31 | C21a40-S31-0011 | Manuscrito: «Arquitecto Romaño / Horacio Rivero Sosa y Saa / Dr. Bronermon - / Dr. Alberto Torres / Dr. José Babini / Dr. Dillon» \| Sello… |
| José Babini | indice_titulo | S31 | entrada 31 | José Babini |
| José Babini | leyenda_reverso | S31 | C21a40-S31-0012 | José Babini, diciembre 60 |
| José Babini | inscripciones_reverso | S31 | C21a40-S31-0012 | Manuscrito: «José Babini / Diciembre 60» \| Sello: SI DESEA REPETIR ESTA FOTO CITE EL Nº 62330 Foto “BOSCHETTI” RESISTENCIA \| Restos de ad… |
| José Babini | personas | S31 | C21a40-S31-0011 | Romaño; Horacio Rivero Sosa y Saa; Bronermon; Alberto Torres; José Babini; Dillon |
| José Babini | personas | S31 | C21a40-S31-0012 | José Babini |
| José Banti | leyenda_reverso | S46 | C41a60-S46-0026 | «Fin de semana», Noel Coward: Judith (Linda Banti), Diplomático (José Banti) |
| José Banti | leyenda_reverso | S53 | C41a60-S53-0015 | Durante la conferencia de Francisco Javier, una escena de Ionesco: Abuelo (Faustino Doglio), Abuela (Susana Glombovsky), Padre (José Bant… |
| José Banti | inscripciones_reverso | S46 | C41a60-S46-0026 | Manuscrito: «“Fin de Semana” Noel Coward. / Judith (Linda BANTI), Diplomático (JOSÉ BANTI)» \| Anotación: «48-60» \| Sello: PISSANO |
| José Banti | inscripciones_reverso | S53 | C41a60-S53-0015 | Leyenda manuscrita: «Durante la conferencia de Francisco Javier, una escena de Ionesco.- Abuelo (Faustino Doglio); Abuela (Susana Glombov… |
| José Banti | personas | S46 | C41a60-S46-0026 | Linda Banti; José Banti |
| José Banti | personas | S53 | C41a60-S53-0015 | Francisco Javier; Faustino Doglio; Susana Glombovsky; José Banti; Linda Banti; Nazario Maderna; María Antonia Doglio |
| José Banti | personas | S65 | C61a80-S65-0040 | Yvonne de Kedinger; Poen Alarcón; Joaquín del Villar; José Banti |

**P25.** «Dr. José R. Bergallo» · «José R. Bergallo»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Dr. José R. Bergallo | indice_titulo | S33 | entrada 33 | Dr. José R. Bergallo |
| Dr. José R. Bergallo | leyenda_reverso | S33 | C21a40-S33-0003 | El Dr. José R. Bergallo haciendo uso de la palabra en el Fogón en ocasión de su charla del 21 de junio de 1949 |
| Dr. José R. Bergallo | inscripciones_reverso | S33 | C21a40-S33-0003 | Manuscrito: «DEVOLVER AL FOGÓN» (subrayado) y palabra tachada \| Leyenda manuscrita: «El Dr. José R. Bergallo haciendo uso de la palabra e… |
| José R. Bergallo | personas | S33 | C21a40-S33-0002 | José R. Bergallo |
| José R. Bergallo | personas | S33 | C21a40-S33-0003 | José R. Bergallo |

**P26.** «Dr. Luis Govi» · «Luis Govi»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Dr. Luis Govi | leyenda_reverso | S19 | C01a20-S19-0060 | BBC Latin-American Service: en representación del grupo «El Fogón de los Arrieros», el Dr. Luis Govi entrega a la Sra. Ilsa, viuda de Bar… |
| Dr. Luis Govi | leyenda_reverso | S26 | C21a40-S26-0049 | Una fiesta de gala en el Fogón: Julián R. Cáceres, Tte. Cnel. Oscar Manzoni, Dr. Carlos R. Guichón, Carmen de Manzoni, Aldo Boglietti, He… |
| Dr. Luis Govi | inscripciones_reverso | S19 | C01a20-S19-0060 | Mecanografiado: «AW.51,584 16.8.61. / BBC LATIN-AMERICAN SERVICE / En representación del grupo “El Fogón de los Arrieros”, de Resistencia… |
| Dr. Luis Govi | inscripciones_reverso | S26 | C21a40-S26-0049 | Leyenda manuscrita: «Una fiesta de gala en el Fogón: / Julián R. Cáceres / Tte. Cnel. Oscar Manzoni - Dr. Carlos R. Guichón.- / Carmen de… |
| Luis Govi | personas | S19 | C01a20-S19-0060 | Luis Govi; Ilsa Barea; W. A. Tate; Arturo Barea |
| Luis Govi | personas | S26 | C21a40-S26-0049 | Julián R. Cáceres; Oscar Manzoni; Carlos R. Guichón; Carmen de Manzoni; Aldo Boglietti; Helvecia Urdapilleta de Boglietti; Luis Govi |

**P27.** «Dr. Michel Lataza» · «Michel Lataza»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Dr. Michel Lataza | leyenda_reverso | S09 | C01a20-S09-0014 | Un día cualquiera. Dr. Michel Lataza, Lorenzo Schenone, Lidia Guasti, Silvio Bertini, Pedro López Lagar, Efraín Boglietti, 2 actrices de … |
| Dr. Michel Lataza | inscripciones_reverso | S09 | C01a20-S09-0014 | Leyenda manuscrita: «= Un día cualquiera.- / Dr. Michel Lataza / Lorenzo Schenone / Lidia Guasti / Silvio Bertini / Pedro López Lagar / E… |
| Michel Lataza | personas | S09 | C01a20-S09-0014 | Michel Lataza; Lorenzo Schenone; Lidia Guasti; Silvio Bertini; Pedro López Lagar; Efraín Boglietti; Carlos Mariscotti |

**P28.** «Dr. Torres» · «Torres»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Dr. Torres | leyenda_reverso | S02 | C01a20-S02-0004 | Dr. Torres |
| Dr. Torres | inscripciones_reverso | S02 | C01a20-S02-0004 | Manuscrito en rojo: «“Dr. Torres”» \| Manuscrito en rojo: «Inv. Nº 27 / 1996» \| Anotación en azul: «5)» \| Sello seco ilegible \| Restos de … |
| Dr. Torres | personas | S02 | C01a20-S02-0004 | Dr. Torres |
| Torres | leyenda_reverso | S65 | C61a80-S65-0038 | Antonio (Toto Maderna) y Mimí. Entre el público, el Sr. Interventor Federal con su familia, Sras. de Taboada, de Torres, de Varela |
| Torres | inscripciones_reverso | S65 | C61a80-S65-0038 | Manuscrito: «Nº 2 / Antonio (Toto Maderna) y Mimí. Entre el público, el Sr. Interventor Federal con su familia, Sras. de Taboada, de Torr… |

**P29.** «Faluggi’s Brothers» · «Faluggi’’s Brothers»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Faluggi’s Brothers | leyenda_reverso | S95 | C81a100-S95-0004 | Nelly Vaccarezza de Vaccarezza («la bandada de elefantes») y Faluggi’s Brothers |
| Faluggi’’s Brothers | inscripciones_reverso | S95 | C81a100-S95-0004 | Manuscrito: «Nelly Vaccarezza de Vaccarezza (“la bandada de elefantes”) y Faluggi’’s Brothers.-» \| Anotación: «24971» \| Sello: SI DESEA R… |

**P30.** «Horacio Rivero Sosa» · «Horacio Rivero Sosa y Saa»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Horacio Rivero Sosa | leyenda_reverso | S31 | C21a40-S31-0011 | Arquitecto Romaño, Horacio Rivero Sosa y Saa, Dr. Bronermon, Dr. Alberto Torres, Dr. José Babini, Dr. Dillon |
| Horacio Rivero Sosa | inscripciones_reverso | S31 | C21a40-S31-0011 | Manuscrito: «Arquitecto Romaño / Horacio Rivero Sosa y Saa / Dr. Bronermon - / Dr. Alberto Torres / Dr. José Babini / Dr. Dillon» \| Sello… |
| Horacio Rivero Sosa y Saa | personas | S31 | C21a40-S31-0011 | Romaño; Horacio Rivero Sosa y Saa; Bronermon; Alberto Torres; José Babini; Dillon |

**P31.** «Ilsa Barea» · «Sra. Ilsa de Barea»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Ilsa Barea | personas | S19 | C01a20-S19-0060 | Luis Govi; Ilsa Barea; W. A. Tate; Arturo Barea |
| Ilsa Barea | personas | S106 | C101a119-S106-0016 | Ilsa Barea; Arturo Barea |
| Sra. Ilsa de Barea | leyenda_reverso | S106 | C101a119-S106-0016 | BBC Latin-American Service: fotografía tomada durante la visita de una delegación del grupo «El Fogón de los Arrieros» a la sede del Serv… |
| Sra. Ilsa de Barea | inscripciones_reverso | S106 | C101a119-S106-0016 | Mecanografiado: «AW.51,585 16.8.61. / BBC LATIN-AMERICAN SERVICE. / Fotografía tomada durante la visita de una delegación del grupo “El F… |

**P32.** «Joaquín del Villar» · «Julián del Villar»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Joaquín del Villar | leyenda_reverso | S65 | C61a80-S65-0040 | Nº 3: Honorato, Sra. Ancelín (Yvonne de Kedinger), Buez (Poen Alarcón), Colombani (Joaquín del Villar), Botella (Pepe Banti) |
| Joaquín del Villar | inscripciones_reverso | S65 | C61a80-S65-0040 | Manuscrito: «Nº 3 / Honorato, Sra. Ancelín (Yvonne de Kedinger) Buez [sobre palabra tachada] (Poen Alarcón) / Colombani (Joaquín del Vill… |
| Joaquín del Villar | personas | S65 | C61a80-S65-0040 | Yvonne de Kedinger; Poen Alarcón; Joaquín del Villar; José Banti |
| Julián del Villar | inscripciones_reverso | S78 | C61a80-S78-0002 | Impreso (programa de mano): «ferenc molnar / LILIOM (1909) / leyenda de suburbio» \| dirección HILDA TORRES VARELA; escenografía SAMUEL SA… |

**P33.** «José Ma. Orentanz» · «José María Orentanz»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| José Ma. Orentanz | inscripciones_reverso | S96 | C81a100-S96-0004 | Manuscrito: «José Ma. Orentanz (?) / Tchékov.» \| Anotación: «7» \| Manchas |
| José María Orentanz | personas | S96 | C81a100-S96-0004 | José María Orentanz |

**P34.** «Kay» · «Mr. Kay»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Kay | personas | S148 | C120a149-S148-0005 | Kay |
| Mr. Kay | leyenda_reverso | S148 | C120a149-S148-0005 | Mr. Kay, junio 1969 |
| Mr. Kay | inscripciones_reverso | S148 | C120a149-S148-0005 | Manuscrito: «Mr. Kay / Junio 1969» |

**P35.** «Lino R. Torres» · «Prof. Lino R. Torres»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Lino R. Torres | personas | S26 | C21a40-S26-0051 | Lino R. Torres; Ercilia Boglietti; María Teresa Varela de Torres; Alfredo Boglietti |
| Prof. Lino R. Torres | leyenda_reverso | S26 | C21a40-S26-0051 | En un rincón del «Salón Verde», atrás la biblioteca. De izq. a derecha: Prof. Lino R. Torres, Ercilia Boglietti, Mª Teresa Varela de Torr… |
| Prof. Lino R. Torres | inscripciones_reverso | S26 | C21a40-S26-0051 | Leyenda manuscrita: «En un rincón del “Salón Verde” - atrás la biblioteca: / De izq. a derecha: Prof. Lino R. Torres.- / Ercilia Bogliett… |

**P36.** «Luis Angel Firpo» · «Luis Ángel Firpo»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Luis Angel Firpo | inscripciones_reverso | S22 | C21a40-S22-0005 | Manuscrito a lápiz: «nov. 1960 / De nuestro archivo de visitantes: TATALO / LUIS ANGEL FIRPO / DITA PALACIO Y ANGEL DE SETA» \| Anotacione… |
| Luis Ángel Firpo | indice_titulo | S22 | entrada 22 | Luis Ángel Firpo |
| Luis Ángel Firpo | leyenda_reverso | S22 | C21a40-S22-0005 | De nuestro archivo de visitantes: Tatalo, Luis Ángel Firpo, Dita Palacio y Ángel de Seta |
| Luis Ángel Firpo | personas | S22 | C21a40-S22-0005 | Tatalo; Luis Ángel Firpo; Dita Palacio; Ángel de Seta |

**P37.** «Ma. Élida Castells» · «María Élida Castells» · «Élida Castells»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Ma. Élida Castells | inscripciones_reverso | S46 | C41a60-S46-0025 | Manuscrito: «“Fin de Semana” / Noel Coward / Ma. Élida Castells - Pilán Alarcón» \| Anotación: «48-63» \| Sello: PISSANO |
| María Élida Castells | personas | S46 | C41a60-S46-0025 | María Élida Castells; Pilán Alarcón |
| Élida Castells | leyenda_reverso | S46 | C41a60-S46-0025 | «Fin de semana», Noel Coward: Mª Élida Castells, Pilán Alarcón |

**P38.** «María Teresa Varela de Torres» · «Teresa Varela de Torres»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| María Teresa Varela de Torres | personas | S26 | C21a40-S26-0051 | Lino R. Torres; Ercilia Boglietti; María Teresa Varela de Torres; Alfredo Boglietti |
| Teresa Varela de Torres | leyenda_reverso | S26 | C21a40-S26-0051 | En un rincón del «Salón Verde», atrás la biblioteca. De izq. a derecha: Prof. Lino R. Torres, Ercilia Boglietti, Mª Teresa Varela de Torr… |
| Teresa Varela de Torres | inscripciones_reverso | S26 | C21a40-S26-0051 | Leyenda manuscrita: «En un rincón del “Salón Verde” - atrás la biblioteca: / De izq. a derecha: Prof. Lino R. Torres.- / Ercilia Bogliett… |

**P39.** «Miguel Bruno» · «Miguelito Bruno»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Miguel Bruno | personas | S19 | C01a20-S19-0059 | Arturo Barea; Aldo Boglietti; Iscaro; Pepe Díaz; Guerrieri; Montoya; Aquiles Bruno; José Lasa; Miguel Bruno; Fermín José María Martinicorena |
| Miguelito Bruno | inscripciones_reverso | S19 | C01a20-S19-0059 | Mecanografiado: «Nº 1-Bigote ISCARO, próximo aspirante a “matasanos” / Nº 2-pepe díaz llave 22 medio asustao- / Nº 3-ALDO Llave 11 lucien… |

**P40.** «Samuel Sanchez de Bustamante» · «Samuel Sánchez de Bustamante»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Samuel Sanchez de Bustamante | inscripciones_reverso | S78 | C61a80-S78-0002 | Impreso (programa de mano): «ferenc molnar / LILIOM (1909) / leyenda de suburbio» \| dirección HILDA TORRES VARELA; escenografía SAMUEL SA… |
| Samuel Sánchez de Bustamante | personas | S78 | C61a80-S78-0002 | Hilda Torres Varela; Samuel Sánchez de Bustamante; Hilda Dianda; Toto Cáceres; Faustino Doglio; Eva Sas; María Antonia Doglio; Marcos Moncad |

**P41.** «Susana Glombovsky» · «Susana Slomkovsky»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Susana Glombovsky | leyenda_reverso | S53 | C41a60-S53-0015 | Durante la conferencia de Francisco Javier, una escena de Ionesco: Abuelo (Faustino Doglio), Abuela (Susana Glombovsky), Padre (José Bant… |
| Susana Glombovsky | inscripciones_reverso | S53 | C41a60-S53-0015 | Leyenda manuscrita: «Durante la conferencia de Francisco Javier, una escena de Ionesco.- Abuelo (Faustino Doglio); Abuela (Susana Glombov… |
| Susana Glombovsky | personas | S53 | C41a60-S53-0015 | Francisco Javier; Faustino Doglio; Susana Glombovsky; José Banti; Linda Banti; Nazario Maderna; María Antonia Doglio |
| Susana Slomkovsky | leyenda_reverso | S04 | C01a20-S04-0006 | Visita de «Fray Mocho»: Nilda Britos, Estela Obario, Irene Panelo y Antonio, recibidos jubilosamente por los fogoneros. Entre ellos Sra. … |
| Susana Slomkovsky | inscripciones_reverso | S04 | C01a20-S04-0006 | Leyenda manuscrita: «VISITA DE “FRAY MOCHO” / Nilda Britos / Estela Obario / Irene Panelo / y Antonio, recibidos jubilosamente por los fo… |
| Susana Slomkovsky | personas | S04 | C01a20-S04-0006 | Nilda Britos; Estela Obario; Irene Panelo; Susana Slomkovsky |

**P42.** «U. Betti» · «Ugo Betti»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| U. Betti | inscripciones_reverso | S78 | C61a80-S78-0002 | Impreso (programa de mano): «ferenc molnar / LILIOM (1909) / leyenda de suburbio» \| dirección HILDA TORRES VARELA; escenografía SAMUEL SA… |
| Ugo Betti | leyenda_reverso | S25 | C21a40-S25-0006 | Elenco «El jugador», de Ugo Betti (1955) |
| Ugo Betti | leyenda_reverso | S25 | C21a40-S25-0007 | Una escena de «El jugador» de Ugo Betti: Ennio (Héctor Castrillo) e Iva (Linda Banti). Foto Nº 3 |
| Ugo Betti | inscripciones_reverso | S25 | C21a40-S25-0006 | Manuscrito: «(1955) Elenco El jugador, de Ugo Betti» \| Anotación: «53-55» \| Sello: PISSANO |
| Ugo Betti | inscripciones_reverso | S25 | C21a40-S25-0007 | Manuscrito: «Una escena de “EL JUGADOR” de UGO BETTI - Ennio (Héctor Castrillo) e Iva (Linda Banti) / Foto Nº 3» \| Anotación: «53-50» \| S… |

**P43.** «Yvonne Kédinger» · «Yvonne de Kedinger»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Yvonne Kédinger | leyenda_reverso | S24 | C21a40-S24-0028 | «El café de Pomona», en primer plano Señora Rosa (Yvonne Kédinger) y Pascal (Poen Alarcón); al fondo los «doloristas» y «cavernistas» |
| Yvonne Kédinger | inscripciones_reverso | S24 | C21a40-S24-0028 | Manuscrito: «DEVOLVER AL FOGÓN.» (subrayado) \| Leyenda manuscrita: «“El Café de Pomona”, en primer plano Señora Rosa (Yvonne Kédinger) y … |
| Yvonne Kédinger | personas | S24 | C21a40-S24-0028 | Yvonne Kédinger; Poen Alarcón |
| Yvonne de Kedinger | leyenda_reverso | S65 | C61a80-S65-0040 | Nº 3: Honorato, Sra. Ancelín (Yvonne de Kedinger), Buez (Poen Alarcón), Colombani (Joaquín del Villar), Botella (Pepe Banti) |
| Yvonne de Kedinger | inscripciones_reverso | S65 | C61a80-S65-0040 | Manuscrito: «Nº 3 / Honorato, Sra. Ancelín (Yvonne de Kedinger) Buez [sobre palabra tachada] (Poen Alarcón) / Colombani (Joaquín del Vill… |
| Yvonne de Kedinger | personas | S65 | C61a80-S65-0040 | Yvonne de Kedinger; Poen Alarcón; Joaquín del Villar; José Banti |

### Lugares: grupos por similitud (0)

Sin grupos.

### Instituciones: grupos por similitud (4)

**I1.** «Aerolíneas Argentinas» · «Aerolíneas Argentinas 17»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Aerolíneas Argentinas | leyenda_reverso | S82 | C81a100-S82-0014 | Juramento de la llave del Brigadier Moragues de Aerolíneas Argentinas, 17-5-61 |
| Aerolíneas Argentinas 17 | inscripciones_reverso | S82 | C81a100-S82-0014 | Manuscrito a lápiz: «Juramento de la llave del Brigadier Moragues de Aerolíneas Argentinas 17-5-61» \| Anotación: «Nº 82» \| Sello: SI DESE… |

**I2.** «BBC LATIN» · «BBC Latin»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| BBC LATIN | inscripciones_reverso | S19 | C01a20-S19-0060 | Mecanografiado: «AW.51,584 16.8.61. / BBC LATIN-AMERICAN SERVICE / En representación del grupo “El Fogón de los Arrieros”, de Resistencia… |
| BBC LATIN | inscripciones_reverso | S106 | C101a119-S106-0016 | Mecanografiado: «AW.51,585 16.8.61. / BBC LATIN-AMERICAN SERVICE. / Fotografía tomada durante la visita de una delegación del grupo “El F… |
| BBC Latin | leyenda_reverso | S19 | C01a20-S19-0060 | BBC Latin-American Service: en representación del grupo «El Fogón de los Arrieros», el Dr. Luis Govi entrega a la Sra. Ilsa, viuda de Bar… |
| BBC Latin | leyenda_reverso | S106 | C101a119-S106-0016 | BBC Latin-American Service: fotografía tomada durante la visita de una delegación del grupo «El Fogón de los Arrieros» a la sede del Serv… |

**I3.** «Directorio de La Forestal Argentina» · «Directorio de la Forestal Argentina»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Directorio de La Forestal Argentina | indice_titulo | S80 | entrada 80 | Directorio de La Forestal Argentina |
| Directorio de la Forestal Argentina | leyenda_reverso | S87 | C81a100-S87-0028 | Directorio de la Forestal Argentina |
| Directorio de la Forestal Argentina | inscripciones_reverso | S87 | C81a100-S87-0028 | Manuscrito a lápiz: «Directorio de la Forestal Argentina» \| Sello: SI DESEA REPETIR ESTA FOTO CITE EL Nº … Foto BOSCHETTI - Resistencia (… |

**I4.** «Hostal del Conde de Gondomar» · «Hostal del Conde de Gondomar. Chon»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Hostal del Conde de Gondomar | inscripciones_reverso | S126 | C120a149-S126-0015 | Manuscrito: «Vigo (alrededores, en TUY) Hostal del Conde de Gondomar — Chon y su Bambina — febrero 1973»; numeración impresa en el borde |
| Hostal del Conde de Gondomar. Chon | leyenda_reverso | S126 | C120a149-S126-0015 | Vigo (alrededores, en Tuy). Hostal del Conde de Gondomar. Chon y su Bambina, febrero 1973 |

### Fotógrafos y estudios: grupos por similitud (0)

Sin grupos.

### Obras: grupos por similitud (1)

**O1.** «La libra de carne» · «Una libra de carne»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| La libra de carne | indice_titulo | S58 | entrada 58 | Teatro: "La libra de carne" |
| Una libra de carne | leyenda_reverso | S58 | C41a60-S58-0050 | «Una libra de carne», Cuzzani: aspecto del proceso. Al fondo, la estatua de la justicia |
| Una libra de carne | leyenda_reverso | S58 | C41a60-S58-0051 | «Una libra de carne», Cuzzani: dos acreedores (Hugo Sudriá y Marcos Sanjurjo) |
| Una libra de carne | leyenda_reverso | S58 | C41a60-S58-0052 | «Una libra de carne», Cuzzani: aspecto del público. En el banquillo, Belúver (Dr. Faustino Doglio) |
| Una libra de carne | inscripciones_reverso | S58 | C41a60-S58-0050 | Manuscrito: «“UNA LIBRA DE CARNE” - CUZZANI.- / Aspecto del proceso - Al fondo, la estatua de la justicia.-» \| Anotaciones: «42», «7» \| S… |
| Una libra de carne | inscripciones_reverso | S58 | C41a60-S58-0051 | Manuscrito: «“UNA LIBRA DE CARNE” - CUZZANI.- / Dos acreedores (Hugo Sudriá y Marcos Sanjurjo).- / Nº 6» \| Anotación: «332» \| Sello: PISSANO |
| Una libra de carne | inscripciones_reverso | S58 | C41a60-S58-0052 | Manuscrito: «“UNA LIBRA DE CARNE” - CUZZANI.- / Aspecto del público.- En el banquillo, Belúver (Dr. Faustino Doglio).-» \| Anotaciones: «3… |
| Una libra de carne | inscripciones_reverso | S78 | C61a80-S78-0002 | Impreso (programa de mano): «ferenc molnar / LILIOM (1909) / leyenda de suburbio» \| dirección HILDA TORRES VARELA; escenografía SAMUEL SA… |

### Eventos: grupos por similitud (2)

**E1.** «Juramento de la llave del Brigadier Moragues de Aerolíneas Argentinas 17-5-61» · «Juramento de la llave del Brigadier Moragues de Aerolíneas Argentinas, 17-5-61»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Juramento de la llave del Brigadier Moragues de Aerolíneas Argentinas 17-5-61 | inscripciones_reverso | S82 | C81a100-S82-0014 | Manuscrito a lápiz: «Juramento de la llave del Brigadier Moragues de Aerolíneas Argentinas 17-5-61» \| Anotación: «Nº 82» \| Sello: SI DESE… |
| Juramento de la llave del Brigadier Moragues de Aerolíneas Argentinas, 17-5-61 | leyenda_reverso | S82 | C81a100-S82-0014 | Juramento de la llave del Brigadier Moragues de Aerolíneas Argentinas, 17-5-61 |

**E2.** «Visita ARTURO BAREA y ALDO BOGLIETTI A LA CIUDAD DE CORDOBA» · «Visita de Arturo Barea y Aldo Boglietti a la ciudad de Córdoba»

| Variante | Campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- | --- |
| Visita ARTURO BAREA y ALDO BOGLIETTI A LA CIUDAD DE CORDOBA | inscripciones_reverso | S19 | C01a20-S19-0059 | Mecanografiado: «Nº 1-Bigote ISCARO, próximo aspirante a “matasanos” / Nº 2-pepe díaz llave 22 medio asustao- / Nº 3-ALDO Llave 11 lucien… |
| Visita de Arturo Barea y Aldo Boglietti a la ciudad de Córdoba | leyenda_reverso | S19 | C01a20-S19-0059 | Visita de Arturo Barea y Aldo Boglietti a la ciudad de Córdoba |

### Personas: nombre suelto con nombre completo

Una sola palabra que coincide con el **primer** término de un nombre completo (nombre de pila) o con el **último** (apellido). Es solo una coincidencia de forma: no confirma que se trate de la misma persona.

#### Nombre de pila (18)

**«Aldo»** → «Aldo Boglietti» · «Sr. Aldo Boglietti»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| indice_titulo | S26 | entrada 26 | Cumpleaños de Aldo |
| indice_titulo | S32 | entrada 32 | Teatro: Obra de Hochwälder – Conferencia de Aldo |
| indice_titulo | S67 | entrada 67 | Aldo |
| indice_titulo | S68 | entrada 68 | Aldo |
| indice_titulo | S69 | entrada 69 | Aldo |
| leyenda_reverso | S01 | C01a20-S01-0039 | Cielo del dormitorio de Aldo. 26° de latitud austral (en escala) |
| leyenda_reverso | S09 | C01a20-S09-0013 | Dormitorio de Aldo. Pedro López Lagar e Hilda Torres Varela. Al fondo, un retrato de Aldo hecho por el pintor Jacinto Castillo. Las decor… |
| leyenda_reverso | S09 | C01a20-S09-0015 | En el dormitorio «azul» de Aldo: Pedro López Lagar y Loreta Melovo |
| leyenda_reverso | S88 | C81a100-S88-0018 | Los 7 grandes: Ingº Gallego Manolo Varela (actual Director General de Construcción); Ingº Esteban Piccolini (director de Resistencia); Ed… |
| leyenda_reverso | S130 | C120a149-S130-0002 | Casamiento Vedinger - Rizzotti: Efraín, C. Jarreguy (?), Pierre Baunere (?), Sra. de Rossi, Hilda, Aldo, Pía (?) Rossi |
| leyenda_reverso | S131 | C120a149-S131-0001 | Sobre de Foto Boschetti dirigido a «Aldo» |
| leyenda_reverso | S132 | C120a149-S132-0002 | Recuerdo de Susana y Raúl Nicotra (?) para Aldo e Hilda, Resistencia, 17 de marzo de 1974 |
| inscripciones_reverso | S01 | C01a20-S01-0039 | Leyenda manuscrita: «Cielo del dormitorio de Aldo.- 26° de latitud austral (en escala)» \| Anotación: «18-48» \| Sello: PISSANO \| Manuscrit… |
| inscripciones_reverso | S09 | C01a20-S09-0013 | Leyenda manuscrita: «Dormitorio de Aldo.- Pedro López Lagar e Hilda Torres Varela.- Al fondo, un retrato de Aldo hecho por el pintor Jaci… |
| inscripciones_reverso | S09 | C01a20-S09-0015 | Leyenda manuscrita: «En el dormitorio “azul” de Aldo: / Pedro López Lagar / y Loreta Melovo.-» \| Sello: PISSANO |
| inscripciones_reverso | S19 | C01a20-S19-0059 | Mecanografiado: «Nº 1-Bigote ISCARO, próximo aspirante a “matasanos” / Nº 2-pepe díaz llave 22 medio asustao- / Nº 3-ALDO Llave 11 lucien… |
| inscripciones_reverso | S88 | C81a100-S88-0018 | Leyenda manuscrita: «1.= Los 7 grandes: Ingº Gallego Manolo Varela (actual Director General de Construcción); Ingº Esteban Piccolini (Dir… |
| inscripciones_reverso | S130 | C120a149-S130-0002 | Manuscrito, lista: «Efraín / C. Jarreguy / Pierre Baunere / A. M. Vedinger / Rizzotti - / Sra. de Rossi / Hilde / Aldo / Pía / Rossi»; ll… |
| inscripciones_reverso | S131 | C120a149-S131-0001 | El reverso digitalizado es un sobre comercial impreso: «FOTO Boschetti - Pablo Luis Boschetti y Cía. S.R.L. - C. Pellegrini 79 - Teléfono… |
| inscripciones_reverso | S132 | C120a149-S132-0002 | Manuscrito (birome azul): «Foto sacada el 17 de marzo de 1.974 (domingo) en Resistencia, Chaco.- Para Aldo e Hilda, un recuerdo de estos … |
| personas | S130 | C120a149-S130-0002 | Efraín; A. M. Vedinger; Rizzotti; Hilda; Aldo |
| personas | S132 | C120a149-S132-0002 | Susana; Raúl Nicotra; Aldo; Hilda |

**«Antonia»** → «Antonia Doglio»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| leyenda_reverso | S96 | C81a100-S96-0003 | Faustino Doglio y Mª Antonia. Tchékov |

**«Antonio»** → «Antonio De Raco» · «Antonio Vázquez» · «Antonio de Raco»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| leyenda_reverso | S04 | C01a20-S04-0006 | Visita de «Fray Mocho»: Nilda Britos, Estela Obario, Irene Panelo y Antonio, recibidos jubilosamente por los fogoneros. Entre ellos Sra. … |
| leyenda_reverso | S65 | C61a80-S65-0038 | Antonio (Toto Maderna) y Mimí. Entre el público, el Sr. Interventor Federal con su familia, Sras. de Taboada, de Torres, de Varela |
| inscripciones_reverso | S04 | C01a20-S04-0006 | Leyenda manuscrita: «VISITA DE “FRAY MOCHO” / Nilda Britos / Estela Obario / Irene Panelo / y Antonio, recibidos jubilosamente por los fo… |
| inscripciones_reverso | S65 | C61a80-S65-0038 | Manuscrito: «Nº 2 / Antonio (Toto Maderna) y Mimí. Entre el público, el Sr. Interventor Federal con su familia, Sras. de Taboada, de Torr… |

**«Carlos»** → «Carlos Erro» · «Carlos Ginés» · «Carlos Mariscotti» · «Carlos R. Guichón» · «Carlos Schenone» · «Dr. Carlos R. Guichón»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| inscripciones_reverso | S16 | C01a20-S16-0005 | Manuscrito en azul: «Dr. [Carlos?] Guichón hablando durante la despedida de Hilda» \| Anotación: «3» |

**«Don Medina»** → «Medina Ortiz»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| leyenda_reverso | S02 | C01a20-S02-0005 | Don Medina |
| inscripciones_reverso | S02 | C01a20-S02-0005 | Manuscrito: «DON MEDINA» (subrayado) \| Manuscrito en rojo: «Inv. 1996 Nº 24» \| Anotaciones en azul: «13» (en círculo), «5» \| Sello seco i… |

**«Don Moisés»** → «Don Moisés Chilese» · «Moisés Chilese»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| leyenda_reverso | S11 | C01a20-S11-0008 | Mientras Arturo Fraser ceba un mate que Don Moisés aprendió a gustar en nuestra tierra |

**«Efraín»** → «Efraín Boglietti»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| leyenda_reverso | S26 | C21a40-S26-0050 | Efraín y su padre en el viejo Fogón |
| leyenda_reverso | S130 | C120a149-S130-0002 | Casamiento Vedinger - Rizzotti: Efraín, C. Jarreguy (?), Pierre Baunere (?), Sra. de Rossi, Hilda, Aldo, Pía (?) Rossi |
| inscripciones_reverso | S26 | C21a40-S26-0050 | Manuscrito a lápiz: «Efraín y su padre en el viejo Fogón» \| Anotación: «Nº 26» \| Sello: MUNDO AGRARIO Foto Alvarez |
| inscripciones_reverso | S129 | C120a149-S129-0003 | Manuscrito (birome azul): «Alberto Gollan - Club de los 12 - Placa homenaje a Aldo Boglietti - 12/4/81 - jardín delantero Fogón - Efraín … |
| inscripciones_reverso | S130 | C120a149-S130-0002 | Manuscrito, lista: «Efraín / C. Jarreguy / Pierre Baunere / A. M. Vedinger / Rizzotti - / Sra. de Rossi / Hilde / Aldo / Pía / Rossi»; ll… |
| personas | S129 | C120a149-S129-0003 | Alberto Gollan; Efraín; Francisco Reyes; Di Luzio |
| personas | S130 | C120a149-S130-0002 | Efraín; A. M. Vedinger; Rizzotti; Hilda; Aldo |

**«Eva»** → «Eva Sas»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| leyenda_reverso | S01 | C01a20-S01-0042 | Rincón de la pieza de Aldo Boglietti (León). Hay 1 escultura (grotesco: «Eva») de Mena; 1 terracota Marchese («Los incomprendidos») y 1 e… |
| inscripciones_reverso | S01 | C01a20-S01-0042 | Leyenda manuscrita: «Rincón de la pieza de Aldo Boglietti (León) / Hay 1 escultura (grotesco: “Eva”) de Mena; 1 terracota Marchese (“Los … |

**«Héctor»** → «Héctor Castrillo»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| leyenda_reverso | S67 | C61a80-S67-0036 | Tarjeta postal: «A mis estimados primos Héctor y Marcelo un saludo», enero de 1920 |
| inscripciones_reverso | S67 | C61a80-S67-0036 | Impreso: TARJETA POSTAL REPÚBLICA ARGENTINA \| Sello: NIGRIS Hs. SARMIENTO 988 ROSARIO \| Manuscrito: «A mis estimados primos Héctor y Marc… |

**«Hilda»** → «Hilda Dianda» · «Hilda Torres Varela»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| leyenda_reverso | S16 | C01a20-S16-0005 | Dr. Guichón hablando durante la despedida de Hilda |
| leyenda_reverso | S47 | C41a60-S47-0010 | Mena lee el discurso de Hilda, que por la emoción le fue imposible hacerlo |
| leyenda_reverso | S87 | C81a100-S87-0026 | Público despedida Hilda, no interesa mayormente su publicación |
| leyenda_reverso | S126 | C120a149-S126-0017 | Père Lachaise, París. Tumba de Alberdi. Hilda con Acevez (?) |
| leyenda_reverso | S127 | C120a149-S127-0005 | Hilda en Sierra Nevada (Granada), diciembre 1967 |
| leyenda_reverso | S130 | C120a149-S130-0002 | Casamiento Vedinger - Rizzotti: Efraín, C. Jarreguy (?), Pierre Baunere (?), Sra. de Rossi, Hilda, Aldo, Pía (?) Rossi |
| leyenda_reverso | S132 | C120a149-S132-0002 | Recuerdo de Susana y Raúl Nicotra (?) para Aldo e Hilda, Resistencia, 17 de marzo de 1974 |
| inscripciones_reverso | S16 | C01a20-S16-0005 | Manuscrito en azul: «Dr. [Carlos?] Guichón hablando durante la despedida de Hilda» \| Anotación: «3» |
| inscripciones_reverso | S47 | C41a60-S47-0010 | Manuscrito en azul: «1 / Mena lee el discurso de Hilda, que por la emoción le fue imposible hacerlo» |
| inscripciones_reverso | S87 | C81a100-S87-0026 | Manuscrito en azul: «Público despedida Hilda / no interesa mayormente / su publicación» |
| inscripciones_reverso | S126 | C120a149-S126-0017 | Manuscrito: «Père Lachaise - Paris - Tumba de Alberdi -» / «Hilda con Acevez(?)» (lectura dudosa del apellido) |
| inscripciones_reverso | S127 | C120a149-S127-0005 | Manuscrito: «Hilda en Sierra Nevada (Granada) - Diciembre 1967»; anotación «290A» |
| inscripciones_reverso | S132 | C120a149-S132-0002 | Manuscrito (birome azul): «Foto sacada el 17 de marzo de 1.974 (domingo) en Resistencia, Chaco.- Para Aldo e Hilda, un recuerdo de estos … |
| personas | S126 | C120a149-S126-0017 | Hilda |
| personas | S127 | C120a149-S127-0005 | Hilda |
| personas | S130 | C120a149-S130-0002 | Efraín; A. M. Vedinger; Rizzotti; Hilda; Aldo |
| personas | S132 | C120a149-S132-0002 | Susana; Raúl Nicotra; Aldo; Hilda |

**«Jorge»** → «Jorge Luis Borges» · «Jorge Rigaud» · «Jorge Romero Brest»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| leyenda_reverso | S38 | C21a40-S38-0018 | «Cita en Senlis», 1er acto: Jorge (Faustino Doglio), Philémon (Toto Cáceres) y Sra. Montalembreuse |
| inscripciones_reverso | S38 | C21a40-S38-0018 | Manuscrito: «25-IX-54 / “Cita en Senlis”» \| Leyenda manuscrita: «1er acto = Jorge (Faustino Doglio), Philémon (Toto Cáceres) y Sra. Monta… |

**«María»** → «María Antonia Doglio» · «María Fux» · «María Moeskops» · «María Rosa González» · «María Teresa Varela de Torres» · «María Élida Castells»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| inscripciones_reverso | S78 | C61a80-S78-0002 | Impreso (programa de mano): «ferenc molnar / LILIOM (1909) / leyenda de suburbio» \| dirección HILDA TORRES VARELA; escenografía SAMUEL SA… |

**«Medina»** → «Medina Ortiz»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| personas | S02 | C01a20-S02-0005 | Medina |

**«Rossi»** → «Sra. de Rossi»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| leyenda_reverso | S130 | C120a149-S130-0002 | Casamiento Vedinger - Rizzotti: Efraín, C. Jarreguy (?), Pierre Baunere (?), Sra. de Rossi, Hilda, Aldo, Pía (?) Rossi |

**«Santiago»** → «Santiago Gómez Cou»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| leyenda_reverso | S53 | C41a60-S53-0015 | Durante la conferencia de Francisco Javier, una escena de Ionesco: Abuelo (Faustino Doglio), Abuela (Susana Glombovsky), Padre (José Bant… |
| leyenda_reverso | S53 | C41a60-S53-0016 | Otra escena de «Santiago o la sumisión» de Eugenio Ionesco: Roberta (Linda Banti) y Santiago (Nazario Maderna). Nº 5 |
| inscripciones_reverso | S53 | C41a60-S53-0015 | Leyenda manuscrita: «Durante la conferencia de Francisco Javier, una escena de Ionesco.- Abuelo (Faustino Doglio); Abuela (Susana Glombov… |
| inscripciones_reverso | S53 | C41a60-S53-0016 | Leyenda manuscrita: «Otra escena de “Santiago o la sumisión” de Eugenio Ionesco - Roberta (Linda Banti) y Santiago (Nazario Maderna). / N… |
| inscripciones_reverso | S78 | C61a80-S78-0002 | Impreso (programa de mano): «ferenc molnar / LILIOM (1909) / leyenda de suburbio» \| dirección HILDA TORRES VARELA; escenografía SAMUEL SA… |

**«Sr. W»** → «W. A. Tate»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| inscripciones_reverso | S19 | C01a20-S19-0060 | Mecanografiado: «AW.51,584 16.8.61. / BBC LATIN-AMERICAN SERVICE / En representación del grupo “El Fogón de los Arrieros”, de Resistencia… |

**«Sra. Ilsa»** → «Ilsa Barea» · «Sra. Ilsa de Barea»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| leyenda_reverso | S19 | C01a20-S19-0060 | BBC Latin-American Service: en representación del grupo «El Fogón de los Arrieros», el Dr. Luis Govi entrega a la Sra. Ilsa, viuda de Bar… |
| inscripciones_reverso | S19 | C01a20-S19-0060 | Mecanografiado: «AW.51,584 16.8.61. / BBC LATIN-AMERICAN SERVICE / En representación del grupo “El Fogón de los Arrieros”, de Resistencia… |

**«Susana»** → «Susana Glombovsky» · «Susana Slomkovsky»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| leyenda_reverso | S132 | C120a149-S132-0002 | Recuerdo de Susana y Raúl Nicotra (?) para Aldo e Hilda, Resistencia, 17 de marzo de 1974 |
| inscripciones_reverso | S132 | C120a149-S132-0002 | Manuscrito (birome azul): «Foto sacada el 17 de marzo de 1.974 (domingo) en Resistencia, Chaco.- Para Aldo e Hilda, un recuerdo de estos … |
| personas | S132 | C120a149-S132-0002 | Susana; Raúl Nicotra; Aldo; Hilda |

#### Apellido suelto (22)

**«Acosta»** → «Julio Acosta»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| leyenda_reverso | S21 | C21a40-S21-0004 | Junto a la estufa: Aldo Boglietti, poeta Julio Acosta, Dr. Faustino Doglio, Emilio Novas, el poeta Juan L. Ortiz |
| inscripciones_reverso | S21 | C21a40-S21-0004 | Leyenda manuscrita: «Junto a la estufa: / Aldo Boglietti.- / poeta Julio Acosta.- / Dr. Faustino Doglio.- / Emilio Novas / el poeta Juan … |

**«Antonia»** → «Ma. Antonia»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| leyenda_reverso | S96 | C81a100-S96-0003 | Faustino Doglio y Mª Antonia. Tchékov |

**«Barea»** → «Arturo Barea» · «Ilsa Barea» · «Secretariachurro de Barea» · «Sra. Ilsa de Barea»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| leyenda_reverso | S19 | C01a20-S19-0060 | BBC Latin-American Service: en representación del grupo «El Fogón de los Arrieros», el Dr. Luis Govi entrega a la Sra. Ilsa, viuda de Bar… |
| inscripciones_reverso | S19 | C01a20-S19-0060 | Mecanografiado: «AW.51,584 16.8.61. / BBC LATIN-AMERICAN SERVICE / En representación del grupo “El Fogón de los Arrieros”, de Resistencia… |

**«Baunere»** → «Pierre Baunere»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| inscripciones_reverso | S130 | C120a149-S130-0002 | Manuscrito, lista: «Efraín / C. Jarreguy / Pierre Baunere / A. M. Vedinger / Rizzotti - / Sra. de Rossi / Hilde / Aldo / Pía / Rossi»; ll… |

**«Coward»** → «Noel Coward»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| inscripciones_reverso | S78 | C61a80-S78-0002 | Impreso (programa de mano): «ferenc molnar / LILIOM (1909) / leyenda de suburbio» \| dirección HILDA TORRES VARELA; escenografía SAMUEL SA… |

**«Dr. Guichón»** → «Carlos R. Guichón» · «Dr. Carlos R. Guichón»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| leyenda_reverso | S16 | C01a20-S16-0005 | Dr. Guichón hablando durante la despedida de Hilda |

**«Dr. Torres»** → «Alberto Torres» · «Dr. Alberto Torres» · «Lino R. Torres» · «María Teresa Varela de Torres» · «Prof. Lino R. Torres» · «Teresa Varela de Torres»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| leyenda_reverso | S02 | C01a20-S02-0004 | Dr. Torres |
| inscripciones_reverso | S02 | C01a20-S02-0004 | Manuscrito en rojo: «“Dr. Torres”» \| Manuscrito en rojo: «Inv. Nº 27 / 1996» \| Anotación en azul: «5)» \| Sello seco ilegible \| Restos de … |
| personas | S02 | C01a20-S02-0004 | Dr. Torres |

**«Guichón»** → «Carlos R. Guichón» · «Dr. Carlos R. Guichón»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| inscripciones_reverso | S16 | C01a20-S16-0005 | Manuscrito en azul: «Dr. [Carlos?] Guichón hablando durante la despedida de Hilda» \| Anotación: «3» |

**«Hochwalder»** → «F. Hochwalder»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| inscripciones_reverso | S32 | C21a40-S32-0007 | Manuscrito: «Durante la conferencia de Hilda Torres Varela se representa una escena de la obra de HOCHWALDER.- ([P.] Provincial: Coco Cel… |

**«Ionesco»** → «Eugenio Ionesco»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| leyenda_reverso | S53 | C41a60-S53-0015 | Durante la conferencia de Francisco Javier, una escena de Ionesco: Abuelo (Faustino Doglio), Abuela (Susana Glombovsky), Padre (José Bant… |
| inscripciones_reverso | S53 | C41a60-S53-0015 | Leyenda manuscrita: «Durante la conferencia de Francisco Javier, una escena de Ionesco.- Abuelo (Faustino Doglio); Abuela (Susana Glombov… |
| inscripciones_reverso | S78 | C61a80-S78-0002 | Impreso (programa de mano): «ferenc molnar / LILIOM (1909) / leyenda de suburbio» \| dirección HILDA TORRES VARELA; escenografía SAMUEL SA… |

**«Iscaro»** → «Bigote Iscaro»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| personas | S19 | C01a20-S19-0059 | Arturo Barea; Aldo Boglietti; Iscaro; Pepe Díaz; Guerrieri; Montoya; Aquiles Bruno; José Lasa; Miguel Bruno; Fermín José María Martinicorena |

**«Marchese»** → «Víctor Marchese»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| leyenda_reverso | S01 | C01a20-S01-0042 | Rincón de la pieza de Aldo Boglietti (León). Hay 1 escultura (grotesco: «Eva») de Mena; 1 terracota Marchese («Los incomprendidos») y 1 e… |
| inscripciones_reverso | S01 | C01a20-S01-0042 | Leyenda manuscrita: «Rincón de la pieza de Aldo Boglietti (León) / Hay 1 escultura (grotesco: “Eva”) de Mena; 1 terracota Marchese (“Los … |

**«María»** → «Ana María»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| inscripciones_reverso | S78 | C61a80-S78-0002 | Impreso (programa de mano): «ferenc molnar / LILIOM (1909) / leyenda de suburbio» \| dirección HILDA TORRES VARELA; escenografía SAMUEL SA… |

**«Mena»** → «J. D. Mena» · «Juan de Dios Mena»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| indice_titulo | S30 | entrada 30 | Homenaje a Mena – Abril de 1956 |
| indice_titulo | S90 | entrada 90 | Homenaje a Mena – Abril de 1961 |
| indice_titulo | S119 | entrada 119 | Muestra de las obras de Mena |
| leyenda_reverso | S01 | C01a20-S01-0042 | Rincón de la pieza de Aldo Boglietti (León). Hay 1 escultura (grotesco: «Eva») de Mena; 1 terracota Marchese («Los incomprendidos») y 1 e… |
| leyenda_reverso | S30 | C21a40-S30-0016 | Adolfo Petraglia (discurso homenaje a Mena) |
| leyenda_reverso | S47 | C41a60-S47-0010 | Mena lee el discurso de Hilda, que por la emoción le fue imposible hacerlo |
| leyenda_reverso | S141 | C120a149-S141-0002 | Homenaje a Mena, placa en el viejo Fogón, 4 de abril de 1963 |
| inscripciones_reverso | S01 | C01a20-S01-0042 | Leyenda manuscrita: «Rincón de la pieza de Aldo Boglietti (León) / Hay 1 escultura (grotesco: “Eva”) de Mena; 1 terracota Marchese (“Los … |
| inscripciones_reverso | S30 | C21a40-S30-0016 | Manuscrito a lápiz: «ADOLFO PETRAGLIA (Discurso Hom. Mena)» \| Anotación: «72-18» \| Sello: Pissano |
| inscripciones_reverso | S47 | C41a60-S47-0010 | Manuscrito en azul: «1 / Mena lee el discurso de Hilda, que por la emoción le fue imposible hacerlo» |
| inscripciones_reverso | S141 | C120a149-S141-0002 | Manuscrito (tinta verde): «4/Abril 1963 Homenaje a Mena placa en el viejo Fogón»; lápiz: «141»; anotación invertida «3 cs Nº 1» (lectura … |

**«Orentanz»** → «José Ma. Orentanz» · «José María Orentanz»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| leyenda_reverso | S96 | C81a100-S96-0004 | José Mª Orentanz (?). Tchékov |

**«Saa»** → «Horacio Rivero Sosa y Saa»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| leyenda_reverso | S31 | C21a40-S31-0011 | Arquitecto Romaño, Horacio Rivero Sosa y Saa, Dr. Bronermon, Dr. Alberto Torres, Dr. José Babini, Dr. Dillon |
| inscripciones_reverso | S31 | C21a40-S31-0011 | Manuscrito: «Arquitecto Romaño / Horacio Rivero Sosa y Saa / Dr. Bronermon - / Dr. Alberto Torres / Dr. José Babini / Dr. Dillon» \| Sello… |

**«Tate»** → «W. A. Tate»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| inscripciones_reverso | S19 | C01a20-S19-0060 | Mecanografiado: «AW.51,584 16.8.61. / BBC LATIN-AMERICAN SERVICE / En representación del grupo “El Fogón de los Arrieros”, de Resistencia… |

**«Torres»** → «Alberto Torres» · «Dr. Alberto Torres» · «Lino R. Torres» · «María Teresa Varela de Torres» · «Prof. Lino R. Torres» · «Teresa Varela de Torres»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| leyenda_reverso | S65 | C61a80-S65-0038 | Antonio (Toto Maderna) y Mimí. Entre el público, el Sr. Interventor Federal con su familia, Sras. de Taboada, de Torres, de Varela |
| inscripciones_reverso | S65 | C61a80-S65-0038 | Manuscrito: «Nº 2 / Antonio (Toto Maderna) y Mimí. Entre el público, el Sr. Interventor Federal con su familia, Sras. de Taboada, de Torr… |

**«Urruchúa»** → «Demetrio Urruchúa»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| leyenda_reverso | S51 | C41a60-S51-0023 | Habla Alberto Torres y Urruchúa aguza el oído |
| inscripciones_reverso | S51 | C41a60-S51-0023 | Leyenda manuscrita, tachada en rojo: «= Habla Alberto Torres y Urruchúa aguza el oído. =» \| Anotación: «17-41» \| Sello: PISSANO \| Anotaci… |

**«Vanzo»** → «Julio Vanzo»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| leyenda_reverso | S15 | C01a20-S15-0014 | El concertista de piano Antonio De Raco con Aldo Boglietti, frente a un cuadro del pintor rosarino Julio Vanzo |
| leyenda_reverso | S88 | C81a100-S88-0018 | Los 7 grandes: Ingº Gallego Manolo Varela (actual Director General de Construcción); Ingº Esteban Piccolini (director de Resistencia); Ed… |
| inscripciones_reverso | S15 | C01a20-S15-0014 | Leyenda manuscrita: «El concertista de piano Antonio De Raco con Aldo Boglietti, frente a un cuadro del pintor rosarino Julio Vanzo.-» \| … |
| inscripciones_reverso | S88 | C81a100-S88-0018 | Leyenda manuscrita: «1.= Los 7 grandes: Ingº Gallego Manolo Varela (actual Director General de Construcción); Ingº Esteban Piccolini (Dir… |

**«Varela»** → «Gallego Manolo Varela» · «Hilda Torres Varela» · «Manolo Varela» · «Manuel Varela»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| leyenda_reverso | S65 | C61a80-S65-0038 | Antonio (Toto Maderna) y Mimí. Entre el público, el Sr. Interventor Federal con su familia, Sras. de Taboada, de Torres, de Varela |
| inscripciones_reverso | S65 | C61a80-S65-0038 | Manuscrito: «Nº 2 / Antonio (Toto Maderna) y Mimí. Entre el público, el Sr. Interventor Federal con su familia, Sras. de Taboada, de Torr… |

**«Vedinger»** → «A. M. Vedinger» · «M. Vedinger»

| Forma suelta: campo | Sobre | Registro | Texto de origen |
| --- | --- | --- | --- |
| leyenda_reverso | S130 | C120a149-S130-0002 | Casamiento Vedinger - Rizzotti: Efraín, C. Jarreguy (?), Pierre Baunere (?), Sra. de Rossi, Hilda, Aldo, Pía (?) Rossi |

## d. Entradas del índice con lectura dudosa que contienen nombres

18 entradas marcadas `lectura_dudosa = si`; 17 contienen nombres.

| Entrada | Sobres | Texto | Nota | Nombres detectados | Fotos vinculadas |
| ---: | --- | --- | --- | --- | ---: |
| 5 | S05 | Estela Quatrocchio | apellido de lectura dudosa | Estela Quatrocchio (persona) | 1 |
| 10 | S10 | Hermanos Carrillo | apellido de lectura dudosa | Hermanos Carrillo (persona) | 7 |
| 11 | S11 | Moisés Chilese | apellido de lectura dudosa | Moisés Chilese (persona) | 10 |
| 24 | S24 | Teatro: "El café de Pomona" | título de lectura dudosa | El café de Pomona (obra) | 28 |
| 37 | S37 | Medina Ortiz | lectura dudosa | Medina Ortiz (persona) | 7 |
| 40 | S40 | Emilio Novas | apellido de lectura dudosa | Emilio Novas (persona) | 5 |
| 41 | S41 | Arturo Frondizi | papel dañado en el nombre | Arturo Frondizi (persona) | 10 |
| 42 | S42 | Visita del Presidente del Rotary Club Internacional | papel dañado | Rotary Club Internacional (institucion) | 12 |
| 45 | S45 | Revolución septiembre de 1955 – Aerolíneas | última palabra de lectura dudosa | Aerolíneas (institucion) | 50 |
| 48 | S48 | Euclides Ventura Cardoso y comitiva Caja Ahorro | final de línea de lectura dudosa | Euclides Ventura Cardoso (persona); Caja Ahorro (institucion) | 22 |
| 54 | S54 | Robert Mac Errin | lectura dudosa | Robert Mac Errin (persona) | 7 |
| 72 | S72 | Fernando Arranz – Martín Rampín – R. Bonome | segundo nombre de lectura dudosa | Fernando Arranz (persona); Martín Rampín (persona); R. Bonome (persona) | 6 |
| 82 | S82 | Brigadier Moragues – Concentración Aerolíneas | lectura dudosa | Brigadier Moragues (persona); Aerolíneas (institucion) | 14 |
| 95 | S95 | Nelly Vaccarezza de Vaccarezza | lectura dudosa | Nelly Vaccarezza de Vaccarezza (persona) | 5 |
| 100 | S100 | Despedida de soltero: Tila Morgs – Jaulín | nombres de lectura dudosa | Tila Morgs (persona); Jaulín (persona) | 23 |
| 102 | S102 | Despedida matrimonio Bustos y S. de Bustamante | lectura dudosa | Bustos (persona); S. de Bustamante (persona) | 12 |
| 108 | S108 | Despedida Gallego Hermida – 30-6-61 | año de lectura dudosa (51 o 61) | Gallego Hermida (persona) | 6 |

Marcadas pero sin nombres detectados: 112 «Festejo Día del Niño».


## e. Fechas y años en los textos que no están en `fecha`

Se toma un año como «no registrado» si no figura en el campo `fecha` de la misma foto. Los años que aparecen junto a «Inv.» se marcan como probables números de inventario (1996) y no como fecha de la toma.

### En el índice manuscrito

| Entrada | Sobres | Texto | Mención | Fotos | Fotos con ese año en `fecha` | Fechas del sobre |
| ---: | --- | --- | --- | ---: | ---: | --- |
| 30 | S30 | Homenaje a Mena – Abril de 1956 | Abril de 1956 | 16 | 0 |  |
| 45 | S45 | Revolución septiembre de 1955 – Aerolíneas | septiembre de 1955 | 50 | 0 |  |
| 63 | S63 | Paulina Ossona y conjunto coreográfico – 1959 | 1959 | 20 | 0 |  |
| 90 | S90 | Homenaje a Mena – Abril de 1961 | Abril de 1961 | 3 | 0 |  |
| 97 | S97 | Premier del "Fogón" – 3 de junio de 1961 | 3 de junio de 1961 | 31 | 0 |  |
| 103 | S103 | Cónsul General de Italia – 1961 | 1961 | 17 | 0 |  |
| 108 | S108 | Despedida Gallego Hermida – 30-6-61 | 30-6-61 | 6 | 0 |  |
| 111 | S111 | Paulina Ossona y su conjunto – 1962 | 1962 | 12 | 0 |  |
| 116 | S116 | María Fux – 1962 | 1962 | 1 | 0 |  |

### En reversos y observaciones (18 menciones, más 7 junto a «Inv.»)

| Registro | Sobre | Campo | Mención | `fecha` actual | Contexto |
| --- | --- | --- | --- | --- | --- |
| C01a20-S01-0040 | S01 | inscripciones_reverso | 19 ABR. 1953 | — | …bajo» / Sello: «LA PRENSA» PUBLICADA EL 19 ABR. 1953 EN LA SECCIÓN ROTOGRABADO / S… |
| C01a20-S01-0040 | S01 | observaciones | 19 abr. 1953 | — | …cada en La Prensa, sección Rotograbado, 19 abr. 1953 (según sello)… |
| C01a20-S02-0003 | S02 | leyenda_reverso | 1951 | — | …El Cuervo. Juan de Dios Mena, 1951/1952… |
| C01a20-S02-0003 | S02 | leyenda_reverso | 1952 | — | …El Cuervo. Juan de Dios Mena, 1951/1952… |
| C01a20-S02-0003 | S02 | inscripciones_reverso | 1951 | — | … azul: «El Cuervo / Juan de Dios Mena / 1951/1952» / Manuscrito en rojo: «… |
| C01a20-S02-0003 | S02 | inscripciones_reverso | 1952 | — | …: «El Cuervo / Juan de Dios Mena / 1951/1952» / Manuscrito en rojo: «1996 … |
| C01a20-S02-0003 | S02 | observaciones | 1951 | — | …1951/1952 parece ser la fecha de l… |
| C01a20-S02-0003 | S02 | observaciones | 1952 | — | …1951/1952 parece ser la fecha de la obr… |
| C21a40-S21-0004 | S21 | inscripciones_reverso | 19 ABR. 1952 | — | …iz.-» / Sello: «LA PRENSA» PUBLICADA EL 19 ABR. 1952 EN LA SECCIÓN ROTOGRABADO / S… |
| C21a40-S21-0004 | S21 | observaciones | 19 abr. 1952 | — | …cada en La Prensa, sección Rotograbado, 19 abr. 1952 (según sello)… |
| C61a80-S78-0002 | S78 | leyenda_reverso | 1909 | — | …Programa de «Liliom» (1909), leyenda de suburbio, de Fer… |
| C61a80-S78-0002 | S78 | inscripciones_reverso | 1909 | — | …rama de mano): «ferenc molnar / LILIOM (1909) / leyenda de suburbio» / dir… |
| C120a149-S143-0002 | S143 | leyenda_reverso | 26/3/1941 | — | … 30 años del acuatizaje del hidroavión (26/3/1941)… |
| C120a149-S143-0002 | S143 | inscripciones_reverso | 26/3/41 | — | …ron 30 años de la aviación - Acuatizaje 26/3/41 del hidroavión»; sello «Si de… |
| C120a149-S143-0002 | S143 | observaciones | 1941 | — | …El hecho conmemorado es de 1941; la toma sería de 1971 (ver S… |
| C120a149-S143-0002 | S143 | observaciones | 1971 | — | …onmemorado es de 1941; la toma sería de 1971 (ver S143-0003)… |
| C120a149-S143-0003 | S143 | leyenda_reverso | 26 de marzo de 1941 | 1971 | …Cuando se cumplieron 30 años desde el 26 de marzo de 1941, 1971… |
| C120a149-S143-0003 | S143 | inscripciones_reverso | 26 de marzo 1941 | 1971 | … «Cuando se cumplieron 30 años desde el 26 de marzo 1941 - 1971»; sello «Si desea repe… |

<details><summary>Menciones junto a «Inv.»</summary>

| Registro | Sobre | Campo | Mención | Contexto |
| --- | --- | --- | --- | --- |
| C01a20-S02-0003 | S02 | inscripciones_reverso | 1996 | …ena / 1951/1952» / Manuscrito en rojo: «1996 - Inv. Nº 29» (parcialmente l… |
| C01a20-S02-0004 | S02 | inscripciones_reverso | 1996 | …s”» / Manuscrito en rojo: «Inv. Nº 27 / 1996» / Anotación en azul: «5)» / … |
| C01a20-S02-0005 | S02 | inscripciones_reverso | 1996 | …(subrayado) / Manuscrito en rojo: «Inv. 1996 Nº 24» / Anotaciones en azul:… |
| C01a20-S02-0006 | S02 | inscripciones_reverso | 1996 | …ANO / Manuscrito en rojo: «Inv. Nº 25 / 1996» / Anotaciones: «21-28», «96»… |
| C01a20-S02-0007 | S02 | inscripciones_reverso | 1996 | …Manuscrito en rojo: «1996 - Inv. Nº 28» / Marca de agua… |
| C01a20-S02-0008 | S02 | inscripciones_reverso | 1996 | … C. Bermont» (?) / Manuscrito en rojo: «1996 - Nº 23» / Anotación en azul:… |
| C01a20-S02-0009 | S02 | inscripciones_reverso | 1996 | …CO» / Manuscrito en rojo: «Inv. Nº 26 - 1996» / Sello: REVISTA ESSO (inver… |

</details>

## Decisiones pendientes

Cada grupo es una pregunta abierta: no se unificó nada.

### Personas

- [ ] **P1.** «A. M. Vedinger» · «M. Vedinger». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P2.** «Alberto Torres» · «Dr. Alberto Torres». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P3.** «Aldo Boglietti» · «Alfredo Boglietti» · «Don Alfredo Boglietti» · «Sr. Aldo Boglietti». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P4.** «Alejandro Boletta» · «Alejandro Boletta (?)». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P5.** «Ana Maria Kedinger» · «Ana María Kedinger». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P6.** «Angel de Seta» · «Ángel de Seta». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P7.** «Antonia Doglio» · «Ma. Antonia Doglio» · «María Antonia Doglio». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P8.** «Antonio De Raco» · «Antonio de Raco». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P9.** «Arcidiácono» · «Pintor Arcidiácono». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P10.** «Arquitecto Romaño» · «Romaño». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P11.** «Brigadier Moragues» · «Moragues». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P12.** «Bronermon» · «Dr. Bronermon». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P13.** «Carlos R. Guichón» · «Dr. Carlos R. Guichón». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P14.** «Carman» · «Dr. Carman». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P15.** «Córdoba Iturburu» · «Córdova Iturburu». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P16.** «Di Luzio» · «Sr. Di Luzio». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P17.** «Dillon» · «Dr. Dillon». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P18.** «Dña. Josefa Palacio» · «Josefa Palacio». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P19.** «Don Enrique Kédinger» · «Enrique Kédinger» · «Henri Kédinger». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P20.** «Don Medina» · «Medina». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P21.** «Don Moisés Chilese» · «Moisés Chilese». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P22.** «Dr. Faustino Doglio» · «Faustino Doglio». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P23.** «Dr. Guichón» · «Guichón». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P24.** «Dr. José Babini» · «José Babini» · «José Banti». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P25.** «Dr. José R. Bergallo» · «José R. Bergallo». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P26.** «Dr. Luis Govi» · «Luis Govi». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P27.** «Dr. Michel Lataza» · «Michel Lataza». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P28.** «Dr. Torres» · «Torres». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P29.** «Faluggi’s Brothers» · «Faluggi’’s Brothers». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P30.** «Horacio Rivero Sosa» · «Horacio Rivero Sosa y Saa». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P31.** «Ilsa Barea» · «Sra. Ilsa de Barea». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P32.** «Joaquín del Villar» · «Julián del Villar». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P33.** «José Ma. Orentanz» · «José María Orentanz». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P34.** «Kay» · «Mr. Kay». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P35.** «Lino R. Torres» · «Prof. Lino R. Torres». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P36.** «Luis Angel Firpo» · «Luis Ángel Firpo». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P37.** «Ma. Élida Castells» · «María Élida Castells» · «Élida Castells». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P38.** «María Teresa Varela de Torres» · «Teresa Varela de Torres». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P39.** «Miguel Bruno» · «Miguelito Bruno». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P40.** «Samuel Sanchez de Bustamante» · «Samuel Sánchez de Bustamante». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P41.** «Susana Glombovsky» · «Susana Slomkovsky». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P42.** «U. Betti» · «Ugo Betti». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **P43.** «Yvonne Kédinger» · «Yvonne de Kedinger». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?

### Instituciones

- [ ] **I1.** «Aerolíneas Argentinas» · «Aerolíneas Argentinas 17». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **I2.** «BBC LATIN» · «BBC Latin». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **I3.** «Directorio de La Forestal Argentina» · «Directorio de la Forestal Argentina». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **I4.** «Hostal del Conde de Gondomar» · «Hostal del Conde de Gondomar. Chon». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?

### Obras

- [ ] **O1.** «La libra de carne» · «Una libra de carne». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?

### Eventos

- [ ] **E1.** «Juramento de la llave del Brigadier Moragues de Aerolíneas Argentinas 17-5-61» · «Juramento de la llave del Brigadier Moragues de Aerolíneas Argentinas, 17-5-61». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?
- [ ] **E2.** «Visita ARTURO BAREA y ALDO BOGLIETTI A LA CIUDAD DE CORDOBA» · «Visita de Arturo Barea y Aldo Boglietti a la ciudad de Córdoba». ¿Son la misma entidad? ¿Se unifican? Si se unifican, ¿cuál es la forma normalizada?

### Personas: nombre suelto

- [ ] «Aldo» (nombre de pila) → «Aldo Boglietti» · «Sr. Aldo Boglietti». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
- [ ] «Antonia» (nombre de pila) → «Antonia Doglio». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
- [ ] «Antonio» (nombre de pila) → «Antonio De Raco» · «Antonio Vázquez» · «Antonio de Raco». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
- [ ] «Carlos» (nombre de pila) → «Carlos Erro» · «Carlos Ginés» · «Carlos Mariscotti» · «Carlos R. Guichón» · «Carlos Schenone» · «Dr. Carlos R. Guichón». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
- [ ] «Don Medina» (nombre de pila) → «Medina Ortiz». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
- [ ] «Don Moisés» (nombre de pila) → «Don Moisés Chilese» · «Moisés Chilese». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
- [ ] «Efraín» (nombre de pila) → «Efraín Boglietti». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
- [ ] «Eva» (nombre de pila) → «Eva Sas». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
- [ ] «Héctor» (nombre de pila) → «Héctor Castrillo». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
- [ ] «Hilda» (nombre de pila) → «Hilda Dianda» · «Hilda Torres Varela». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
- [ ] «Jorge» (nombre de pila) → «Jorge Luis Borges» · «Jorge Rigaud» · «Jorge Romero Brest». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
- [ ] «María» (nombre de pila) → «María Antonia Doglio» · «María Fux» · «María Moeskops» · «María Rosa González» · «María Teresa Varela de Torres» · «María Élida Castells». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
- [ ] «Medina» (nombre de pila) → «Medina Ortiz». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
- [ ] «Rossi» (nombre de pila) → «Sra. de Rossi». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
- [ ] «Santiago» (nombre de pila) → «Santiago Gómez Cou». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
- [ ] «Sr. W» (nombre de pila) → «W. A. Tate». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
- [ ] «Sra. Ilsa» (nombre de pila) → «Ilsa Barea» · «Sra. Ilsa de Barea». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
- [ ] «Susana» (nombre de pila) → «Susana Glombovsky» · «Susana Slomkovsky». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
- [ ] «Acosta» (apellido) → «Julio Acosta». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
- [ ] «Antonia» (apellido) → «Ma. Antonia». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
- [ ] «Barea» (apellido) → «Arturo Barea» · «Ilsa Barea» · «Secretariachurro de Barea» · «Sra. Ilsa de Barea». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
- [ ] «Baunere» (apellido) → «Pierre Baunere». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
- [ ] «Coward» (apellido) → «Noel Coward». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
- [ ] «Dr. Guichón» (apellido) → «Carlos R. Guichón» · «Dr. Carlos R. Guichón». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
- [ ] «Dr. Torres» (apellido) → «Alberto Torres» · «Dr. Alberto Torres» · «Lino R. Torres» · «María Teresa Varela de Torres» · «Prof. Lino R. Torres» · «Teresa Varela de Torres». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
- [ ] «Guichón» (apellido) → «Carlos R. Guichón» · «Dr. Carlos R. Guichón». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
- [ ] «Hochwalder» (apellido) → «F. Hochwalder». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
- [ ] «Ionesco» (apellido) → «Eugenio Ionesco». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
- [ ] «Iscaro» (apellido) → «Bigote Iscaro». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
- [ ] «Marchese» (apellido) → «Víctor Marchese». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
- [ ] «María» (apellido) → «Ana María». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
- [ ] «Mena» (apellido) → «J. D. Mena» · «Juan de Dios Mena». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
- [ ] «Orentanz» (apellido) → «José Ma. Orentanz» · «José María Orentanz». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
- [ ] «Saa» (apellido) → «Horacio Rivero Sosa y Saa». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
- [ ] «Tate» (apellido) → «W. A. Tate». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
- [ ] «Torres» (apellido) → «Alberto Torres» · «Dr. Alberto Torres» · «Lino R. Torres» · «María Teresa Varela de Torres» · «Prof. Lino R. Torres» · «Teresa Varela de Torres». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
- [ ] «Urruchúa» (apellido) → «Demetrio Urruchúa». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
- [ ] «Vanzo» (apellido) → «Julio Vanzo». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
- [ ] «Varela» (apellido) → «Gallego Manolo Varela» · «Hilda Torres Varela» · «Manolo Varela» · «Manuel Varela». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
- [ ] «Vedinger» (apellido) → «A. M. Vedinger» · «M. Vedinger». ¿A cuál remite en cada caso? ¿Se unifica? ¿Forma normalizada?
