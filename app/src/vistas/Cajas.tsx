import { ChevronLeft, ChevronRight } from "lucide-react"
import { cajaDeSobre, cajaPorId, cajas, fotoPorId, fotosPorSobre, sobresEnOrden } from "@/lib/datos"
import { enlace } from "@/lib/ruta"
import { Imagen } from "@/components/Imagen"
import { Grilla, TarjetaFoto } from "@/components/TarjetaFoto"

/** Ubicación física: Caja › Sobre. Son unidades de resguardo, no de descripción. */
export function Cajas() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <p className="etiqueta">Ubicación física</p>
      <h1 className="mt-2 text-3xl font-semibold">Cajas y sobres</h1>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        El fondo se conserva en {cajas.length} cajas y {sobresEnOrden.length} sobres. Cajas y sobres son
        unidades de resguardo: indican dónde se guarda cada fotografía, no qué representa. La unidad de
        archivo es la fotografía, identificada por su signatura (por ejemplo{" "}
        <span className="signatura">C1a20-S20-0004</span>: caja C01a20, sobre S20, fotografía 4).
      </p>

      <div className="mt-10 space-y-12">
        {cajas.map((c) => (
          <section key={c.id} aria-labelledby={`caja-${c.id}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b pb-2">
              <h2 id={`caja-${c.id}`} className="text-xl font-semibold">
                <a href={enlace.caja(c.id)} className="hover:text-primary">
                  Caja {c.numero} <span className="font-normal text-muted-foreground">· {c.etiqueta}</span>
                </a>
              </h2>
              <span className="signatura text-muted-foreground">
                {c.id} · {c.cantidad} fotografías
              </span>
            </div>
            <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10">
              {c.sobres.map((s) => {
                const portada = fotoPorId.get(s.portada)
                return (
                  <li key={s.id}>
                    <a href={enlace.sobre(s.id)} className="foco group block rounded-sm">
                      <span className="block aspect-[4/5] overflow-hidden rounded-sm border">
                        {portada && <Imagen foto={portada} ancho={200} className="transition-transform duration-500 group-hover:scale-105" />}
                      </span>
                      <span className="mt-1 flex items-baseline justify-between gap-1 text-xs">
                        <span className="signatura group-hover:text-primary">{s.id}</span>
                        <span className="tabular-nums text-muted-foreground">{s.cantidad}</span>
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}

export function VistaCaja({ id }: { id: string }) {
  const c = cajaPorId.get(id)
  if (!c) return <NoEncontrado que={`la caja ${id}`} />
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <nav aria-label="Ruta" className="text-sm text-muted-foreground">
        <a href="#/cajas" className="hover:text-primary">Cajas y sobres</a> / Caja {c.numero}
      </nav>
      <p className="etiqueta mt-4">Caja {c.numero} · {c.id}</p>
      <h1 className="mt-2 text-3xl font-semibold">{c.etiqueta}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{c.cantidad} fotografías en {c.sobres.length} sobres</p>
      <div className="mt-8 space-y-10">
        {c.sobres.map((s) => (
          <section key={s.id}>
            <h2 className="mb-4 border-b pb-2 text-lg font-semibold">
              <a href={enlace.sobre(s.id)} className="hover:text-primary">Sobre {s.id}</a>
              <span className="ml-2 text-sm font-normal text-muted-foreground">{s.cantidad} fotografías</span>
            </h2>
            <Grilla>
              {(fotosPorSobre.get(s.id) ?? []).map((f) => (
                <TarjetaFoto key={f.id} foto={f} mostrarSobre={false} />
              ))}
            </Grilla>
          </section>
        ))}
      </div>
    </div>
  )
}

export function VistaSobre({ id }: { id: string }) {
  const c = cajaDeSobre.get(id)
  const lista = fotosPorSobre.get(id) ?? []
  const pos = sobresEnOrden.findIndex((s) => s.id === id)
  const ant = sobresEnOrden[pos - 1]
  const sig = sobresEnOrden[pos + 1]
  if (!c) return <NoEncontrado que={`el sobre ${id}`} />

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <nav aria-label="Ruta" className="text-sm text-muted-foreground">
        <a href="#/cajas" className="hover:text-primary">Cajas y sobres</a> /{" "}
        <a href={enlace.caja(c.id)} className="hover:text-primary">Caja {c.numero}</a> / Sobre {id}
      </nav>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4 border-b pb-6">
        <div>
          <p className="etiqueta">Caja {c.numero} ({c.id}) · {lista.length} fotografías</p>
          <h1 className="mt-2 text-3xl font-semibold md:text-4xl">Sobre {id}</h1>
        </div>
        <div className="flex gap-2 text-sm">
          {ant && (
            <a href={enlace.sobre(ant.id)} className="foco inline-flex items-center gap-1 rounded-sm border px-3 py-1.5 hover:border-primary">
              <ChevronLeft className="h-4 w-4" /> {ant.id}
            </a>
          )}
          {sig && (
            <a href={enlace.sobre(sig.id)} className="foco inline-flex items-center gap-1 rounded-sm border px-3 py-1.5 hover:border-primary">
              {sig.id} <ChevronRight className="h-4 w-4" />
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
        Volvé al <a href="#/" className="text-primary underline">inicio</a> o recorré las{" "}
        <a href="#/cajas" className="text-primary underline">cajas y sobres</a>.
      </p>
    </div>
  )
}
