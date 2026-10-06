import { ChevronLeft, ChevronRight } from "lucide-react"
import { cajaDeSobre, cajaPorId, cajas, entradaDeSobre, estadisticas, fotoPorId, fotosPorSobre, sobresEnOrden } from "@/lib/datos"
import { enlace } from "@/lib/ruta"
import { Imagen } from "@/components/Imagen"
import { Grilla, TarjetaFoto } from "@/components/TarjetaFoto"
import { PanelExplorador } from "@/components/PanelExplorador"
import { ilustracionesCaja } from "@/assets/cajas"

/** Ubicación física: Caja › Sobre. Son unidades de resguardo, no de descripción. Nivel raíz: las 7 cajas. */
export function Cajas() {
  return (
    <PanelExplorador>
      <p className="etiqueta">Ubicación física</p>
      <h1 className="mt-2 text-3xl font-semibold">Cajas</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {estadisticas.seleccion
          ? `La selección piloto reúne ${estadisticas.fotos} fotografías de ${sobresEnOrden.length} sobres, en ${cajas.length} cajas. `
          : `El fondo se conserva en ${cajas.length} cajas y ${sobresEnOrden.length} sobres. `}
        Cajas y sobres son unidades de resguardo: indican dónde se guarda cada fotografía, no qué representa.
        Elegí una caja para ver sus sobres.
      </p>

      <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cajas.map((c, i) => (
          <li key={c.id}>
            <a
              href={enlace.caja(c.id)}
              className="foco group block overflow-hidden rounded-md border bg-card transition-colors hover:border-primary"
            >
              <div className="relative aspect-[16/10] bg-[hsl(var(--placa))]">
                <img
                  src={ilustracionesCaja[i % ilustracionesCaja.length]}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-[1.03] dark:brightness-90"
                />
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-12 text-center">
                  <p className="font-serif text-lg font-semibold text-[#2a2a2a]">Caja {c.numero}</p>
                  <p className="text-xs text-[#4a4a4a]">{c.etiqueta}</p>
                </div>
              </div>
              <div className="flex items-center justify-between border-t px-4 py-2.5 text-xs">
                <span className="signatura text-muted-foreground">{c.id}</span>
                <span className="text-muted-foreground">
                  {c.sobres.length} sobres · {c.cantidad} fotografías
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </PanelExplorador>
  )
}

export function VistaCaja({ id }: { id: string }) {
  const c = cajaPorId.get(id)
  if (!c) return <NoEncontrado que={`la caja ${id}`} />
  return (
    <PanelExplorador cajaActiva={id}>
      <nav aria-label="Ruta" className="text-sm text-muted-foreground">
        <a href={enlace.cajas()} className="hover:text-primary">Cajas</a> / Caja {c.numero}
      </nav>
      <p className="etiqueta mt-4">Caja {c.numero} · {c.id}</p>
      <h1 className="mt-2 text-3xl font-semibold">{c.etiqueta}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{c.cantidad} fotografías en {c.sobres.length} sobres</p>
      <ul className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        {c.sobres.map((s) => {
          const portada = fotoPorId.get(s.portada)
          return (
            <li key={s.id}>
              <a href={enlace.sobre(s.id)} title={entradaDeSobre.get(s.id)?.titulo} className="foco group block rounded-sm">
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
    </PanelExplorador>
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
    <PanelExplorador cajaActiva={c.id} sobreActivo={id}>
      <nav aria-label="Ruta" className="text-sm text-muted-foreground">
        <a href={enlace.cajas()} className="hover:text-primary">Cajas</a> /{" "}
        <a href={enlace.caja(c.id)} className="hover:text-primary">Caja {c.numero}</a> / Sobre {id}
      </nav>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4 border-b pb-6">
        <div>
          <p className="etiqueta">Caja {c.numero} ({c.id}) · {lista.length} fotografías</p>
          <h1 className="mt-2 text-3xl font-semibold md:text-4xl">Sobre {id}</h1>
          {entradaDeSobre.get(id) && (
            <p className="mt-2 font-serif text-lg">
              <a href="#/indice" className="hover:text-primary">
                Índice manuscrito, entrada {entradaDeSobre.get(id)!.n}: <em>{entradaDeSobre.get(id)!.titulo}</em>
              </a>
            </p>
          )}
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
    </PanelExplorador>
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
