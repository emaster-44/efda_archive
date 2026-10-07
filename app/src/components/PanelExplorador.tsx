import { cajaPorId, cajas, estadisticas, sobresEnOrden } from "@/lib/datos"
import { enlace } from "@/lib/ruta"
import { cn } from "@/lib/utils"

const n = (x: number) => x.toLocaleString("es-AR")

export type Nivel = "cajas" | "sobres" | "fotografias"

export interface Miga {
  texto: string
  href?: string
  mono?: boolean
}

/** Migas de pan únicas para todo el explorador: Fondo fotográfico › Caja › Sobre › Fotografía. */
export function Migas({ items, className }: { items: Miga[]; className?: string }) {
  return (
    <nav aria-label="Ubicación en el fondo" className={cn("text-sm text-muted-foreground", className)}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {items.map((m, i) => {
          const ultima = i === items.length - 1
          return (
            <li key={i} className="flex items-center gap-x-1.5">
              {i > 0 && <span aria-hidden>›</span>}
              {m.href && !ultima ? (
                <a href={m.href} className={cn("foco rounded-sm hover:text-primary", m.mono && "signatura")}>
                  {m.texto}
                </a>
              ) : (
                <span aria-current={ultima ? "page" : undefined} className={cn("text-foreground", m.mono && "signatura")}>
                  {m.texto}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/** Migas para una caja / sobre / fotografía. */
export function migasDe({ caja, sobre, foto }: { caja?: string; sobre?: string; foto?: string }): Miga[] {
  const c = caja ? cajaPorId.get(caja) : undefined
  const items: Miga[] = [{ texto: "Fondo fotográfico", href: enlace.cajas() }]
  if (c) items.push({ texto: `Caja ${c.numero}`, href: enlace.caja(c.id) })
  if (sobre) items.push({ texto: `Sobre ${sobre}`, href: enlace.sobre(sobre) })
  if (foto) items.push({ texto: foto, mono: true })
  return items
}

/**
 * Encabezado del explorador:
 * 1. Migas (si hay caja o sobre abiertos).
 * 2. Los tres niveles del fondo como vistas alternativas; se marca solo la vista exacta.
 * 3. Título visible de la vista.
 */
export function CabeceraFondo({
  nivel,
  cajaActiva,
  sobreActivo,
  titulo,
  subtitulo,
}: {
  nivel?: Nivel
  cajaActiva?: string
  sobreActivo?: string
  titulo: React.ReactNode
  subtitulo?: React.ReactNode
}) {
  const niveles: { id: Nivel; href: string; texto: string }[] = [
    { id: "cajas", href: enlace.cajas(), texto: `${cajas.length} cajas` },
    { id: "sobres", href: enlace.sobres(), texto: `${n(sobresEnOrden.length)} sobres` },
    { id: "fotografias", href: enlace.buscar(), texto: `${n(estadisticas.fotos)} fotografías` },
  ]
  return (
    <header>
      {cajaActiva ? (
        <Migas items={migasDe({ caja: cajaActiva, sobre: sobreActivo })} />
      ) : (
        <nav aria-label="Niveles del fondo" className="flex flex-wrap items-center gap-x-2.5 text-sm text-muted-foreground">
          <span className="etiqueta mr-1">Ver por</span>
          {niveles.map((l, i) => (
            <span key={l.id} className="flex items-center gap-x-2.5">
              {i > 0 && <span aria-hidden>·</span>}
              <a
                href={l.href}
                aria-current={nivel === l.id ? "page" : undefined}
                className={cn(
                  "foco rounded-sm hover:text-primary",
                  nivel === l.id && "font-medium text-foreground underline decoration-primary decoration-2 underline-offset-4",
                )}
              >
                {l.texto}
              </a>
            </span>
          ))}
        </nav>
      )}
      <h1 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">{titulo}</h1>
      {subtitulo && <div className="mt-2 text-muted-foreground">{subtitulo}</div>}
    </header>
  )
}

/** Layout del explorador a todo el ancho, sin árbol lateral. */
export function PanelExplorador({
  children,
  ...cabecera
}: {
  nivel?: Nivel
  cajaActiva?: string
  sobreActivo?: string
  titulo: React.ReactNode
  subtitulo?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
      <CabeceraFondo {...cabecera} />
      <div className="mt-8 min-w-0">{children}</div>
    </div>
  )
}
