import { ChevronLeft, ChevronRight } from "lucide-react"
import { cajaDeSobre, cajaPorId, cajas, entradaDeSobre, fotoPorId, fotosPorSobre, sobresEnOrden, type Sobre } from "@/lib/datos"
import { enlace } from "@/lib/ruta"
import { Imagen } from "@/components/Imagen"
import { Grilla, TarjetaFoto } from "@/components/TarjetaFoto"
import { PanelExplorador } from "@/components/PanelExplorador"
import { ilustracionesCaja } from "@/assets/cajas"

/** Ubicación física: Caja › Sobre. Son unidades de resguardo, no de descripción. Nivel raíz: las 7 cajas, flotando. */
export function Cajas() {
  return (
    <PanelExplorador nivel="cajas">
      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-10">
        {cajas.map((c, i) => (
          <li key={c.id} className="w-[calc(50%-0.75rem)] sm:w-60 xl:w-72">
            <a
              href={enlace.caja(c.id)}
              aria-label={`Caja ${c.numero} · ${c.etiqueta}`}
              className="foco group relative block aspect-[16/10] rounded-sm"
            >
              <img
                src={ilustracionesCaja[i % ilustracionesCaja.length]}
                alt=""
                aria-hidden
                className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_14px_22px_rgba(0,0,0,0.45)] transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.04] dark:brightness-90"
              />
              <span className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-[18%] text-center">
                <span className="font-serif text-lg font-semibold text-[#2a2a2a]">Caja {c.numero}</span>
                <span className="text-xs text-[#4a4a4a]">{c.etiqueta}</span>
              </span>
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
    <PanelExplorador nivel="cajas" cajaActiva={id}>
      <ListaSobres sobres={c.sobres} />
    </PanelExplorador>
  )
}

/** Nivel sobres: los sobres de todas las cajas, en el orden del fondo. */
export function VistaSobres() {
  return (
    <PanelExplorador nivel="sobres">
      <ListaSobres sobres={sobresEnOrden} />
    </PanelExplorador>
  )
}

/** Sobres flotantes, siempre centrados (la última fila también). */
function ListaSobres({ sobres }: { sobres: Sobre[] }) {
  return (
    <ul className="flex flex-wrap justify-center gap-x-4 gap-y-6">
      {sobres.map((s) => {
        const portada = fotoPorId.get(s.portada)
        return (
          <li key={s.id} className="w-24 sm:w-28 lg:w-32">
            <a href={enlace.sobre(s.id)} title={entradaDeSobre.get(s.id)?.titulo} className="foco group block rounded-sm">
              <span className="block aspect-[4/5] overflow-hidden rounded-sm shadow-[0_8px_18px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:-translate-y-1">
                {portada && <Imagen foto={portada} ancho={200} className="transition-transform duration-500 group-hover:scale-105" />}
              </span>
              <span className="mt-2 block text-center text-xs">
                <span className="signatura group-hover:text-primary">{s.id}</span>
              </span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export function VistaSobre({ id }: { id: string }) {
  const c = cajaDeSobre.get(id)
  const lista = fotosPorSobre.get(id) ?? []
  const pos = sobresEnOrden.findIndex((s) => s.id === id)
  const ant = sobresEnOrden[pos - 1]
  const sig = sobresEnOrden[pos + 1]
  if (!c) return <NoEncontrado que={`el sobre ${id}`} />
  const entrada = entradaDeSobre.get(id)

  return (
    <PanelExplorador nivel="sobres" cajaActiva={c.id} sobreActivo={id}>
      <div className="flex flex-wrap items-end justify-between gap-4 border-b pb-6">
        <div>
          {entrada && (
            <p className="font-serif text-lg">
              <a href="#/indice" className="hover:text-primary">
                Índice manuscrito, entrada {entrada.n}: <em>{entrada.titulo}</em>
              </a>
            </p>
          )}
          <p className="etiqueta mt-1">{lista.length} fotografías</p>
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
