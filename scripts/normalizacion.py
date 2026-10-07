#!/usr/bin/env python3
"""Normalización piloto de entidades (personas, instituciones, lugares, fotógrafos,
eventos y obras).

Genera data/fuentes/normalizacion_piloto.csv a partir de estas fuentes, en orden de
precedencia (de mayor a menor autoridad):
  1. equipo     data/fuentes/autoridades/{libro_llaves, personas_verificadas, indices_cajas}.csv
                y los casos fijos de este archivo (CASOS_FIJOS)
  2. recortes   data/fuentes/recortes_periodisticos.csv (personas e instituciones mencionadas)
  3. decision   data/fuentes/decisiones_entidades.csv (decision_propuesta)
  4. notebook   data/fuentes/referencia_autoridades.csv (no verificado)
  5. regla      regla A: sin tratamientos (Dr., Don, Sr., Sra., Dña., Prof., Mr., Ing.,
                Arq.…), tildes, mayúsculas y abreviaturas (Ma. → María)

No modifica la planilla ni los CSV de inventario e índice: construir_datos.py aplica
la tabla al armar los JSON. También exporta las funciones que usa construir_datos.py
(plegado de texto, regla A, fechas de recortes).

Uso: python3 scripts/normalizacion.py
"""
import csv
import difflib
import re
import unicodedata
from collections import Counter, defaultdict
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
FUENTES = RAIZ / "data/fuentes"
TABLA = FUENTES / "normalizacion_piloto.csv"
RECORTES = FUENTES / "recortes_periodisticos.csv"
INVENTARIO = FUENTES / "inventario_base.csv"
INDICE = FUENTES / "indice_manuscrito.csv"
COLUMNAS = ["variante", "tipo", "forma_normalizada", "n_llave", "origen", "confianza"]
RANGO_ORIGEN = {"equipo": 0, "recortes": 1, "decision": 2, "notebook": 3, "regla": 4}
RANGO_CONFIANZA = {"alta": 0, "media": 1, "baja": 2}

# ---------------------------------------------------------------- texto

PARTICULAS = {"de", "del", "la", "las", "los", "y", "e", "da", "van", "von"}
_ESPECIALES = str.maketrans({"ł": "l", "Ł": "L", "ø": "o", "Ø": "O", "ß": "ss", "’": "'"})


def plegar(texto):
    """Clave de comparación: sin tildes, minúsculas, Ma./Mª → maria, sin puntuación."""
    t = (texto or "").translate(_ESPECIALES)
    t = re.sub(r"\bM[aª]\.?(?=\s)|\bMª", "María ", t)
    t = unicodedata.normalize("NFD", t)
    t = "".join(c for c in t if not unicodedata.combining(c)).lower()
    t = re.sub(r"[^a-z0-9]+", " ", t)
    return re.sub(r"\s+", " ", t).strip()


TRATAMIENTOS = re.compile(
    r"^(?:(?:dra?|sra?|srta|sres|dña|prof|mr|mrs|ing|arq|gral|cnel|tte)\.?º?\s+"
    r"|(?:ingº|arqº|ing°|doña|don|profesora?|maestro|arquitecto|pintora?|poeta|brigadier"
    r"|contraalmirante|coronel(?:\s*\(r\))?|gallego|señora?|el\s+señor)\s+)+",
    re.I,
)


def titulo_nombre(nombre):
    """MAYÚSCULAS SOSTENIDAS → Mayúscula inicial, con partículas en minúscula."""
    partes = []
    for i, p in enumerate(nombre.split(" ")):
        letras = [c for c in p if c.isalpha()]
        if len(letras) > 1 and all(c.isupper() for c in letras):
            p = p.lower()
            p = p if (i and p in PARTICULAS) else p[:1].upper() + p[1:]
        partes.append(p)
    return " ".join(partes)


def regla_a(nombre):
    """Regla A: quita tratamientos, normaliza abreviaturas, espacios y mayúsculas."""
    n = (nombre or "").strip()
    n = re.sub(r"[«»“”\"]", "", n)
    n = re.sub(r"\(\?\)", "", n)
    n = re.sub(r"\(h\.?\)", "(h)", n)
    n = re.sub(r"\bM[aª]\.\s*|\bMª\s*", "María ", n)
    n = re.sub(r"\s+", " ", n).strip(" .-;,:")
    n = TRATAMIENTOS.sub("", n).strip()
    return titulo_nombre(n)


def invertir(nombre):
    """«Apellido, Nombres» → «Nombres Apellido»; «(h)» queda al final."""
    if "," not in nombre:
        return nombre.strip()
    apellido, nombres = (p.strip() for p in nombre.split(",", 1))
    hijo = ""
    if re.search(r"\(h\.?\)", nombres):
        nombres, hijo = re.sub(r"\s*\(h\.?\)", "", nombres), " (h)"
    return f"{nombres} {apellido}{hijo}".strip()


def tildes(forma):
    return sum(1 for c in forma if ord(c) > 127)


# ---------------------------------------------------------------- fechas de recortes

