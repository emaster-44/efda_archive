import { useState } from "react"
import { cn } from "@/lib/utils"
import { urlImagen, type Foto } from "@/lib/datos"

interface Props {
  foto: Foto
  lado?: "anverso" | "reverso"
  ancho: number
  className?: string
  contener?: boolean
  alt?: string
}

/** Imagen con reserva tipográfica: si no hay URL o falla la carga, muestra la signatura. */
export function Imagen({ foto, lado = "anverso", ancho, className, contener, alt }: Props) {
  const src = urlImagen(foto, lado, ancho)
  const [error, setError] = useState(false)
  const [cargada, setCargada] = useState(false)

  if (!src || error) {
    return (
      <div
        className={cn(
          "flex h-full w-full flex-col items-center justify-center gap-1 bg-[hsl(var(--placa))] p-3 text-center",
          className,
        )}
        role="img"
        aria-label={`${foto.id}: imagen no disponible`}
      >
        <span className="signatura text-muted-foreground">{foto.id}</span>
        <span className="text-[0.68rem] leading-tight text-muted-foreground/80">
          {lado === "reverso" ? "reverso" : "imagen"} no disponible
        </span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt ?? `${foto.titulo} (${foto.id}, ${lado})`}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setError(true)}
      onLoad={() => setCargada(true)}
      className={cn(
        "h-full w-full bg-[hsl(var(--placa))] transition-opacity duration-300",
        contener ? "object-contain" : "object-cover",
        cargada ? "opacity-100" : "opacity-0",
        className,
      )}
    />
  )
}
