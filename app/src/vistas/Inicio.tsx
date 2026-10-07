import { useState } from "react"
import { Pause, Play, Search } from "lucide-react"
import { enlace, ir } from "@/lib/ruta"
import { paramsDesdeConsulta } from "@/lib/busqueda"
import { estadisticas } from "@/lib/datos"
import { MosaicoFondo, prefiereQuieto } from "@/components/MosaicoFondo"

const n = (x: number) => x.toLocaleString("es-AR")

export function Inicio() {
  const [texto, setTexto] = useState("")
  const [pausado, setPausado] = useState(prefiereQuieto)

  const enviar = (e: React.FormEvent) => {
    e.preventDefault()
    ir(enlace.buscar(paramsDesdeConsulta({ q: texto.trim() })))
  }

  return (
    // "dark" fija los tokens oscuros en la portada: el texto siempre va sobre el velo oscuro.
    <section className="dark relative isolate flex min-h-svh items-center justify-center overflow-hidden text-foreground">
      <MosaicoFondo pausado={pausado} />

      <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-24 text-center md:px-6">
        <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] md:text-6xl">
          Archivo Fotográfico <br className="hidden sm:block" />
          <em className="font-normal text-primary">El Fogón de los Arrieros</em>
        </h1>
        <p className="mt-4 font-sans text-sm uppercase tracking-[0.22em] text-muted-foreground md:text-base">
          Fondo digital de consulta e investigación
        </p>

        <div className="mt-9 flex w-full max-w-xl flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <form onSubmit={enviar} role="search" className="flex-1">
            <label htmlFor="busqueda" className="sr-only">
              Buscar en el fondo
            </label>
            <div className="flex h-11 items-center rounded-sm border border-input bg-card/85 backdrop-blur focus-within:ring-2 focus-within:ring-ring">
              <Search className="ml-3 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
              <input
                id="busqueda"
                type="search"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                placeholder="Personas, obras, eventos, lugares, fechas…"
                className="h-full w-full min-w-0 bg-transparent px-2.5 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="foco h-full shrink-0 border-l border-input px-3.5 text-sm font-medium text-primary hover:bg-accent"
              >
                Buscar
              </button>
            </div>
          </form>
          <a
            href={enlace.cajas()}
            className="foco shrink-0 rounded-sm border border-primary bg-primary px-5 py-2.5 text-center text-sm text-primary-foreground hover:opacity-90"
          >
            Explorar cajas y sobres
          </a>
        </div>

        {/* Contexto mínimo para quien llega sin saber qué es el fondo */}
        <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
          {n(estadisticas.fotos)} fotografías en {estadisticas.cajas} cajas y {estadisticas.sobres} sobres: visitas de
          artistas, teatro, homenajes y la vida cultural del Fogón en Resistencia, Chaco.{" "}
          <a href="#/acerca" className="foco rounded-sm text-foreground underline underline-offset-4 hover:text-primary">
            Acerca del fondo
          </a>
        </p>
      </div>

      {/* Control del fondo animado (WCAG 2.2.2) */}
      <button
        type="button"
        onClick={() => setPausado((p) => !p)}
        className="foco absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1.5 text-xs text-foreground backdrop-blur hover:border-primary hover:text-primary md:bottom-6 md:right-6"
      >
        {pausado ? <Play className="h-3.5 w-3.5" aria-hidden /> : <Pause className="h-3.5 w-3.5" aria-hidden />}
        {pausado ? "Animar fondo" : "Pausar fondo"}
      </button>
    </section>
  )
}