MESES = {
    "enero": 1, "febrero": 2, "marzo": 3, "abril": 4, "mayo": 5, "junio": 6, "julio": 7,
    "agosto": 8, "septiembre": 9, "setiembre": 9, "octubre": 10, "noviembre": 11, "diciembre": 12,
    # Italiano (p. ej. «novembre-dicembre 1978», FUTURISMO-OGGI)
    "gennaio": 1, "febbraio": 2, "aprile": 4, "maggio": 5, "giugno": 6, "luglio": 7,
    "settembre": 9, "ottobre": 10, "novembre": 11, "dicembre": 12,
}
_MES = "(" + "|".join(sorted(MESES, key=len, reverse=True)) + ")"


def anios_caja(fuente):
    """«R058 - Recortes periodisticos 1981.md» → (1981, 1981); «… 1984_86» → (1984, 1986)."""
    m = re.search(r"(\d{4})(?:_(\d{2,4}))?\.md$", fuente or "")
    if not m:
        return None
    desde = int(m[1])
    if not m[2]:
        return desde, desde
    hasta = int(m[2]) if len(m[2]) == 4 else desde // 100 * 100 + int(m[2])
    return desde, hasta


def fecha_recorte(fecha, fuente=""):
    """Fecha de un recorte → EDTF. Sin año: el de la caja solo si cubre un único año."""
    f = plegar(fecha).replace("º", "")
    if not f or f.startswith(("sin fecha", "s f")):
        return ""
    rango = anios_caja(fuente)
    anio_caja = rango[0] if rango and rango[0] == rango[1] else None

    def edtf(a, m=None, d=None):
        if a is None:
            if anio_caja is None:
                return ""
            a = anio_caja
        return f"{a:04d}" + (f"-{m:02d}" if m else "") + (f"-{d:02d}" if m and d else "")

    def anio(t):
        return int(t) if len(t) == 4 else 1900 + int(t)

    # dd-mm-aa (formato de las cajas R060)
    m = re.fullmatch(r"(\d{1,2}) (\d{1,2}) (\d{2})", f)
    if m:
        return edtf(anio(m[3]), int(m[2]), int(m[1]))
    # mes-mes año («novembre-dicembre 1978», «Septiembre-Octubre de 1954»)
    m = re.fullmatch(rf"{_MES} {_MES} (?:de )?(\d{{4}})", f)
    if m:
        a = int(m[3])
        return f"{edtf(a, MESES[m[1]])}/{edtf(a, MESES[m[2]])}"
    # año dd-dd de mes («1965 25-26 de marzo»)
    m = re.fullmatch(rf"(\d{{4}}) (\d{{1,2}}) (\d{{1,2}}) de {_MES}", f)
    if m:
        a, mes = int(m[1]), MESES[m[4]]
        return f"{edtf(a, mes, int(m[2]))}/{edtf(a, mes, int(m[3]))}"
    # dd de mes [de año] / año dd de mes
    m = re.fullmatch(rf"(?:(\d{{4}}) )?(\d{{1,2}}) de {_MES}(?: de (\d{{4}}))?", f)
    if m:
        a = m[1] or m[4]
        return edtf(int(a) if a else None, MESES[m[3]], int(m[2]))
    # mes dd[, año]
    m = re.fullmatch(rf"{_MES} (\d{{1,2}})(?: (\d{{4}}))?", f)
    if m:
        return edtf(int(m[3]) if m[3] else None, MESES[m[1]], int(m[2]))
    # [año] mes [de año]
    m = re.fullmatch(rf"(?:(\d{{4}}) )?{_MES}(?: (?:de )?(\d{{4}}))?", f)
    if m:
        a = m[1] or m[3]
        return edtf(int(a) if a else None, MESES[m[2]])
    # año suelto («1978», «Año 1952»)
    m = re.fullmatch(r"(?:ano )?(\d{4})", f)
    if m:
        return m[1]
    # «S/f (Marzo)»
    m = re.fullmatch(rf"s f {_MES}", f)
    if m:
        return edtf(None, MESES[m[1]])
    return ""


# ---------------------------------------------------------------- clasificación de recortes

PALABRAS_INSTITUCION = re.compile(
    r"\b(asociaci[oó]n|club|fog[oó]n|subsecretar[ií]a|secretar[ií]a|ministerio|municipalidad|museo|"
    r"universidad|unne|teatro|casa|diario|banco|escuela|instituto|fundaci[oó]n|comisi[oó]n|direcci[oó]n|"
    r"consejo|gobierno|sociedad|centro|academia|chacotur|aerol[ií]neas|rotary|lions|ateneo|alianza|"
    r"c[ií]rculo|coro|orquesta|conjunto|elenco|grupo|federaci[oó]n|c[aá]mara|colegio|biblioteca|"
    r"editorial|revista|radio|televisi[oó]n|lv\d+|s\.?a\.?|s\.?r\.?l\.?|hotel|iglesia|embajada|"
    r"consulado|provincia|naci[oó]n|cooperativa|sindicato|partido|ej[eé]rcito|polic[ií]a|hospital|"
    r"galer[ií]a|sal[oó]n|festival|premio|orden|empresa|compañ[ií]a|cía|uni[oó]n|movimiento|taller|"
    r"departamento|facultad|liga|congreso|cine|forestal|bbc|unesco|oea|onu)\b",
    re.I,
)


