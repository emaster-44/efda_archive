import { ChevronLeft, ChevronRight } from "lucide-react"
import { cajaDeSobre, cajaPorId, cajas, entradaDeSobre, fotoPorId, fotosPorSobre, sobresEnOrden, type Sobre } from "@/lib/datos"
import { enlace } from "@/lib/ruta"
import { Imagen } from "@/components/Imagen"
import { Grilla, TarjetaFoto } from "@/components/TarjetaFoto"
import { PanelExplorador } from "@/components/PanelExplorador"
import { ilustracionesCaja } from "@/assets/cajas"

const n = (x: number) => x.toLocaleString("es-AR")
const fotosDeCaja = (c: (typeof cajas)[number]) => c.sobres.reduce((t, s) => t + s.cantidad, 0)

/** Ubicación física: Caja › Sobre. Son unidades de resguardo, no de descripción. Nivel raíz: las 7 cajas. */
export function Cajas() {
  return (
    <PanelExplorador
      nivel="cajas"
      titulo="Cajas del fondo"
      subtitulo="Las fotografías se conservan en sobres, agrupados en cajas. Elegí una caja para ver sus sobres."
    >
      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-10">
        {cajas.map((c, i) => (
          <li key={c.id} className="w-[calc(50%-0.75rem)] sm:w-60 xl:w-72">
            <a
              href={enlace.caja(c.id)}
              aria-label={`Caja ${c.numero} · ${c.etiqueta} · ${n(fotosDeCaja(c))} fotografías`}
              className="foco group relative block aspect-[16/10] rounded-sm"
            >
              <img
                src={ilustracionesCaja[i % ilustracionesCaja.length]}
                alt=""
                aria-hidden
                className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_14px_22px_rgba(0,0,0,0.45)] transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.04] dark:brightness-90"
              />
              <span className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-[12%] text-center">
                <span className="font-serif text-lg font-semibold leading-tight text-[#2a2a2a]">Caja {c.numero}</span>
                <span className="text-[0.7rem] leading-tight text-[#3a3a3a]">{c.etiqueta}</span>
              </span>
            </a>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              {c.sobres.length} sobres · {n(fotosDeCaja(c))} fotografías
            </p>
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
    <PanelExplorador
      cajaActiva={id}
      titulo={`Caja ${c.numero} · ${c.etiqueta}`}
      subtitulo={<>{c.sobres.length} sobres · {n(fotosDeCaja(c))} fotografías · <span className="signatura">{c.id}</span></>}
    >
      <ListaSobres sobres={c.sobres} />
    </PanelExplorador>
  )
}

/** Nivel sobres: los sobres de todas las cajas, en el orden del fondo. */
export function VistaSobres() {
  return (
    <PanelExplorador
      nivel="sobres"
      titulo="Sobres del fondo"
      subtitulo="En el orden del fondo. Cada sobre lleva el título de su entrada en el índice manuscrito."
    >
      <ListaSobres sobres={sobresEnOrden} />
    </PanelExplorador>
  )
}

/** Sobres con su título del índice y la cantidad de fotos visibles (no solo en el tooltip). */
function ListaSobres({ sobres }: { sobres: Sobre[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
      {sobres.map((s) => {
        const portada = fotoPorId.get(s.portada)
        const entrada = entradaDeSobre.get(s.id)
        const nombre = `Sobre ${s.id}${entrada ? `: ${entrada.titulo}` : ", sin entrada en el índice"} · ${s.cantidad} ${s.cantidad === 1 ? "fotografía" : "fotografías"}`
        return (
          <li key={s.id}>
            <a href={enlace.sobre(s.id)} aria-label={nombre} className="foco group block rounded-sm">
              <span className="block aspect-[4/5] overflow-hidden rounded-sm shadow-[0_8px_18px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:-translate-y-1">
                {portada && <Imagen foto={portada} ancho={200} decorativa className="transition-transform duration-500 group-hover:scale-105" />}
              </span>
              <span className="mt-2 block space-y-0.5" aria-hidden>
                <span className="flex items-baseline justify-between gap-2 text-xs">
                  <span className="signatura text-foreground group-hover:text-primary">{s.id}</span>
                  <span className="tabular-nums text-muted-foreground">{s.cantidad} fotos</span>
                </span>
                <span className="line-clamp-2 block font-serif text-[0.9rem] leading-snug group-hover:text-primary">
                  {entrada ? entrada.titulo : <em className="text-muted-foreground">Sin entrada en el índice</em>}
                </span>
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
    <PanelExplorador
      cajaActiva={c.id}
      sobreActivo={id}
      titulo={entrada ? <>[{entrada.titulo}]</> : `Sobre ${id}`}
      subtitulo={
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p>
            Sobre <span className="signatura">{id}</span> · {lista.length} fotografías
            {entrada && (
              <>
                {" · "}
                <a href="#/indice" className="foco rounded-sm text-primary underline-offset-2 hover:underline">
                  Índice manuscrito, entrada {entrada.n}
                </a>
              </>
            )}
          </p>
          <span className="flex gap-2 text-sm">
            {ant && (
              <a href={enlace.sobre(ant.id)} aria-label={`Sobre anterior: ${ant.id}`} className="foco inline-flex items-center gap-1 rounded-sm border px-3 py-2 hover:border-primary">
                <ChevronLeft className="h-4 w-4" aria-hidden /> {ant.id}
              </a>
            )}
            {sig && (
              <a href={enlace.sobre(sig.id)} aria-label={`Sobre siguiente: ${sig.id}`} className="foco inline-flex items-center gap-1 rounded-sm border px-3 py-2 hover:border-primary">
                {sig.id} <ChevronRight className="h-4 w-4" aria-hidden />
              </a>
            )}
          </span>
        </div>
      }
    >
      <div className="border-t pt-8">
        <Grilla>
          {lista.map((f) => (
            <TarjetaFoto key={f.id} foto={f} enSobre />
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
        Volvé al <a href="#/" className="foco rounded-sm text-primary underline">inicio</a>, probá el{" "}
        <a href="#/buscar" className="foco rounded-sm text-primary underline">buscador</a> o recorré las{" "}
        <a href="#/cajas" className="foco rounded-sm text-primary underline">cajas y sobres</a>.
      </p>
    </div>
  )
}
