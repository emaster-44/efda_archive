import MiniSearch from "minisearch"
import { fotos, fotoPorId, rotuloCaja, type Foto } from "./datos"

const VACIAS = new Set(
  "a al con de del el en la las los o para por que se su sus un una y e u".split(" "),
)

export function normalizar(t: string) {
  return t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
}

const indice = new MiniSearch<Foto>({
  idField: "id",
  fields: [
    "id", "titulo", "indice_titulo", "descripcion", "personas", "lugar", "evento",
    "materias", "fotografo", "leyenda_reverso", "inscripciones_reverso", "nota_historica", "nota_biografica",
  ],
  extractField: (doc, campo) => {
    const v = (doc as unknown as Record<string, unknown>)[campo]
    return Array.isArray(v) ? v.join(" ") : ((v as string) ?? "")
  },
  processTerm: (term) => {
    const t = normalizar(term)
    return VACIAS.has(t) ? null : t
  },
  searchOptions: {
    prefix: true,
    fuzzy: 0.18,
    combineWith: "AND",
    boost: { id: 6, titulo: 3, personas: 3, evento: 2, indice_titulo: 2, leyenda_reverso: 2, lugar: 1.5 },
  },
})
indice.addAll(fotos)

export type Orden = "relevancia" | "signatura" | "fecha" | "titulo"

export interface Consulta {
  q: string
  filtros: Record<string, string[]>
  desde?: number
  hasta?: number
  orden: Orden
  pagina: number
}

export function consultaDesdeParams(p: URLSearchParams): Consulta {
  const filtros: Record<string, string[]> = {}
  p.forEach((v, k) => {
    if (k.startsWith("f.")) (filtros[k.slice(2)] ??= []).push(v)
  })
  const num = (k: string) => {
    const n = parseInt(p.get(k) ?? "", 10)
    return Number.isFinite(n) ? n : undefined
  }
  return {
    q: p.get("q") ?? "",
    filtros,
    desde: num("desde"),
    hasta: num("hasta"),
    orden: (p.get("orden") as Orden) || (p.get("q") ? "relevancia" : "signatura"),
    pagina: Math.max(1, num("pag") ?? 1),
  }
}

export function paramsDesdeConsulta(c: Partial<Consulta>) {
  const p = new URLSearchParams()
  if (c.q) p.set("q", c.q)
  for (const [k, vs] of Object.entries(c.filtros ?? {})) vs.forEach((v) => p.append(`f.${k}`, v))
  if (c.desde) p.set("desde", String(c.desde))
  if (c.hasta) p.set("hasta", String(c.hasta))
  if (c.orden && c.orden !== (c.q ? "relevancia" : "signatura")) p.set("orden", c.orden)
  if (c.pagina && c.pagina > 1) p.set("pag", String(c.pagina))
  return p.toString()
}

function valores(f: Foto, campo: string): string[] {
  if (campo === "vinculo_indice") return [f.indice_n ? "Vinculada a una entrada" : "Sin vincular"]
  const v = (f as unknown as Record<string, unknown>)[campo]
  if (v == null || v === "") return []
  return Array.isArray(v) ? (v as string[]) : [String(v)]
}

export function ejecutar(c: Consulta): Foto[] {
  let base: Foto[]
  const q = c.q.trim()
  if (!q) {
    base = fotos
  } else if (fotoPorId.has(q)) {
    base = [fotoPorId.get(q)!]
  } else {
    base = indice.search(q).map((r) => fotoPorId.get(r.id as string)!)
  }

  const filtradas = base.filter((f) => {
    for (const [campo, sel] of Object.entries(c.filtros)) {
      if (!sel.length) continue
      const vs = valores(f, campo)
      if (!sel.some((s) => vs.includes(s))) return false
    }
    if (c.desde != null || c.hasta != null) {
      if (f.anio_desde == null) return false
      if (c.desde != null && (f.anio_hasta ?? f.anio_desde) < c.desde) return false
      if (c.hasta != null && f.anio_desde > c.hasta) return false
    }
    return true
  })

  if (c.orden === "signatura" || (c.orden === "relevancia" && !q)) {
    // Orden de precedencia del fondo: caja › sobre › número (el orden de `fotos`)
    const pos = new Map(fotos.map((f, i) => [f.id, i]))
    return filtradas.slice().sort((a, b) => pos.get(a.id)! - pos.get(b.id)!)
  }
  if (c.orden === "fecha") {
    return filtradas
      .slice()
      .sort((a, b) => (a.anio_desde ?? 9999) - (b.anio_desde ?? 9999) || a.id.localeCompare(b.id))
  }
  if (c.orden === "titulo") {
    // A–Z por título, ignorando corchetes y comillas iniciales; las fotos sin título van al final
    const clave = (t: string) => t.replace(/^[\s\[“"«¿(]+/, "")
    return filtradas
      .slice()
      .sort(
        (a, b) =>
          Number(a.sin_titulo) - Number(b.sin_titulo) ||
          clave(a.titulo).localeCompare(clave(b.titulo), "es", { sensitivity: "base", numeric: true }) ||
          a.id.localeCompare(b.id),
      )
  }
  return filtradas
}

export interface ValorFaceta {
  valor: string
  etiqueta: string
  cantidad: number
}

export function contarFaceta(resultados: Foto[], campo: string): ValorFaceta[] {
  const cuenta = new Map<string, number>()
  for (const f of resultados) for (const v of valores(f, campo)) cuenta.set(v, (cuenta.get(v) ?? 0) + 1)
  const etiqueta = (v: string) => {
    if (campo === "caja") return rotuloCaja(v)
    if (campo === "estado_ficha") return v.charAt(0).toUpperCase() + v.slice(1)
    return v
  }
  const lista = [...cuenta].map(([valor, cantidad]) => ({ valor, etiqueta: etiqueta(valor), cantidad }))
  if (campo === "caja") return lista.sort((a, b) => a.etiqueta.localeCompare(b.etiqueta, "es", { numeric: true }))
  if (campo === "decada") return lista.sort((a, b) => a.valor.localeCompare(b.valor))
  return lista.sort((a, b) => b.cantidad - a.cantidad || a.etiqueta.localeCompare(b.etiqueta))
}

export function sugerencias(q: string, n = 6) {
  if (q.trim().length < 2) return []
  return indice.autoSuggest(q, { prefix: true, fuzzy: 0.15 }).slice(0, n)
}