def clasificar(nombre):
    """Persona, institución o None (nombre suelto o no clasificable)."""
    n = nombre.strip(" .")
    if not n:
        return None
    if PALABRAS_INSTITUCION.search(n) or re.search(r"\d", n):
        return "institucion"
    if "." in n and re.fullmatch(r"(?:[A-ZÁÉÍÓÚ]\.){2,}", n.replace(" ", "")):
        return "institucion"  # sigla con puntos (U.N.N.E.); «ALDO» o «UNNE» sueltos no se clasifican
    tokens = regla_a(n).split()
    if len(tokens) < 2 or len(tokens) > 6:
        return None
    if all(t[:1].isupper() or t.lower() in PARTICULAS or re.fullmatch(r"\(h\)", t) for t in tokens):
        return "persona"
    return None


def separar_menciones(texto):
    """«A, B y C.» → ["A", "B", "C"]."""
    partes = []
    for p in re.split(r"[;,]", (texto or "").strip().rstrip(".")):
        p = p.strip()
        # «X y Y» solo si ambos lados empiezan con mayúscula (no parte nombres como «Torre y Saa»)
        sub = re.split(r"\s+y\s+(?=[A-ZÁÉÍÓÚÑ])", p)
        partes.extend(s.strip() for s in sub if s.strip())
    return partes


# ---------------------------------------------------------------- tabla

class Tabla:
    """Equivalencias variante → forma normalizada, respetando la precedencia de fuentes."""

    def __init__(self):
        self.filas = {}  # (tipo, plegar(variante)) -> fila

    def poner(self, variante, tipo, forma, n_llave="", origen="regla", confianza="media", forzar=False):
        variante = re.sub(r"\s+", " ", (variante or "").strip())
        clave = (tipo, plegar(variante))
        if not clave[1]:
            return
        fila = {"variante": variante, "tipo": tipo, "forma_normalizada": forma, "n_llave": n_llave,
                "origen": origen, "confianza": confianza}
        actual = self.filas.get(clave)
        if forzar or actual is None or RANGO_ORIGEN[origen] < RANGO_ORIGEN[actual["origen"]]:
            self.filas[clave] = fila

    def buscar(self, tipo, texto):
        return self.filas.get((tipo, plegar(texto)))

    def guardar(self, ruta):
        orden = sorted(self.filas.values(), key=lambda f: (f["tipo"], plegar(f["forma_normalizada"]), plegar(f["variante"])))
        with ruta.open("w", encoding="utf-8", newline="") as fh:
            w = csv.DictWriter(fh, fieldnames=COLUMNAS)
            w.writeheader()
            w.writerows(orden)


def leer(ruta):
    with ruta.open(encoding="utf-8") as fh:
        return list(csv.DictReader(fh))


def tokens_nombre(nombre):
    return [t for t in plegar(nombre).split() if t not in PARTICULAS]


def compatibles(a, b):
    """Mismos nombres salvo iniciales: «R. Bonome» ~ «Rodrigo Bonome», «Avelino Hermida» ~
    «Avelino M. Hermida», «J. D. Mena» ~ «Juan de Dios Mena»."""
    ta, tb = tokens_nombre(a), tokens_nombre(b)
    if not ta or not tb or ta[-1] != tb[-1]:
        return False
    if len(ta) == len(tb):
        return all(x == y or (len(x) == 1 and y.startswith(x)) or (len(y) == 1 and x.startswith(y))
                   for x, y in zip(ta, tb))
    sa = [t for t in ta if len(t) > 1]
    sb = [t for t in tb if len(t) > 1]
    return len(sa) >= 2 and sa == sb


