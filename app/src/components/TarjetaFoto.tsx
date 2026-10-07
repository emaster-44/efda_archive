import { Imagen } from "./Imagen"
import { enlace } from "@/lib/ruta"
import { config, fechaLegible, nombreCaja, portadas, tituloVisible, type Foto } from "@/lib/datos"

/**
 * Dentro de un sobre, el título heredado del índice es el mismo para todas las fotos:
 * se reemplaza por lo que distingue a cada una (leyenda del reverso, personas o posición).
 */
function principalEnSobre(f: Foto): { texto: string; tenue?: boolean } {
  if (portadas.has(f.id)) return { texto: "Escaneo del sobre", tenue: true }
  if (f.titulo_fuente !== "indice") return { texto: tituloVisible(f) }
  if (f.leyenda_reverso) return { texto: f.leyenda_reverso }
  if (f.personas?.length) return { texto: f.personas.join(", ") }
  return { texto: `Fotografía n.º ${f.numero ?? "—"}`, tenue: true }
}

export function TarjetaFoto({ foto, enSobre = false }: { foto: Foto; enSobre?: boolean }) {
  const principal = enSobre ? principalEnSobre(foto) : { texto: tituloVisible(foto), tenue: foto.sin_titulo }
  return (
    <a href={enlace.foto(foto.id)} className="foco group flex flex-col rounded-sm">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm border bg-card">
        <Imagen
          foto={foto}
          ancho={config.imagenes.ancho_miniatura}
          decorativa
          className="transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {foto.reverso && (
          <span className="absolute right-1.5 top-1.5 rounded-sm bg-background/90 px-1.5 py-0.5 text-[0.65rem] font-medium text-foreground backdrop-blur">
            Con reverso
          </span>
        )}
      </div>
      <div className="mt-2 space-y-0.5 px-0.5">
        <p className="signatura text-muted-foreground">{foto.id}</p>
        <p className="line-clamp-2 font-serif text-[0.95rem] leading-snug group-hover:text-primary">
          {principal.tenue ? <span className="italic text-muted-foreground">{principal.texto}</span> : principal.texto}
        </p>
        {!enSobre && foto.titulo_fuente === "indice" && foto.leyenda_reverso && (
          <p className="line-clamp-2 text-xs leading-snug text-foreground/80">{foto.leyenda_reverso}</p>
        )}
        <p className="text-xs text-muted-foreground">
          {!enSobre && <>{nombreCaja(foto.caja)} · {foto.sobre} · </>}
          {fechaLegible(foto)}
        </p>
      </div>
    </a>
  )
}

export function Grilla({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {children}
    </div>
  )
}
