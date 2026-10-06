import { config, fechaLegible, nombreCaja, type Foto } from "./datos"

export function urlPermanente(f: Foto) {
  return `${config.archivo.url_base}#/foto/${f.id}`
}

function tituloCita(f: Foto) {
  if (f.sin_titulo) return "[Sin título]"
  return f.titulo_atribuido ? `[${f.titulo}]` : f.titulo
}

export function citaAPA(f: Foto) {
  const autor = f.fotografo ? `${f.fotografo}.` : "[Autor desconocido]."
  const fecha = f.fecha ? fechaLegible(f) : "s. f."
  return `${autor} (${fecha}). ${tituloCita(f)} [Fotografía]. ${config.archivo.nombre}, ${nombreCaja(f.caja)}, sobre ${f.sobre} (${f.id}).`
}

export function citaChicago(f: Foto) {
  const autor = f.fotografo ? `${f.fotografo}. ` : ""
  return `${autor}“${tituloCita(f)}.” Fotografía, ${fechaLegible(f)}. ${nombreCaja(f.caja)}, sobre ${f.sobre}, ${f.id}. ${config.archivo.nombre}, ${config.archivo.institucion}. ${urlPermanente(f)}.`
}

export function citaBibTeX(f: Foto) {
  const clave = f.id.replace(/[^A-Za-z0-9]/g, "")
  const anio = f.anio_desde ? `\n  year = {${f.fecha}},` : ""
  return `@misc{${clave},
  title = {${tituloCita(f)}},
  author = {${f.fotografo ?? "{Autor desconocido}"}},${anio}
  howpublished = {Fotografía. ${config.archivo.nombre}, ${nombreCaja(f.caja)}, sobre ${f.sobre}},
  note = {Signatura ${f.id}. ${config.archivo.institucion}},
  url = {${urlPermanente(f)}}
}`
}

const COLUMNAS: (keyof Foto)[] = [
  "id", "caja", "sobre", "numero", "titulo", "titulo_atribuido", "titulo_fuente", "indice_n", "indice_titulo", "fecha", "lugar",
  "personas", "evento", "materias", "fotografo", "tecnica", "soporte", "dimensiones",
  "leyenda_reverso", "inscripciones_reverso", "descripcion", "estado_ficha",
]

export function aCSV(lista: Foto[]) {
  const celda = (v: unknown) => {
    const s = Array.isArray(v) ? v.join("; ") : v == null ? "" : String(v)
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
  }
  const filas = lista.map((f) => COLUMNAS.map((c) => celda(f[c])).join(","))
  return [COLUMNAS.join(","), ...filas].join("\n")
}

export function descargar(nombre: string, contenido: string, tipo: string) {
  const blob = new Blob([contenido], { type: `${tipo};charset=utf-8` })
  const a = document.createElement("a")
  a.href = URL.createObjectURL(blob)
  a.download = nombre
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(a.href), 1000)
}