# Casos fijos (task.md, decisiones del equipo de investigación). Prevalecen sobre todo lo demás.
# (variante, tipo, forma_normalizada, n_llave, confianza)
CASOS_FIJOS = [
    ("Aldo Boglietti", "persona", "Aldo Boglietti", "11", "alta"),
    ("Sr. Aldo Boglietti", "persona", "Aldo Boglietti", "11", "alta"),
    ("Efraín Boglietti", "persona", "Efraín Boglietti", "3", "alta"),
    # Alfredo: sin llave (21 y 118 sin decidir)
    ("Alfredo Boglietti", "persona", "Alfredo Boglietti", "", "alta"),
    ("Don Alfredo Boglietti", "persona", "Alfredo Boglietti", "", "alta"),
    ("Boglietti, Alfredo", "persona", "Alfredo Boglietti", "", "alta"),
    ("José Babini", "persona", "José Babini", "125", "alta"),
    ("Dr. José Babini", "persona", "José Babini", "125", "alta"),
    ("José Banti", "persona", "José Banti", "81", "alta"),
    ("Cayetano Córdova Iturburu", "persona", "Cayetano Córdova Iturburu", "133", "alta"),
    ("Córdova Iturburu", "persona", "Cayetano Córdova Iturburu", "133", "alta"),
    ("Córdoba Iturburu", "persona", "Cayetano Córdova Iturburu", "133", "alta"),
    ("Enrique Kédinger", "persona", "Enrique Kédinger", "151", "alta"),
    ("Don Enrique Kédinger", "persona", "Enrique Kédinger", "151", "alta"),
    ("Henri Kédinger", "persona", "Enrique Kédinger", "151", "baja"),
    ("Koedinger", "persona", "", "", "baja"),
    ("A. M. Vedinger", "persona", "Ana María Kédinger", "", "baja"),
    ("M. Vedinger", "persona", "Ana María Kédinger", "", "baja"),
    ("Ana María Kedinger", "persona", "Ana María Kédinger", "", "media"),
    ("Yvonne Kédinger", "persona", "Yvonne Kédinger", "", "media"),
    ("Yvonne de Kedinger", "persona", "Yvonne Kédinger", "", "media"),
    ("Susana Glombovsky de Landman", "persona", "Susana Glombovsky de Landman", "61", "alta"),
    ("Susana Glombovsky", "persona", "Susana Glombovsky de Landman", "61", "alta"),
    ("Susana Slomkovsky", "persona", "Susana Glombovsky de Landman", "61", "baja"),
    ("Hilda Torres Varela", "persona", "Hilda Torres Varela", "13", "alta"),
    ("Hilda Dianda", "persona", "Hilda Dianda", "203", "alta"),
    # del Villar: forma más frecuente en el inventario (Joaquín: personas, leyenda e inscripciones
    # de S65-0040; Julián: solo el programa de S78-0002)
    ("Joaquín del Villar", "persona", "Joaquín del Villar", "", "baja"),
    ("Julián del Villar", "persona", "Joaquín del Villar", "", "baja"),
    # Artefactos de transcripción
    ("Horacio Rivero Sosa y Saa", "persona", "Horacio Rivero Sosa", "327", "media"),
    ("Secretariachurro de Barea", "persona", "", "", "baja"),
    ("Aerolíneas Argentinas 17", "institucion", "Aerolíneas Argentinas", "", "alta"),
    ("Aerolíneas Argentinas", "institucion", "Aerolíneas Argentinas", "", "alta"),
    ("Hostal del Conde de Gondomar. Chon", "institucion", "Hostal del Conde de Gondomar", "", "alta"),
    ("Hostal del Conde de Gondomar", "institucion", "Hostal del Conde de Gondomar", "", "alta"),
    ("La Forestal Argentina (directorio)", "institucion", "La Forestal Argentina", "", "alta"),
    ("Directorio de La Forestal Argentina", "institucion", "La Forestal Argentina", "", "alta"),
    # Rigaud: el índice (entrada 12) dice «Jorge»; el reverso de S12-0026, «Georges»
    ("Georges Rigaud", "persona", "Jorge Rigaud", "", "baja"),
    # El reverso de S19-0059 dice «pepe díaz llave 22» (Libro de Llaves: «Díaz, José»)
    ("Pepe Díaz", "persona", "José Díaz", "22", "media"),
    # Apodo del reverso con nombre completo en la lista del equipo (Raúl «Gordo» Cerrutti)
    ("Gordo Cerrutti", "persona", "Raúl Cerrutti", "95", "media"),
]

# Nombres sueltos consignados por el equipo (07/10/2026): se usan cuando el sobre o la entrada del
# índice no tienen el nombre completo. (variante, forma_normalizada, n_llave)
SUELTOS_CONSIGNADOS = [
    ("Aldo", "Aldo Boglietti", "11"),
    ("Mena", "Juan de Dios Mena", "1"),
    ("Moragues", "Miguel Moragues", "278"),
    ("Hermida", "Avelino Hermida", "116"),
    ("Carman", "César Carman", ""),
    ("Hilda", "Hilda Torres Varela", "13"),
    ("Efraín", "Efraín Boglietti", "3"),
    ("Kay", "Neil Mac Kay", "426"),
]

RENOMBRAR = {"Avelino M. Hermida": "Avelino Hermida"}  # incluye «Gallego Hermida» (S108) y S14

INSTITUCIONES = [
    ("El Fogón de los Arrieros", ["Fogón de los Arrieros", "El Fogón de los Arrieros", "Fundación El Fogón de los Arrieros",
                                  "Fundación Fogón de los Arrieros", "EFDA", "Fundación EFDA"]),
    ("Universidad Nacional del Nordeste", ["UNNE", "Universidad Nacional del Nordeste", "U.N.N.E."]),
    ("Chacotur", ["Chacotur", "Agencia de Viajes Chacotur", "Chacotur Viajes S.R.L."]),
    ("BBC", ["BBC", "BBC Latin", "BBC LATIN", "BBC Latin-American Service"]),
    ("LV3 Radio Córdoba", ["LV3 Radio Córdoba", "LV3", "L.V.3"]),
    ("Automóvil Club Argentino", ["Automóvil Club Argentino", "A.C.A."]),
    ("Rotary Club Internacional", ["Rotary Club Internacional"]),
    ("Caja de Ahorro", ["Caja Ahorro", "Caja de Ahorro"]),
    ("Conjunto Fray Mocho", ["Fray Mocho", "Conjunto Fray Mocho"]),
]

