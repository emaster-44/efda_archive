import { useEffect, useRef, useState } from "react"
import { Menu, Moon, Sun, X } from "lucide-react"
import { useRuta } from "@/lib/ruta"
import { cn } from "@/lib/utils"

const SECCIONES = [
  { href: "#/buscar", texto: "Buscar", vistas: ["buscar"] },
  { href: "#/cajas", texto: "Explorar", vistas: ["cajas", "caja", "sobres", "sobre", "foto"] },
  { href: "#/indice", texto: "Índice manuscrito", vistas: ["indice"] },
  { href: "#/acerca", texto: "Acerca", vistas: ["acerca"] },
]

/**
 * Barra fija: marca a la izquierda, navegación visible desde md, tema y menú móvil a la derecha.
 * En la portada usa los tokens oscuros (va sobre el hero) y no muestra el cambio de tema,
 * porque la portada es siempre oscura.
 */
export function Cabecera() {
  const ruta = useRuta()
  const portada = ruta.vista === ""
  const [oscuro, setOscuro] = useState(() => document.documentElement.classList.contains("dark"))
  const [abierto, setAbierto] = useState(false)
  const caja = useRef<HTMLDivElement>(null)
  const botonMenu = useRef<HTMLButtonElement>(null)

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

  // Cerrar al navegar, con Escape (devolviendo el foco al botón) o con un clic afuera
  useEffect(() => setAbierto(false), [ruta.vista, ruta.arg])
  useEffect(() => {
    if (!abierto) return
    const tecla = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return
      setAbierto(false)
      botonMenu.current?.focus()
    }
    const clic = (e: MouseEvent) => caja.current && !caja.current.contains(e.target as Node) && setAbierto(false)
    document.addEventListener("keydown", tecla)
    document.addEventListener("mousedown", clic)
    return () => {
      document.removeEventListener("keydown", tecla)
      document.removeEventListener("mousedown", clic)
    }
  }, [abierto])

  const boton =
    "foco flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-foreground hover:border-primary hover:text-primary"

  return (
    <header
      ref={caja}
      className={cn(
        "fixed inset-x-0 top-0 z-40 text-foreground",
        portada ? "dark bg-gradient-to-b from-black/60 to-transparent" : "border-b bg-background/90 backdrop-blur",
      )}
    >
      <div className="flex h-14 items-center justify-between gap-4 px-4 md:px-10">
        <a href="#/" className="foco flex items-baseline gap-2 rounded-sm">
          <span className="font-serif text-lg font-semibold leading-none">Archivo Fogón</span>
          <span className="etiqueta hidden sm:inline">Fondo fotográfico</span>
        </a>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {SECCIONES.map((s) => {
              const activa = s.vistas.includes(ruta.vista)
              return (
                <li key={s.href}>
                  <a
                    href={s.href}
                    aria-current={activa ? "page" : undefined}
                    className={cn(
                      "foco rounded-sm px-3 py-2 text-sm hover:text-primary",
                      activa ? "font-medium text-primary underline decoration-2 underline-offset-[6px]" : "text-muted-foreground",
                    )}
                  >
                    {s.texto}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {!portada && (
            <button type="button" onClick={alternarTema} aria-label={oscuro ? "Usar tema claro" : "Usar tema oscuro"} className={boton}>
              {oscuro ? <Sun className="h-4 w-4" aria-hidden /> : <Moon className="h-4 w-4" aria-hidden />}
            </button>
          )}
          <div className="relative md:hidden">
            <button
              ref={botonMenu}
              type="button"
              onClick={() => setAbierto((a) => !a)}
              aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={abierto}
              aria-controls="menu-principal"
              className={boton}
            >
              {abierto ? <X className="h-4 w-4" aria-hidden /> : <Menu className="h-4 w-4" aria-hidden />}
            </button>
            {abierto && (
              <nav
                id="menu-principal"
                aria-label="Principal (móvil)"
                className="absolute right-0 top-12 w-56 overflow-hidden rounded-sm border bg-background py-1 shadow-xl"
              >
                {[{ href: "#/", texto: "Inicio", vistas: [""] }, ...SECCIONES].map((s) => {
                  const activa = s.vistas.includes(ruta.vista)
                  return (
                    <a
                      key={s.href}
                      href={s.href}
                      aria-current={activa ? "page" : undefined}
                      className={cn(
                        "foco block px-4 py-2.5 font-serif text-lg hover:bg-accent hover:text-primary",
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
      </div>
    </header>
  )
}
