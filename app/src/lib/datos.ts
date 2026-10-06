import fotosJson from "../../../data/fotografias.json"
import sobresJson from "../../../data/sobres.json"
import configJson from "../../../data/config.json"

export interface Foto {
  id: string
  sobre: string
  numero: number | null
  titulo: string
  titulo_sobre: string
  titulo_atribuido: boolean
  anverso: string
  reverso: string
  archivo: string
  estado_ficha: string
  descripcion?: string
  personas?: string[]
  lugar?: string
  fecha?: string
  fecha_inferida?: boolean
  fecha_calificador?: string
  anio_desde?: number
  anio_hasta?: number
  decada?: string
  evento?: string
  materias?: string[]
  fotografo?: string
  tecnica?: string
  soporte?: string
  dimensiones?: string
  inscripciones_reverso?: string
  estado_conservacion?: string
  nota_historica?: string
  nota_biografica?: string
  documentos_relacionados?: string[]
  bibliografia?: string[]
  derechos?: string
  observaciones?: string
}

export interface Sobre {
  id: string
  titulo: string
  cantidad: number
  lectura_dudosa?: boolean
  portada?: string
  faltante?: boolean
}

export interface Faceta {
  campo: keyof Foto
  etiqueta: string
}

export const fotos = fotosJson as Foto[]
export const sobres = sobresJson as Sobre[]
export const config = configJson as {
  archivo: Record<string, string>
  imagenes: { modo: "drive" | "local" | "ninguna"; ancho_miniatura: number; ancho_ficha: number }
  facetas: Faceta[]
  por_pagina: number
}

export const fotoPorId = new Map(fotos.map((f) => [f.id, f]))
export const sobrePorId = new Map(sobres.map((s) => [s.id, s]))
export const fotosPorSobre = fotos.reduce((m, f) => {
  const l = m.get(f.sobre) ?? []
  l.push(f)
  m.set(f.sobre, l)
  return m
}, new Map<string, Foto[]>())

/** Número legible de sobre: "S030" -> "30", "S106b" -> "106 b" */
export function numeroSobre(id: string) {
  const m = id.match(/^S0*(\d+)([a-z]?)$/i)
  return m ? `${m[1]}${m[2] ? " " + m[2] : ""}` : id
}

export function urlImagen(f: Foto, lado: "anverso" | "reverso", ancho: number): string | null {
  const id = lado === "anverso" ? f.anverso : f.reverso
  if (!id) return null
  switch (config.imagenes.modo) {
    case "drive":
      return `https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w${ancho}`
    case "local": {
      const carpeta = ancho <= config.imagenes.ancho_miniatura ? "miniaturas" : "ficha"
      return `media/${carpeta}/${f.id}${lado === "reverso" ? "r" : ""}.jpg`
    }
    default:
      return null
  }
}

export function fechaLegible(f: Foto) {
  if (!f.fecha) return "s. f."
  const base = f.fecha.replace(/[~?]/g, "").replace("/", "–")
  const calif =
    f.fecha_calificador === "circa" ? "ca. " : ""
  const duda = f.fecha_calificador === "incierta" ? " (?)" : ""
  return `${calif}${base}${duda}`
}

export const estadisticas = {
  fotos: fotos.length,
  sobres: sobres.filter((s) => !s.faltante).length,
  reversos: fotos.filter((f) => f.reverso).length,
  catalogadas: fotos.filter((f) => f.estado_ficha !== "pendiente").length,
  faltantes: sobres.filter((s) => s.faltante).length,
}