# Lugares: la variante incluye la marca locativa para no confundir el Fogón institución con el lugar.
LUGARES = [
    ("Resistencia (Chaco)", ["Resistencia", "Resistencia, Chaco", "Resistencia (Chaco)", "en Resistencia"]),
    ("El Fogón de los Arrieros, Resistencia (Chaco)", [
        "El Fogón de los Arrieros, Resistencia", "en el Fogón", "en El Fogón de los Arrieros",
        "en el Fogón de los Arrieros", "edificio del Fogón", "Interiores y exteriores del Fogón",
        "Interiores y exteriores de El Fogón de los Arrieros", "jardín delantero del Fogón",
        "Fogón de los Arrieros, Resistencia"]),
    ('El "viejo" Fogón (1a sede - Brown 188)', [  # forma consignada por el equipo (07/10/2026)
        "El Fogón de los Arrieros (sede antigua), Resistencia", "Fogón viejo", "viejo Fogón",
        "en el viejo Fogón", "en el viejo Fogón de los Arrieros", "Viejo edificio de El Fogón de los Arrieros"]),
    ("Presidencia Roque Sáenz Peña (Chaco)", ["Presidencia Roque Sáenz Peña", "Sáenz Peña", "Pcia. R. Sáenz Peña"]),
    ("Ciudad de Buenos Aires", ["Buenos Aires", "Bs. Aires", "Capital Federal"]),
    ("Corrientes (Corrientes)", ["Corrientes", "en Corrientes"]),
    ("Córdoba (Córdoba)", ["Córdoba", "ciudad de Córdoba"]),
    ("Rosario (Santa Fe)", ["Rosario"]),
    ("Londres (Reino Unido)", ["Londres"]),
    ("París (Francia)", ["París", "Paris", "Cementerio del Père-Lachaise, París, Francia", "Père Lachaise"]),
    ("Madrid (España)", ["Madrid"]),
    ("Bolonia (Italia)", ["Bolonia (Italia)", "Bologna"]),
    ("Verona (Italia)", ["Verona (Italia)", "Verona"]),
    ("Tuy (Pontevedra, España)", ["Tuy (Pontevedra), España", "Tuy"]),
    ("Torre del Mar (Málaga, España)", ["Torre del Mar, Vélez-Málaga, España", "Torre del Mar"]),
    ("Nerja (Málaga, España)", ["Nerja (Málaga), España", "Nerja"]),
    ("Sierra Nevada (Granada, España)", ["Sierra Nevada (Granada), España", "Sierra Nevada"]),
    ("Antártida Argentina", ["Antártida Argentina", "Antártida Argentina (inferido por el sobre)", "Antártida Arg."]),
    ("Base Esperanza (Antártida Argentina)", ["Base Esperanza, Antártida Argentina",
                                               "Base Esperanza, Tierra de San Martín (Graham), Antártida Argentina"]),
    ("Bahía Esperanza (Antártida Argentina)", ["Bahía Esperanza, Antártida Argentina"]),
    ("Bahía Buen Suceso (Antártida Argentina)", ["Bahía Buen Suceso, Antártida Argentina", "Bahía Buen Suceso"]),
    ("Islas Orcadas del Sur (Antártida Argentina)", ["Islas Orcadas del Sur, Antártida Argentina", "Islas Orcadas"]),
]

# Fotógrafos y estudios: variantes tal como aparecen en los sellos (inscripciones_reverso).
FOTOGRAFOS = [
    ("Pissano", ["Pissano", "Laboratorios Pissano", "Sello: PISSANO"]),
    ("Boschetti", ["Boschetti", "Foto Boschetti", "Foto Boschetti (Resistencia)", "Pablo Boschetti", "Estudio Boschetti",
                   "Pablo Luis Boschetti"]),
    ("Lescano", ["Arturo Armando Lescano", "Lescano"]),
    ("Grete Stern", ["Grete Stern", "Foto Grete Stern", "G. Stern"]),
    ("Paquiri", ["Paquiri", "Paquiri; Fotor, Organización Fotográfica (Resistencia)", "fotógrafo Paquiri"]),
    ("Alvarez", ["Alvarez (Mundo Agrario)", "Foto Alvarez", "Álvarez"]),
    ("Nigris Hnos.", ["Nigris Hnos. (Rosario)", "Nigris Hs.", "Nigris"]),
    ("Portillo", ["Portillo (Madrid)", "Portillo"]),
    ("BBC (Servicio Latinoamericano)", ["BBC", "BBC Copyright Photograph"]),
]

# Obras teatrales: forma normalizada del título.
OBRAS = [
    ("Una libra de carne", ["La libra de carne", "Una libra de carne"]),
    ("El café de Pomona", ["El café de Pomona"]),
    ("El jugador", ["El jugador"]),
    ("Cita en Senlis", ["Cita en Senlis"]),
    ("El profesor Taranne", ["El profesor Taranne"]),
    ("Antígona", ["Antígona", "Antigona"]),
    ("Fin de semana", ["Fin de semana", "Fiebre de heno"]),
    ("El zoo de cristal", ["El zoo de cristal", "El zoológico de cristal"]),
    ("Santiago o la sumisión", ["Santiago o la sumisión"]),
    ("Azouk", ["Azouk", "Azuk"]),
    ("Liliom", ["Liliom"]),
    ("Un sabor a miel", ["Un sabor a miel"]),
    ("La gran furia de Felipe Hotz", ["La gran furia de Felipe Hotz"]),
    ("El que dice sí, el que dice no", ["El que dice sí, el que dice no", "El que dice sí y el que dice no"]),
]

