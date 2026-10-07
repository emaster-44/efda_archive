import { useEffect, useRef, useState } from "react"
import { cajas, fotos, urlImagen, type Foto } from "@/lib/datos"

/** Fotos sobre la mesa: cuántas a la vez y cada cuánto cae una nueva arriba de la pila. */
const VISIBLES = 30
const ANCHO_IMG = 400
const INTERVALO_MS = 1800
const SALIDA_MS = 1400

/** Las portadas de sobre (n.º 1 de cada sobre) son el escaneo del sobre: quedan fuera del fondo. */
const portadas = new Set(cajas.flatMap((c) => c.sobres.map((s) => s.portada)))
const candidatas = fotos.filter((f) => !portadas.has(f.id) && f.anverso)

const url = (f: Foto) => urlImagen(f, "anverso", ANCHO_IMG)
const azar = (min: number, max: number) => min + Math.random() * (max - min)

interface Copia {
  clave: number
  foto: Foto
  x: number // % del ancho
  y: number // % del alto
  giro: number // grados
  ancho: number // vw
  saliendo?: boolean
}

let siguienteClave = 0

function copia(foto: Foto, x = azar(-4, 104), y = azar(-6, 106)): Copia {
  return { clave: siguienteClave++, foto, x, y, giro: azar(-16, 16), ancho: azar(11, 19) }
}

/** Distribución inicial en una grilla con desorden, para cubrir toda la mesa desde el primer momento. */
function pilaInicial(): Copia[] {
  const cols = 6
  const filas = Math.ceil(VISIBLES / cols)
  const elegidas = [...candidatas].sort(() => Math.random() - 0.5).slice(0, VISIBLES)
  return elegidas
    .map((f, i) => {
      const c = i % cols
      const r = Math.floor(i / cols)
      return copia(f, ((c + azar(0.1, 0.9)) / cols) * 108 - 4, ((r + azar(0.1, 0.9)) / filas) * 112 - 6)
    })
    .sort(() => Math.random() - 0.5) // orden de apilado al azar
}

function Fotografia({ c }: { c: Copia }) {
  const [cargada, setCargada] = useState(false)
  const src = url(c.foto)
  if (!src) return null
  const visible = cargada && !c.saliendo
  return (
    <div
      className="absolute bg-[#ece6d8] p-[0.45vw] shadow-[0_6px_24px_rgba(0,0,0,0.55)] transition-[opacity,transform] ease-out"
      style={{
        left: `${c.x}%`,
        top: `${c.y}%`,
        width: `${c.ancho}vw`,
        minWidth: 110,
        transitionDuration: `${SALIDA_MS}ms`,
        opacity: visible ? 1 : 0,
        transform: `translate(-50%, -50%) rotate(${c.giro}deg) scale(${visible ? 1 : 1.12})`,
      }}
    >
      <img
        src={src}
        alt=""
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setCargada(true)}
        className="block h-auto w-full grayscale-[35%]"
      />
    </div>
  )
}

/** Con "reducir movimiento" activo, el fondo arranca quieto (WCAG 2.2.2 / 2.3.3). */
export const prefiereQuieto = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

/**
 * Fondo de portada: fotos amontonadas al azar, no interactivas; cae una nueva arriba y la de más abajo se retira.
 * `pausado` detiene la caída (control visible en Inicio).
 */
export function MosaicoFondo({ pausado = false }: { pausado?: boolean }) {
  const [pila, setPila] = useState<Copia[]>(pilaInicial)
  const pilaRef = useRef(pila)
  useEffect(() => {
    pilaRef.current = pila
  }, [pila])

  useEffect(() => {
    if (pausado) return
    let activo = true

    const id = window.setInterval(() => {
      if (document.hidden) return
      {
        const visibles = new Set(pilaRef.current.map((c) => c.foto.id))
        const libres = candidatas.filter((f) => !visibles.has(f.id))
        const nueva = libres[Math.floor(Math.random() * libres.length)]
        const src = nueva && url(nueva)
        if (!src) return
        // Precarga: la foto cae recién cuando ya está descargada.
        const img = new Image()
        img.referrerPolicy = "no-referrer"
        img.onload = () => {
          if (!activo) return
          setPila((p) => {
            const vigentes = p.filter((c) => !c.saliendo)
            const sobrante = vigentes.length >= VISIBLES ? vigentes[0].clave : null
            return [...p.map((c) => (c.clave === sobrante ? { ...c, saliendo: true } : c)), copia(nueva)]
          })
          window.setTimeout(() => activo && setPila((p) => p.filter((c) => !c.saliendo)), SALIDA_MS + 100)
        }
        img.src = src
      }
    }, INTERVALO_MS)

    return () => {
      activo = false
      window.clearInterval(id)
    }
  }, [pausado])

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden bg-[#0d0b0a]">
      {pila.map((c) => (
        <Fotografia key={c.clave} c={c} />
      ))}
      {/* Velo: oscurece todo y concentra la sombra en el centro, donde va el texto */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.45)_55%,rgba(0,0,0,0.15)_100%)]" />
    </div>
  )
}
