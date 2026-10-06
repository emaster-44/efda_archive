import { useMemo, useState } from "react"
import { estadisticas, fotoPorId, indice } from "@/lib/datos"
import { enlace } from "@/lib/ruta"
import { normalizar } from "@/lib/busqueda"
import { Imagen } from "@/components/Imagen"

/** Índice manuscrito "Índice Fotografías": describe fotografías individuales. */
export function Indice() {
  const [filtro, setFiltro] = useState("")
  const [soloVinculadas, setSoloVinculadas] = useState(false)
  const lista = useMemo(() => {
    const f = normalizar(filtro.trim())
    return indice.filter(
      (e) =>
        (!soloVinculadas || e.fotos.length) &&
        (!f || normalizar(`${e.n} ${e.titulo}`).includes(f)),
    )
  }, [filtro, soloVinculadas])

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <p className="etiqueta">Fuente descriptiva</p>
      <h1 className="mt-2 text-3xl font-semibold">Índice manuscrito</h1>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        Transcripción del <em>Índice Fotografías</em> manuscrito del archivo ({estadisticas.entradasIndice} entradas).
        Cada entrada describe una fotografía. El vínculo entre la entrada y la fotografía se establece durante la
        catalogación: hasta ahora hay {estadisticas.vinculadasIndice} de {estadisticas.entradasIndice} entradas
        vinculadas. Las lecturas dudosas de la transcripción están señaladas con <sup className="text-primary">?</sup>.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <input
          type="search"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          placeholder="Filtrar el índice…"
          aria-label="Filtrar el índice"
          className="h-9 w-full max-w-xs rounded-sm border border-input bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={soloVinculadas}
            onChange={(e) => setSoloVinculadas(e.target.checked)}
            className="accent-[hsl(var(--primary))]"
          />
          Solo entradas vinculadas a una fotografía
        </label>
      </div>

      <ol className="mt-6 rounded-sm border bg-card px-5 py-2 font-serif">
        {lista.map((e) => {
          const foto = e.fotos[0] ? fotoPorId.get(e.fotos[0]) : undefined
          return (
            <li key={e.n} className="renglon flex items-center gap-4 py-2">
              <span className="w-9 shrink-0 text-right font-mono text-xs tabular-nums text-muted-foreground">{e.n}</span>
              <span className="flex-1">
                <span className="italic">{e.titulo}</span>
                {e.lectura_dudosa && (
                  <sup className="ml-0.5 cursor-help not-italic text-primary" title={e.nota || "lectura dudosa"}>?</sup>
                )}
                {!e.lectura_dudosa && e.nota && (
                  <span className="ml-2 font-sans text-xs text-muted-foreground">({e.nota})</span>
                )}
              </span>
              {foto ? (
                <a href={enlace.foto(foto.id)} className="foco group flex shrink-0 items-center gap-2 rounded-sm">
                  <span className="signatura text-primary group-hover:underline">{foto.id}</span>
                  <span className="block h-10 w-8 overflow-hidden rounded-[2px] border">
                    <Imagen foto={foto} ancho={120} />
                  </span>
                </a>
              ) : (
                <span className="shrink-0 font-sans text-xs text-muted-foreground">sin vincular</span>
              )}
            </li>
          )
        })}
      </ol>
      {!lista.length && <p className="mt-6 text-muted-foreground">Ninguna entrada coincide.</p>}
    </div>
  )
}