# Eventos de la planilla → forma normalizada (sin tratamientos; teatro = «Representación de …»).
EVENTOS = [
    ("Representación de una obra de Chéjov", ["Teatro: obra de Chéjov", "Teatro: Obra de Chéjov"]),
    ("Representación de una obra de Hochwälder", ["Teatro: obra de Hochwälder", "Teatro: Obra de Hochwälder"]),
    ("Teatro leído: una obra de Rattigan", ["Teatro leído – Obra de Rattigan"]),
    ("Visita del conjunto Fray Mocho", ["Visita del conjunto Fray Mocho"]),
    ("Despedida de Hilda Torres Varela", ["Despedida de Hilda Torres Varela"]),
    ("Fiesta de gala en el Fogón", ["Fiesta de gala en el Fogón"]),
    ("Homenaje a Mena", ["Homenaje a Mena"]),  # «Mena» suelto: no se resuelve fuera del sobre
    ("Juramento de la llave (Orden de la Llave)", ["Juramento de la llave (Orden de la Llave)"]),
    ("Concierto pro nuevo edificio", ["Concierto pro nuevo edificio"]),
    ("Visita de Arturo Barea a Córdoba (LV3 Radio Córdoba)", [
        "Visita de Arturo Barea a Córdoba (LV3 Radio Córdoba)",
        "Visita ARTURO BAREA y ALDO BOGLIETTI A LA CIUDAD DE CORDOBA",
        "Visita de Arturo Barea y Aldo Boglietti a la ciudad de Córdoba"]),
    ("Conferencia de Alberto Torres", ["Conferencia del Dr. Alberto Torres"]),
    ("Charla de José R. Bergallo", ["Charla del Dr. José R. Bergallo"]),
    ("Construcción del nuevo edificio del Fogón", ["Construcción del nuevo edificio del Fogón"]),
    ("Homenaje a Aldo Boglietti (placa del Club de los 12)", ["Homenaje a Aldo Boglietti (placa del Club de los 12)"]),
    ("Casamiento Kédinger - Rizzotti", ["Casamiento Vedinger - Rizzotti"]),
]


def representacion(obra):
    return f"Representación de «{obra}»"


# Palabras que descartan un segmento del índice como nombre de persona.
NO_PERSONA = re.compile(
    r"\b(teatro|fog[oó]n|conjunto|hermanos|interiores|exteriores|revoluci[oó]n|inauguraci[oó]n|muestra|mesa|"
    r"premier|despedida|festejo|c[oó]nsul|estatuas|banquines|ikebana|fiesta|vistas|entregas|cumpleaños|"
    r"visita|directorio|murales|litograf[ií]as|ballet|obra|comitiva|interventor|aerol[ií]neas|concentraci[oó]n|"
    r"homenaje|varios|sus obras|edificio|libertad|rotary)\b",
    re.I,
)


def personas_del_indice(titulo):
    """Nombres de persona en una entrada del índice («Antonio de Raco – Elizabeth Westerkamp»)."""
    nombres = []
    for seg in re.split(r"\s+[–-]\s+", titulo):
        seg = re.sub(r"[«»“”\"]", "", seg).strip()
        seg = re.sub(r"^(Homenaje a(l)?|Inauguraci[oó]n mural de|Conferencia de|Cumpleaños de|"
                     r"Despedida( de soltero:)?)\s+", "", seg, flags=re.I)
        seg = re.sub(r"\s+y\s+(su|sus|conjunto|comitiva)\b.*$", "", seg, flags=re.I)
        if NO_PERSONA.search(seg) or re.search(r"\d", seg) or re.search(rf"\b{_MES}\b", plegar(seg)):
            continue
        for parte in separar_menciones(seg):
            limpio = regla_a(parte)
            if clasificar(parte) == "persona" and not re.fullmatch(r"[A-Z]\.", limpio.split()[0]) \
                    or re.fullmatch(r"[A-ZÁÉÍÓÚ][a-záéíóúñü]+", limpio):
                nombres.append(parte)
            elif re.fullmatch(r"[A-Z]\. \w+", limpio):  # «R. Bonome»: solo si coincide con el equipo
                nombres.append(parte)
    return nombres


