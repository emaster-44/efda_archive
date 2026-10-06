import { Imagen } from "./Imagen"
import { enlace } from "@/lib/ruta"
import { config, fechaLegible, numeroSobre, type Foto } from "@/lib/datos"

export function TarjetaFoto({ foto, mostrarSobre = true }: { foto: Foto; mostrarSobre?: boolean }) {
  return (
    <a
      href={enlace.foto(foto.id)}
      className="foco group flex flex-col rounded-sm"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm border bg-card">
        <Imagen
          foto={foto}
          ancho={config.imagenes.ancho_miniatura}
          className="transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {foto.reverso && (
          <span className="absolute right-1.5 top-1.5 rounded-sm bg-background/85 px-1.5 py-0.5 text-[0.62rem] font-medium uppercase tracking-wider text-muted-foreground backdrop-blur">
            a/r
          </span>
        )}
      </div>
      <div className="mt-2 space-y-0.5 px-0.5">
        <p className="signatura text-muted-foreground">{foto.id.replace("EFDA-F-", "")}</p>
        <p className="line-clamp-2 font-serif text-[0.95rem] leading-snug group-hover:text-primary">
          {foto.titulo_atribuido ? <span className="text-muted-foreground">[</span> : null}
          {foto.titulo}
          {foto.titulo_atribuido ? <span className="text-muted-foreground">]</span> : null}
        </p>
        <p className="text-xs text-muted-foreground">
          {mostrarSobre && <>Sobre {numeroSobre(foto.sobre)} · </>}
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
