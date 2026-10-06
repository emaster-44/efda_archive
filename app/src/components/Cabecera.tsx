import { useEffect, useRef, useState } from "react"
import { Menu, Moon, Sun, X } from "lucide-react"
import { useRuta } from "@/lib/ruta"
import { cn } from "@/lib/utils"

const SECCIONES = [
  { href: "#/", texto: "Home", vistas: [""] },
  { href: "#/buscar", texto: "Buscador", vistas: ["buscar"] },
  { href: "#/cajas", texto: "Explorar", vistas: ["cajas", "caja", "sobres", "sobre"] },
  { href: "#/acerca", texto: "Acerca", vistas: ["acerca"] },
]

/** Controles flotantes arriba a la derecha: tema y menú. Sin barra. */
export function Cabecera() {
  const ruta = useRuta()
  const [oscuro, setOscuro] = useState(() => document.documentElement.classList.contains("dark"))
  const [abierto, setAbierto] = useState(false)
  const caja = useRef<HTMLDivElement>(null)

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

  // Cerrar al navegar, con Escape o con un clic afuera
  useEffect(() => setAbierto(false), [ruta.vista, ruta.arg])
  useEffect(() => {
    if (!abierto) return
    const tecla = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false)
    const clic = (e: MouseEvent) => caja.current && !caja.current.contains(e.target as Node) && setAbierto(false)
    document.addEventListener("keydown", tecla)
    document.addEventListener("mousedown", clic)
    return () => {
      document.removeEventListener("keydown", tecla)
      document.removeEventListener("mousedown", clic)
    }
  }, [abierto])

  const boton =
    "foco flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/70 text-foreground backdrop-blur hover:border-primary hover:text-primary"

  return (
    <div ref={caja} className="fixed right-4 top-4 z-40 flex items-start gap-2 md:right-6 md:top-5">
      <button type="button" onClick={alternarTema} aria-label={oscuro ? "Usar tema claro" : "Usar tema oscuro"} className={boton}>
        {oscuro ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
      <div className="relative">
        <button
          type="button"
          onClick={() => setAbierto((a) => !a)}
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={abierto}
          aria-controls="menu-principal"
          className={boton}
        >
          {abierto ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
        {abierto && (
          <nav
            id="menu-principal"
            aria-label="Principal"
            className="absolute right-0 top-12 w-48 overflow-hidden rounded-sm border bg-background/95 py-1 shadow-xl backdrop-blur"
          >
            {SECCIONES.map((s) => {
              const activa = s.vistas.includes(ruta.vista)
              return (
                <a
                  key={s.href}
                  href={s.href}
                  aria-current={activa ? "page" : undefined}
                  className={cn(
                    "block px-4 py-2.5 font-serif text-lg hover:bg-accent hover:text-primary",
                    activa && "text-primary",
                  )}
                >
                  {s.texto}
                </a>
              )
            })}
          </nav>
        )}
      </div>
    </div>
  )
}