def construir():
    t = Tabla()
    llaves = leer(FUENTES / "autoridades/libro_llaves.csv")
    verificadas = leer(FUENTES / "autoridades/personas_verificadas.csv")
    cajas = leer(FUENTES / "autoridades/indices_cajas.csv")
    decisiones = leer(FUENTES / "decisiones_entidades.csv")
    notebook = leer(FUENTES / "referencia_autoridades.csv")
    recortes = leer(RECORTES)
    inventario = leer(INVENTARIO)
    indice = leer(INDICE)

    # Personas del equipo: forma canónica por clave plegada (para cruzar el resto de las fuentes)
    canon = {}  # plegar(forma o variante) -> (forma, n_llave)

    por_apellido = defaultdict(set)  # último token plegado -> claves de canon

    def canonica(forma, llave, variante, conf="alta"):
        t.poner(variante, "persona", forma, llave, "equipo", conf)
        clave = plegar(variante)
        canon.setdefault(clave, (forma, llave))
        if tokens_nombre(clave):
            por_apellido[tokens_nombre(clave)[-1]].add(clave)

    por_llave = defaultdict(list)
    for v in verificadas:
        if v["n_llave"]:
            por_llave[v["n_llave"]].append(v["forma_normalizada"])
    for r in llaves:
        tal_cual = r["nombre_tal_cual"].strip()
        if ":" in tal_cual:  # «Ávalos: Napoleón, Roberto…» (familia, no una persona)
            continue
        natural = invertir(tal_cual)
        # Si la persona está en personas_verificadas con la misma llave y el mismo apellido, se usa esa forma
        forma = natural
        for f in por_llave.get(r["n_llave"], []):
            if difflib.SequenceMatcher(None, plegar(r["apellido"]), plegar(f).split()[-1]).ratio() >= 0.8 or \
                    plegar(r["apellido"]) in plegar(f):
                forma = f
        for variante in {tal_cual, natural}:
            canonica(forma, r["n_llave"], variante)

    for v in verificadas:
        forma, llave = v["forma_normalizada"].strip(), v["n_llave"].strip()
        canonica(forma, llave, forma)
        for var in re.split(r";", v["variantes"]):
            var = var.strip()
            apodo = re.search(r"\"(\w+)\"", var)
            if apodo and len(var.split()) >= 3:  # Raúl "Gordo" Cerrutti → Gordo Cerrutti
                canonica(forma, llave, f"{apodo[1]} {var.split()[-1]}", "media")
            limpio = regla_a(var)
            if len(limpio.split()) >= 2:
                canonica(forma, llave, var)
                canonica(forma, llave, limpio)
            elif limpio:
                t.poner(limpio, "persona", "", "", "regla", "baja")  # nombre suelto: se resuelve por sobre

    def a_canon(nombre):
        """Forma del equipo para un nombre (exacta o compatible por iniciales), o None."""
        c = canon.get(plegar(nombre)) or canon.get(plegar(regla_a(nombre)))
        if c:
            return c, "alta"
        limpio = regla_a(nombre)
        ultimo = (tokens_nombre(limpio) or [""])[-1]
        candidatos = {canon[k] for k in por_apellido.get(ultimo, ()) if compatibles(limpio, k)}
        if len(candidatos) == 1:
            return candidatos.pop(), "media"
        return None, None

    def persona(variante, origen, conf, con_inicial=False):
        if clasificar(variante) == "institucion":
            return
        limpio = regla_a(variante)
        if len(limpio.split()) < 2:
            if limpio:
                t.poner(limpio, "persona", "", "", "regla", "baja")
            return
        c, conf_c = a_canon(limpio)
        if c:
            peor = max(conf, conf_c, key=RANGO_CONFIANZA.get)
            t.poner(variante, "persona", c[0], c[1], origen, peor)
            t.poner(limpio, "persona", c[0], c[1], origen, peor)
        elif con_inicial or not re.fullmatch(r"[A-Z]\.", limpio.split()[0]):  # «S. Salvador» del índice: no
            sueltas[plegar(limpio)].append((limpio, variante, origen, conf))

    sueltas = defaultdict(list)  # personas sin forma del equipo: se unifican por clave plegada

    # Índices de cajas (equipo)
    for r in cajas:
        if r["nota"].startswith("línea descriptiva"):
            continue
        for parte in re.split(r"\s+(?:y|-)\s+", r["nombre_tal_cual"]):
            nombre = invertir(parte) if "," in parte else parte
            tipo = clasificar(nombre)
            if tipo == "institucion":
                t.poner(parte, "institucion", regla_a(nombre), "", "equipo", "media")
            elif tipo == "persona":
                persona(parte if "," not in parte else nombre, "equipo", "media")

    # Recortes periodísticos
    for r in recortes:
        for m in separar_menciones(r["Personas o instituciones mencionadas"]):
            tipo = clasificar(m)
            if tipo == "persona":
                persona(m, "recortes", "media")
            elif tipo == "institucion":
                t.poner(m, "institucion", m.strip(" ."), "", "recortes", "media")

    # Decisiones propuestas (unificar / separar); los nombres sueltos van por la regla del sobre
    for d in decisiones:
        prop = d["decision_propuesta"].strip()
        if d["tipo"] != "persona" or not prop.startswith(("unificar", "separar")) or not d["forma_normalizada"]:
            continue
        destinos = [f.strip() for f in d["forma_normalizada"].split("|")]
        llaves_d = [x.strip().replace("—", "") for x in d["n_llave"].split("|")]
        for forma in (f.strip() for f in d["formas"].split("·")):
            limpio = regla_a(forma)
            if len(limpio.split()) < 2:
                continue
            # El apellido del destino tiene que estar en la forma («Moisés Chilese» no es Penchansky) y
            # cada nombre de la forma, en el destino («Lino R. Torres» no es Alberto Torres)
            def cabe(forma_, dst):
                td = tokens_nombre(dst)
                tf = tokens_nombre(forma_)
                return tf[-1] in td and all(x in td or (len(x) == 1 and any(y.startswith(x) for y in td)) for x in tf)
            puntajes = [(len(set(tokens_nombre(limpio)) & set(tokens_nombre(dst))) if cabe(limpio, dst) else 0, i)
                        for i, dst in enumerate(destinos)]
            mejor, i = max(puntajes)
            if mejor == 0 or (len(destinos) > 1 and sorted(p for p, _ in puntajes)[-2] == mejor):
                continue
            dst = destinos[i]
            c, _ = a_canon(dst)
            forma_dst, llave = c if c else (dst, llaves_d[i] if i < len(llaves_d) else "")
            t.poner(forma, "persona", forma_dst, llave, "decision", "media")
            t.poner(limpio, "persona", forma_dst, llave, "decision", "media")

    # Cuaderno (no verificado)
    for r in notebook:
        tipo = r["tipo"]
        if tipo == "persona":
            forma = invertir(r["forma"]) if "," in r["forma"] else r["forma"]
            for var in [forma] + [v.strip() for v in r["variantes"].split(";")]:
                if var:
                    persona(var, "notebook", "baja")
        elif tipo == "institucion":
            for var in [r["forma"]] + [v.strip() for v in r["variantes"].split(";")]:
                if var:
                    t.poner(var, "institucion", r["forma"], "", "notebook", "baja")

    # Regla A: personas ya cargadas en la planilla y nombres de las entradas del índice
    for r in inventario:
        for p in (x.strip() for x in r["personas"].split(";")):
            if p:
                persona(p, "regla", "media", con_inicial=True)
    for e in indice:
        for p in personas_del_indice(e["titulo"]):
            persona(p, "regla", "baja" if e["lectura_dudosa"] == "si" else "media")

    # Personas sin forma del equipo: una forma por clave plegada (la de más tildes, después la más frecuente)
    for clave, lista_ in sueltas.items():
        frec = Counter(limpio for limpio, *_ in lista_)
        forma = max(frec, key=lambda f: (tildes(f), frec[f]))
        for limpio, variante, origen, conf in lista_:
            t.poner(variante, "persona", forma, "", origen, conf)
            t.poner(limpio, "persona", forma, "", origen, conf)

    # Instituciones, lugares, fotógrafos, obras y eventos (regla)
    for forma, variantes in INSTITUCIONES:
        for v in variantes:
            t.poner(v, "institucion", forma, "", "regla", "alta", forzar=True)
    for forma, variantes in LUGARES:
        for v in variantes:
            t.poner(v, "lugar", forma, "", "regla", "alta")
    for forma, variantes in FOTOGRAFOS:
        llave = "231" if forma == "Grete Stern" else ""
        for v in variantes:
            t.poner(v, "fotografo", forma, llave, "equipo" if llave else "regla", "alta")
    for forma, variantes in OBRAS:
        for v in variantes:
            t.poner(v, "obra", forma, "", "regla", "alta")
            t.poner(f"Teatro: {v}", "evento", representacion(forma), "", "regla", "alta")
    for forma, variantes in EVENTOS:
        for v in variantes:
            t.poner(v, "evento", forma, "", "regla", "alta")
    # Eventos de teatro de la planilla con autor («Teatro: El jugador, de Ugo Betti»)
    for r in inventario:
        ev = r["evento"].strip()
        m = re.match(r"Teatro:\s*(.+?)(?:,\s*de\s+.+)?$", ev)
        if m and t.buscar("obra", m[1]):
            t.poner(ev, "evento", representacion(t.buscar("obra", m[1])["forma_normalizada"]), "", "regla", "alta")

    # Una institución nunca es persona («Fray Mocho», «Chacotur»…)
    for clave in [k for k in t.filas if k[0] == "persona" and ("institucion", k[1]) in t.filas
                  and t.filas[("institucion", k[1])]["origen"] != "recortes"]:
        del t.filas[clave]

    # Casos fijos al final: prevalecen
    for variante, tipo, forma, llave, conf in CASOS_FIJOS:
        t.poner(variante, tipo, forma, llave, "equipo", conf, forzar=True)
    for variante, forma, llave in SUELTOS_CONSIGNADOS:
        t.poner(variante, "persona", forma, llave, "equipo", "media", forzar=True)
    # Cualquier otra variante que haya quedado apuntando a una forma de un caso fijo hereda su llave
    # Forma de visualización consignada por el equipo (07/10/2026) para una forma de las autoridades
    for fila in t.filas.values():
        if fila["tipo"] == "persona" and fila["forma_normalizada"] in RENOMBRAR:
            fila["forma_normalizada"] = RENOMBRAR[fila["forma_normalizada"]]
    fijas = {plegar(f): (f, ll) for _, tp, f, ll, _ in CASOS_FIJOS if tp == "persona" and f}
    for fila in t.filas.values():
        if fila["tipo"] == "persona" and plegar(fila["forma_normalizada"]) in fijas:
            fila["forma_normalizada"], fila["n_llave"] = fijas[plegar(fila["forma_normalizada"])]
    return t


if __name__ == "__main__":
    tabla = construir()
    tabla.guardar(TABLA)
    cuenta = Counter((f["tipo"], f["origen"]) for f in tabla.filas.values())
    print(f"{len(tabla.filas)} variantes -> {TABLA.relative_to(RAIZ)}")
    for (tipo, origen), n in sorted(cuenta.items()):
        print(f"  {tipo:12} {origen:9} {n}")
