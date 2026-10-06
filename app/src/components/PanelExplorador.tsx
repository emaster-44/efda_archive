import { cajaPorId, cajas, config, estadisticas, sobresEnOrden } from "@/lib/datos"
import { enlace } from "@/lib/ruta"
import { cn } from "@/lib/utils"

const n = (x: number) => x.toLocaleString("es-AR")

export type Nivel = "cajas" | "sobres" | "fotografias"

/**
 * Encabezado del explorador:
 * 1. Título del archivo (vuelve a la portada).
 * 2. Los tres niveles del fondo, cada uno navegable.
 * 3. Si hay una caja abierta, su ubicación centrada debajo.
 */
export function CabeceraFondo({ nivel, cajaActiva, sobreActivo }: { nivel?: Nivel; cajaActiva?: string; sobreActivo?: string }) {
  const c = cajaActiva ? cajaPorId.get(cajaActiva) : undefined
  const niveles: { id: Nivel; href: string; texto: string }[] = [
    { id: "cajas", href: enlace.cajas(), texto: `${cajas.length} cajas` },
    { id: "sobres", href: enlace.sobres(), texto: `${n(sobresEnOrden.length)} sobres` },
    { id: "fotografias", href: enlace.buscar(), texto: `${n(estadisticas.fotos)} fotografías` },
  ]
  return (
    <header className="text-center">
      <a href="#/" className="etiqueta foco rounded-sm hover:text-primary">
        {config.archivo.nombre}
      </a>
      <nav aria-label="Niveles del fondo" className="mt-2 flex flex-wrap items-center justify-center gap-x-2.5 text-sm text-muted-foreground">
        {niveles.map((l, i) => (
          <span key={l.id} className="flex items-center gap-x-2.5">
            {i > 0 && <span aria-hidden>·</span>}
            <a
              href={l.href}
              aria-current={nivel === l.id ? "page" : undefined}
              className={cn("foco rounded-sm hover:text-primary", nivel === l.id && "text-foreground underline underline-offset-4")}
            >
              {l.texto}
            </a>
          </span>
        ))}
      </nav>
      {c ? (
        <h1 className="mt-6 font-serif text-xl uppercase tracking-[0.18em] md:text-2xl">
          {sobreActivo ? (
            <a href={enlace.caja(c.id)} className="hover:text-primary">Caja {c.numero}</a>
          ) : (
            <>Caja {c.numero}</>
          )}
          <span className="mx-3 text-muted-foreground" aria-hidden>·</span>
          {sobreActivo ? `Sobre ${sobreActivo}` : c.etiqueta}
        </h1>
      ) : (
        <h1 className="sr-only">
          {nivel === "sobres" ? "Sobres del fondo fotográfico" : nivel === "fotografias" ? "Fotografías del fondo" : "Cajas del fondo fotográfico"}
        </h1>
      )}
    </header>
  )
}

/** Layout del explorador a todo el ancho, sin árbol lateral. */
export function PanelExplorador({
  nivel,
  cajaActiva,
  sobreActivo,
  children,
}: {
  nivel?: Nivel
  cajaActiva?: string
  sobreActivo?: string
  children: React.ReactNode
}) {
  return (
    <div className="px-4 py-8 md:px-10 md:py-10">
      <CabeceraFondo nivel={nivel} cajaActiva={cajaActiva} sobreActivo={sobreActivo} />
      <div className="mt-10 min-w-0">{children}</div>
    </div>
  )
}
