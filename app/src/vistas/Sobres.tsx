import { useMemo, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { fotosPorSobre, numeroSobre, sobrePorId, sobres } from "@/lib/datos"
import { enlace } from "@/lib/ruta"
import { normalizar } from "@/lib/busqueda"
import { Imagen } from "@/components/Imagen"
import { Grilla, TarjetaFoto } from "@/components/TarjetaFoto"

export function Sobres() {
  const [filtro, setFiltro] = useState("")
  const lista = useMemo(() => {
    const f = normalizar(filtro.trim())
    return f ? sobres.filter((s) => normalizar(`${numeroSobre(s.id)} ${s.titulo}`).includes(f)) : sobres
  }, [filtro])

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <p className="etiqueta">Orden original del archivo</p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-3xl font-semibold">Índice de sobres</h1>
        <input
          type="search"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          placeholder="Filtrar el índice…"
          aria-label="Filtrar el índice de sobres"
          className="h-9 w-full max-w-xs rounded-sm border border-input bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        Títulos transcriptos del <em>Índice Fotografías</em> manuscrito (sobres 1 a 119). Los sobres 120 a
        149 no figuran en el índice. Las lecturas dudosas están señaladas con <sup>?</sup>; los sobres
        marcados “falta” aparecen en el índice pero no en la digitalización.
      </p>

      <ol className="mt-8 grid gap-x-10 md:grid-cols-2">
        {lista.map((s) => {
          const portada = fotosPorSobre.get(s.id)?.[0]
          return (
            <li key={s.id} className="renglon">
              <a
                href={s.faltante ? undefined : enlace.sobre(s.id)}
                aria-disabled={s.faltante}
                className={`flex items-center gap-3 py-2 ${s.faltante ? "cursor-default text-muted-foreground" : "group"}`}
              >
                <span className="w-10 shrink-0 text-right font-mono text-xs tabular-nums text-muted-foreground">
                  {numeroSobre(s.id)}
                </span>
                <span className="h-10 w-8 shrink-0 overflow-hidden rounded-[2px] border">
                  {portada ? <Imagen foto={portada} ancho={120} /> : <span className="block h-full w-full bg-[hsl(var(--placa))]" />}
                </span>
                <span className="flex-1 font-serif italic group-hover:text-primary">
                  {s.titulo || <span className="not-italic text-muted-foreground">sin título en el índice</span>}
                  {s.lectura_dudosa && <sup className="ml-0.5 not-italic text-primary">?</sup>}
                </span>
                <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                  {s.faltante ? "falta" : `${s.cantidad} fot.`}
                </span>
              </a>
            </li>
          )
        })}
      </ol>
      {!lista.length && <p className="mt-8 text-muted-foreground">Ningún sobre coincide con “{filtro}”.</p>}
    </div>
  )
}

export function VistaSobre({ id }: { id: string }) {
  const s = sobrePorId.get(id)
  const lista = fotosPorSobre.get(id) ?? []
  const disponibles = sobres.filter((x) => !x.faltante)
  const pos = disponibles.findIndex((x) => x.id === id)
  const ant = disponibles[pos - 1]
  const sig = disponibles[pos + 1]

  if (!s) return <NoEncontrado que={`el sobre ${id}`} />

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <nav aria-label="Ruta" className="text-sm text-muted-foreground">
        <a href="#/sobres" className="hover:text-primary">Índice de sobres</a> / Sobre {numeroSobre(id)}
      </nav>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4 border-b pb-6">
        <div>
          <p className="etiqueta">Sobre {numeroSobre(id)} · {lista.length} fotografías</p>
          <h1 className="mt-2 font-serif text-3xl font-semibold italic md:text-4xl">
            {s.titulo || <span className="not-italic text-muted-foreground">Sin título en el índice</span>}
          </h1>
          {s.lectura_dudosa && (
            <p className="mt-2 text-sm text-muted-foreground">Transcripción con lectura dudosa del índice manuscrito.</p>
          )}
        </div>
        <div className="flex gap-2 text-sm">
          {ant && (
            <a href={enlace.sobre(ant.id)} className="foco inline-flex items-center gap-1 rounded-sm border px-3 py-1.5 hover:border-primary">
              <ChevronLeft className="h-4 w-4" /> {numeroSobre(ant.id)}
            </a>
          )}
          {sig && (
            <a href={enlace.sobre(sig.id)} className="foco inline-flex items-center gap-1 rounded-sm border px-3 py-1.5 hover:border-primary">
              {numeroSobre(sig.id)} <ChevronRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
      <div className="mt-8">
        <Grilla>
          {lista.map((f) => (
            <TarjetaFoto key={f.id} foto={f} mostrarSobre={false} />
          ))}
        </Grilla>
      </div>
    </div>
  )
}

export function NoEncontrado({ que }: { que: string }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <p className="etiqueta">Sin resultados</p>
      <h1 className="mt-3 text-3xl font-semibold">No encontramos {que}</h1>
      <p className="mt-4 text-muted-foreground">
        Volvé al <a href="#/" className="text-primary underline">inicio</a> o consultá el{" "}
        <a href="#/sobres" className="text-primary underline">índice de sobres</a>.
      </p>
    </div>
  )
}
