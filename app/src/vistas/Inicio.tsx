import { useState } from "react"
import { Search } from "lucide-react"
import { enlace, ir } from "@/lib/ruta"
import { paramsDesdeConsulta } from "@/lib/busqueda"
import { MosaicoFondo } from "@/components/MosaicoFondo"

export function Inicio() {
  const [texto, setTexto] = useState("")

  const enviar = (e: React.FormEvent) => {
    e.preventDefault()
    ir(enlace.buscar(paramsDesdeConsulta({ q: texto.trim() })))
  }

  return (
    // "dark" fija los tokens oscuros en la portada: el texto siempre va sobre el velo oscuro.
    <section className="dark relative isolate flex min-h-svh items-center justify-center overflow-hidden text-foreground">
      <MosaicoFondo />

      <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-20 text-center md:px-6">
        <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] md:text-6xl">
          Archivo Fotográfico <br className="hidden sm:block" />
          <em className="font-normal text-primary">El Fogón de los Arrieros</em>
          <span className="mt-4 block font-sans text-base font-normal uppercase tracking-[0.25em] text-muted-foreground md:text-base">
            Fondo digital de consulta e investigación
          </span>
        </h1>

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
                placeholder="Fogoneros, artistas, eventos, obras, fechas…"
                className="h-full w-full min-w-0 bg-transparent px-2.5 text-sm outline-none placeholder:text-muted-foreground/70"
              />
              <button
                type="submit"
                className="h-full shrink-0 border-l px-3.5 text-sm font-medium text-primary hover:bg-accent"
              >
                Buscar
              </button>
            </div>
          </form>
          <a
            href={enlace.cajas()}
            className="foco shrink-0 rounded-sm border border-primary bg-primary px-5 py-2.5 text-center text-sm text-primary-foreground hover:opacity-90"
          >
            Explorar
          </a>
        </div>
      </div>
    </section>
  )
}
