import { useState } from "react"
import { Moon, Sun } from "lucide-react"
import { config } from "@/lib/datos"
import logo from "data-url:../assets/logo.png"

export function Cabecera() {
  const [oscuro, setOscuro] = useState(() => document.documentElement.classList.contains("dark"))

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

  return (
    <header className="sticky top-0 z-30 border-b bg-background/92 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <a href="#/" className="foco flex items-center gap-2.5 rounded-sm">
          <img src={logo} alt={config.archivo.sigla} className="h-9 w-auto dark:invert" />
          <span className="hidden text-sm leading-tight text-muted-foreground lg:inline">
            Archivo Fotográfico
            <br />
            <span className="text-xs">El Fogón de los Arrieros</span>
          </span>
        </a>

        <div className="flex items-center gap-1">
          <a
            href="#/acerca"
            className="foco rounded-sm px-2.5 py-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            Acerca
          </a>
          <button
            type="button"
            onClick={alternarTema}
            aria-label={oscuro ? "Usar tema claro" : "Usar tema oscuro"}
            className="foco rounded-sm p-2 text-muted-foreground hover:text-foreground"
          >
            {oscuro ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  )
}
