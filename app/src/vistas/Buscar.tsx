import { useMemo, useState } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { config } from "@/lib/datos"
import { enlace, ir } from "@/lib/ruta"
import {
  contarFaceta,
  ejecutar,
  etiquetaValorFaceta,
  paramsDesdeConsulta,
  type Consulta,
  type Orden,
} from "@/lib/busqueda"
import { Grilla, TarjetaFoto } from "@/components/TarjetaFoto"

export function Buscar({ consulta }: { consulta: Consulta }) {
  const resultados = useMemo(() => ejecutar(consulta), [consulta])
  const [panel, setPanel] = useState(false)

  const navegar = (cambios: Partial<Consulta>) =>
    ir(enlace.buscar(paramsDesdeConsulta({ ...consulta, pagina: 1, ...cambios })))

  const alternar = (campo: string, valor: string) => {
    const actual = consulta.filtros[campo] ?? []
    const nuevo = actual.includes(valor) ? actual.filter((v) => v !== valor) : [...actual, valor]
    navegar({ filtros: { ...consulta.filtros, [campo]: nuevo } })
  }

  const porPagina = config.por_pagina
  const paginas = Math.max(1, Math.ceil(resultados.length / porPagina))
  const pagina = Math.min(consulta.pagina, paginas)
  const visibles = resultados.slice((pagina - 1) * porPagina, pagina * porPagina)

  const activos = Object.entries(consulta.filtros).flatMap(([c, vs]) => vs.map((v) => ({ c, v })))
  const hayFiltros = activos.length > 0 || consulta.desde || consulta.hasta
  const cantidadFiltros = activos.length + (consulta.desde || consulta.hasta ? 1 : 0)

  const facetas = (
    <Facetas consulta={consulta} resultados={resultados} alternar={alternar} navegar={navegar} />
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <div className="border-b pb-5">
        <h1 className="text-3xl font-semibold md:text-4xl">Buscar en el fondo</h1>
        <CampoBusqueda key={consulta.q} inicial={consulta.q} enviar={(q) => navegar({ q, orden: undefined })} />
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-muted-foreground" role="status">
            <span className="font-medium tabular-nums text-foreground">{resultados.length.toLocaleString("es-AR")}</span>{" "}
            {resultados.length === 1 ? "fotografía" : "fotografías"}
            {consulta.q && <> para «{consulta.q}»</>}
            {cantidadFiltros > 0 && <> · {cantidadFiltros} {cantidadFiltros === 1 ? "filtro" : "filtros"}</>}
          </p>
          <button
            type="button"
            onClick={() => setPanel((p) => !p)}
            className="foco inline-flex items-center gap-1.5 rounded-sm border border-input px-3 py-2 text-sm lg:hidden"
            aria-expanded={panel}
            aria-controls="panel-filtros"
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden /> Filtros{cantidadFiltros > 0 && ` (${cantidadFiltros})`}
          </button>
        </div>
      </div>

      {hayFiltros && (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          {activos.map(({ c, v }) => (
            <button
              key={c + v}
              type="button"
              onClick={() => alternar(c, v)}
              className="foco inline-flex items-center gap-1 rounded-sm bg-accent px-2 py-1"
            >
              <span className="text-muted-foreground">{etiquetaCampo(c)}:</span> {etiquetaValorFaceta(c, v)}
              <X className="h-3.5 w-3.5" aria-hidden />
              <span className="sr-only">(quitar filtro)</span>
            </button>
          ))}
          {(consulta.desde || consulta.hasta) && (
            <button
              type="button"
              onClick={() => navegar({ desde: undefined, hasta: undefined })}
              className="foco inline-flex items-center gap-1 rounded-sm bg-accent px-2 py-1"
            >
              Años {consulta.desde ?? "…"}–{consulta.hasta ?? "…"} <X className="h-3.5 w-3.5" aria-hidden />
              <span className="sr-only">(quitar filtro)</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => navegar({ filtros: {}, desde: undefined, hasta: undefined })}
            className="foco rounded-sm px-1 text-primary underline-offset-2 hover:underline"
          >
            Quitar todos los filtros
          </button>
        </div>
      )}

      <div className="mt-6 grid gap-8 lg:grid-cols-[250px_1fr]">
        <aside id="panel-filtros" className={cn("lg:block", panel ? "block" : "hidden")} aria-label="Filtros">
          {facetas}
        </aside>
        <div>
          {visibles.length ? (
            <Grilla>
              {visibles.map((f) => (
                <TarjetaFoto key={f.id} foto={f} />
              ))}
            </Grilla>
          ) : (
            <div className="rounded-sm border border-dashed p-10 text-center">
              <p className="font-serif text-lg">Ninguna fotografía coincide con la consulta.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Probá con menos palabras o con otra grafía del nombre, quitá filtros o recorré las{" "}
                <a href="#/cajas" className="foco rounded-sm text-primary underline">cajas y sobres</a>.
              </p>
            </div>
          )}

          {paginas > 1 && (
            <nav aria-label="Paginación" className="mt-10 flex items-center justify-center gap-1 text-sm">
              <BotonPagina p={pagina - 1} deshabilitado={pagina === 1} consulta={consulta}>
                Anterior
              </BotonPagina>
              <span className="px-3 tabular-nums text-muted-foreground">
                Página {pagina} de {paginas}
              </span>
              <BotonPagina p={pagina + 1} deshabilitado={pagina === paginas} consulta={consulta}>
                Siguiente
              </BotonPagina>
            </nav>
          )}
        </div>
      </div>
    </div>
  )
}

function BotonPagina({
  p,
  deshabilitado,
  consulta,
  children,
}: {
  p: number
  deshabilitado: boolean
  consulta: Consulta
  children: React.ReactNode
}) {
  if (deshabilitado) return <span className="rounded-sm border px-3 py-1.5 opacity-40">{children}</span>
  return (
    <a
      href={enlace.buscar(paramsDesdeConsulta({ ...consulta, pagina: p }))}
      onClick={() => window.scrollTo({ top: 0 })}
      className="foco rounded-sm border px-3 py-1.5 hover:border-primary"
    >
      {children}
    </a>
  )
}

const etiquetaCampo = (c: string) => config.facetas.find((f) => f.campo === c)?.etiqueta ?? c

/** Campo de búsqueda persistente: permite corregir o cambiar la consulta sin volver a la portada. */
function CampoBusqueda({ inicial, enviar }: { inicial: string; enviar: (q: string) => void }) {
  const [texto, setTexto] = useState(inicial)
  return (
    <form
      role="search"
      className="mt-4 max-w-2xl"
      onSubmit={(e) => {
        e.preventDefault()
        enviar(texto.trim())
      }}
    >
      <label htmlFor="consulta" className="sr-only">
        Buscar en el fondo
      </label>
      <div className="flex h-11 items-center rounded-sm border border-input bg-card focus-within:ring-2 focus-within:ring-ring">
        <Search className="ml-3 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
        <input
          id="consulta"
          type="search"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Personas, obras, eventos, lugares, signatura…"
          className="h-full w-full min-w-0 bg-transparent px-2.5 text-sm outline-none placeholder:text-muted-foreground"
        />
        <button type="submit" className="foco h-full shrink-0 border-l border-input px-4 text-sm font-medium text-primary hover:bg-accent">
          Buscar
        </button>
      </div>
    </form>
  )
}

function Facetas({
  consulta,
  resultados,
  alternar,
  navegar,
}: {
  consulta: Consulta
  resultados: ReturnType<typeof ejecutar>
  alternar: (c: string, v: string) => void
  navegar: (c: Partial<Consulta>) => void
}) {
  return (
    <div className="space-y-6">
      <SelectorOrden consulta={consulta} navegar={navegar} />
      <RangoAnios key={`${consulta.desde}-${consulta.hasta}`} consulta={consulta} navegar={navegar} />
      {config.facetas.map((f) => {
        const valores = contarFaceta(resultados, f.campo as string)
        const seleccion = consulta.filtros[f.campo as string] ?? []
        if (!valores.length && !seleccion.length) return null
        return (
          <GrupoFaceta
            key={f.campo as string}
            etiqueta={f.etiqueta}
            valores={valores}
            seleccion={seleccion}
            alternar={(v) => alternar(f.campo as string, v)}
          />
        )
      })}
    </div>
  )
}

function GrupoFaceta({
  etiqueta,
  valores,
  seleccion,
  alternar,
}: {
  etiqueta: string
  valores: { valor: string; etiqueta: string; cantidad: number }[]
  seleccion: string[]
  alternar: (v: string) => void
}) {
  const [todos, setTodos] = useState(false)
  const lista = todos ? valores : valores.slice(0, 8)
  return (
    <fieldset>
      <legend className="etiqueta mb-2">{etiqueta}</legend>
      <ul className={cn("space-y-0.5", todos && "max-h-80 overflow-y-auto pr-1")}>
        {lista.map((v) => {
          const activo = seleccion.includes(v.valor)
          return (
            <li key={v.valor}>
              <label className="flex cursor-pointer items-start gap-2 rounded-sm px-1 py-0.5 text-sm hover:bg-accent">
                <input
                  type="checkbox"
                  checked={activo}
                  onChange={() => alternar(v.valor)}
                  className="mt-1 accent-[hsl(var(--primary))]"
                />
                <span className={cn("flex-1 leading-snug", activo && "font-medium")}>{v.etiqueta}</span>
                <span className="text-xs tabular-nums text-muted-foreground">{v.cantidad}</span>
              </label>
            </li>
          )
        })}
      </ul>
      {valores.length > 8 && (
        <button type="button" onClick={() => setTodos((t) => !t)} aria-expanded={todos} className="foco mt-1 rounded-sm px-1 text-xs text-primary hover:underline">
          {todos ? "Mostrar menos" : `Ver los ${valores.length}`}
        </button>
      )}
    </fieldset>
  )
}

/** Orden de los resultados, en la barra lateral, arriba de Años. */
function SelectorOrden({ consulta, navegar }: { consulta: Consulta; navegar: (c: Partial<Consulta>) => void }) {
  return (
    <label className="block">
      <span className="etiqueta mb-2 block">Orden</span>
      <select
        value={consulta.orden}
        onChange={(e) => navegar({ orden: e.target.value as Orden })}
        className="h-9 w-full rounded-sm border border-input bg-card px-2 text-sm"
      >
        {consulta.q && <option value="relevancia">Relevancia</option>}
        <option value="fecha">Fecha</option>
        <option value="titulo">A–Z</option>
        <option value="signatura">Signatura</option>
      </select>
    </label>
  )
}

function RangoAnios({ consulta, navegar }: { consulta: Consulta; navegar: (c: Partial<Consulta>) => void }) {
  const [desde, setDesde] = useState(consulta.desde?.toString() ?? "")
  const [hasta, setHasta] = useState(consulta.hasta?.toString() ?? "")
  const aplicar = (e: React.FormEvent) => {
    e.preventDefault()
    navegar({ desde: parseInt(desde) || undefined, hasta: parseInt(hasta) || undefined })
  }
  return (
    <form onSubmit={aplicar}>
      <p className="etiqueta mb-2" id="rotulo-anios">Años</p>
      <div className="flex items-center gap-2 text-sm">
        <input
          inputMode="numeric"
          placeholder="1943"
          aria-label="Desde el año"
          value={desde}
          onChange={(e) => setDesde(e.target.value)}
          className="h-8 w-full min-w-0 rounded-sm border border-input bg-card px-2 tabular-nums"
        />
        <span className="text-muted-foreground">–</span>
        <input
          inputMode="numeric"
          placeholder="1980"
          aria-label="Hasta el año"
          value={hasta}
          onChange={(e) => setHasta(e.target.value)}
          className="h-8 w-full min-w-0 rounded-sm border border-input bg-card px-2 tabular-nums"
        />
        <button type="submit" className="foco h-8 rounded-sm border border-input px-2 hover:border-primary">
          Aplicar
        </button>
      </div>
    </form>
  )
}
