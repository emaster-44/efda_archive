import fotosJson from "../../../data/fotografias.json"
import cajasJson from "../../../data/cajas.json"
import indiceJson from "../../../data/indice.json"
import configJson from "../../../data/config.json"
import resumenJson from "../../../data/resumen.json"

/** Fotografía: unidad de archivo. Caja y sobre son unidades de resguardo. */
export interface Foto {
  id: string
  caja: string
  sobre: string
  numero: number | null
  titulo: string
  titulo_atribuido: boolean
  /** Origen de un título atribuido: entrada del índice manuscrito o leyenda del reverso. */
  titulo_fuente?: "indice" | "reverso"
  sin_titulo: boolean
  indice_n?: number
  indice_titulo?: string
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
  leyenda_reverso?: string
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
  cantidad: number
  portada: string
}

export interface Caja {
  id: string
  numero: number
  etiqueta: string
  cantidad: number
  sobres: Sobre[]
}

export interface EntradaIndice {
  n: number
  titulo: string
  lectura_dudosa: boolean
  nota: string
  fotos: string[]
}

export interface Faceta {
  campo: string
  etiqueta: string
}

export const fotos = fotosJson as Foto[]
export const cajas = cajasJson as Caja[]
export const indice = indiceJson as EntradaIndice[]
export const config = configJson as {
  archivo: Record<string, string>
  imagenes: { modo: "drive" | "local" | "ninguna"; ancho_miniatura: number; ancho_ficha: number }
  facetas: Faceta[]
  por_pagina: number
}

export const fotoPorId = new Map(fotos.map((f) => [f.id, f]))
export const cajaPorId = new Map(cajas.map((c) => [c.id, c]))
export const cajaDeSobre = new Map(cajas.flatMap((c) => c.sobres.map((s) => [s.id, c] as const)))
export const sobresEnOrden = cajas.flatMap((c) => c.sobres)
export const fotosPorSobre = fotos.reduce((m, f) => {
  const l = m.get(f.sobre) ?? []
  l.push(f)
  m.set(f.sobre, l)
  return m
}, new Map<string, Foto[]>())

/** "C01a20" -> "Caja 1" */
export function nombreCaja(id: string) {
  const c = cajaPorId.get(id)
  return c ? `Caja ${c.numero}` : id
}

/** "C01a20" -> "Caja 1 · Sobres 01 a 20" */
export function rotuloCaja(id: string) {
  const c = cajaPorId.get(id)
  return c ? `Caja ${c.numero} · ${c.etiqueta}` : id
}

/** Ubicación física legible: "Caja 1 (C01a20) › Sobre S20 › n.º 4" */
export function ubicacion(f: Foto) {
  return `${nombreCaja(f.caja)} (${f.caja}) › Sobre ${f.sobre}${f.numero ? ` › n.º ${f.numero}` : ""}`
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
  const calif = f.fecha_calificador === "circa" ? "ca. " : ""
  const duda = f.fecha_calificador === "incierta" ? " (?)" : ""
  return `${calif}${base}${duda}`
}

/** Publicación: "con_datos" = selección piloto (título, índice o reverso); "todas" = inventario completo. */
export const resumen = resumenJson as { criterio: "con_datos" | "todas"; inventario: number; publicadas: number; cajas_inventario: number }

export const estadisticas = {
  fotos: fotos.length,
  inventario: resumen.inventario,
  seleccion: resumen.criterio === "con_datos",
  cajas: cajas.length,
  sobres: sobresEnOrden.length,
  reversos: fotos.filter((f) => f.reverso).length,
  catalogadas: fotos.filter((f) => f.estado_ficha !== "pendiente").length,
  vinculadasIndice: indice.filter((e) => e.fotos.length).length,
  entradasIndice: indice.length,
}
