import { useEffect, useState } from "react"
import { ChevronRight } from "lucide-react"
import { cajas } from "@/lib/datos"
import { cn } from "@/lib/utils"
import { enlace, ir } from "@/lib/ruta"

interface Props {
  /** Id de la caja actualmente abierta (si estamos en #/caja/:id o #/sobre/:id). */
  cajaActiva?: string
  /** Id del sobre actualmente seleccionado (si estamos en #/sobre/:id). */
  sobreActivo?: string
}

/** Árbol de directorios Caja › Sobre, estilo explorador de archivos. Una sola caja abierta a la vez. */
export function ArbolExplorador({ cajaActiva, sobreActivo }: Props) {
  const [abierta, setAbierta] = useState<string | undefined>(cajaActiva)

  useEffect(() => {
    setAbierta(cajaActiva)
  }, [cajaActiva])

  return (
    <nav aria-label="Árbol de cajas y sobres" className="text-sm">
      <a
        href={enlace.cajas()}
        className={cn(
          "foco mb-1 block rounded-sm px-2 py-1.5 font-semibold hover:text-primary",
          !cajaActiva && "text-primary",
        )}
      >
        Cajas
      </a>
      <ul className="space-y-0.5">
        {cajas.map((c) => {
          const expandida = abierta === c.id
          const activa = cajaActiva === c.id
          return (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => {
                  setAbierta(expandida ? undefined : c.id)
                  ir(enlace.caja(c.id))
                }}
                className={cn(
                  "foco flex w-full items-center gap-1.5 rounded-sm px-2 py-1.5 text-left hover:bg-accent",
                  activa && !sobreActivo && "bg-accent font-medium text-primary",
                )}
              >
                <ChevronRight
                  className={cn("h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform", expandida && "rotate-90")}
                  aria-hidden
                />
                <span className="truncate">Caja {c.numero}</span>
              </button>
              {expandida && (
                <ul className="ml-[0.9rem] space-y-0.5 border-l pl-2.5">
                  {c.sobres.map((s) => (
                    <li key={s.id}>
                      <a
                        href={enlace.sobre(s.id)}
                        aria-current={sobreActivo === s.id ? "page" : undefined}
                        className={cn(
                          "signatura foco block truncate rounded-sm px-2 py-1 hover:bg-accent hover:text-primary",
                          sobreActivo === s.id && "bg-accent font-medium text-primary",
                        )}
                      >
                        {s.id}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
