import { useEffect, useState } from "react"
import { Search, Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { config } from "@/lib/datos"
import { enlace, ir } from "@/lib/ruta"
import { paramsDesdeConsulta } from "@/lib/busqueda"

export function Cabecera({ vista, q }: { vista: string; q: string }) {
  const [texto, setTexto] = useState(q)
  const [oscuro, setOscuro] = useState(() => document.documentElement.classList.contains("dark"))

  useEffect(() => setTexto(q), [q])

  const alternarTema = () => {
    const nuevo = !oscuro
    document.documentElement.classList.toggle("dark", nuevo)
    setOscuro(nuevo)
    try {
      localStorage.setItem("efda-tema", nuevo ? "oscuro" : "claro")
    } catch {
      /* almacenamiento no disponible */
    }
  }

  const enviar = (e: React.FormEvent) => {
    e.preventDefault()
    ir(enlace.buscar(paramsDesdeConsulta({ q: texto.trim() })))
  }

  const nav = [
    { href: "#/buscar", etiqueta: "Explorar", activo: vista === "buscar" || vista === "foto" },
    { href: "#/sobres", etiqueta: "Índice de sobres", activo: vista === "sobres" || vista === "sobre" },
    { href: "#/acerca", etiqueta: "Acerca", activo: vista === "acerca" },
  ]

  return (
    <header className="sticky top-0 z-30 border-b bg-background/92 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 md:flex-nowrap md:px-6">
        <a href="#/" className="foco flex items-baseline gap-2.5 rounded-sm">
          <span className="font-serif text-xl font-semibold tracking-tight text-primary">{config.archivo.sigla}</span>
          <span className="hidden text-sm leading-tight text-muted-foreground lg:inline">
            Archivo Fotográfico
            <br />
            <span className="text-xs">El Fogón de los Arrieros</span>
          </span>
        </a>

        <form onSubmit={enviar} role="search" className="order-3 w-full md:order-none md:max-w-xl md:flex-1">
          <label htmlFor="busqueda" className="sr-only">
            Buscar en el fondo
          </label>
          <div className="flex h-10 items-center rounded-sm border border-input bg-card focus-within:ring-2 focus-within:ring-ring">
            <Search className="ml-3 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
            <input
              id="busqueda"
              type="search"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Personas, eventos, obras de teatro, signaturas…"
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

        <nav aria-label="Principal" className="ml-auto flex items-center gap-1 text-sm">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              aria-current={n.activo ? "page" : undefined}
              className={cn(
                "foco rounded-sm px-2.5 py-1.5 text-muted-foreground hover:text-foreground",
                n.activo && "text-foreground underline decoration-primary decoration-2 underline-offset-[6px]",
              )}
            >
              {n.etiqueta}
            </a>
          ))}
          <button
            type="button"
            onClick={alternarTema}
            aria-label={oscuro ? "Usar tema claro" : "Usar tema oscuro"}
            className="foco ml-1 rounded-sm p-2 text-muted-foreground hover:text-foreground"
          >
            {oscuro ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </nav>
      </div>
    </header>
  )
}
