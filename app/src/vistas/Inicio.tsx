import { useState } from "react"
import { Search } from "lucide-react"
import { cajas, estadisticas, fotosPorSobre } from "@/lib/datos"
import { enlace, ir } from "@/lib/ruta"
import { paramsDesdeConsulta } from "@/lib/busqueda"
import { Imagen } from "@/components/Imagen"

export function Inicio() {
  const [texto, setTexto] = useState("")

  // Una fotografía por caja, en el orden del fondo
  const portada = cajas
    .map((c) => ({ caja: c, foto: fotosPorSobre.get(c.sobres[0]?.id)?.[0] }))
    .filter((d) => d.foto)
    .slice(0, 6)

  const enviar = (e: React.FormEvent) => {
    e.preventDefault()
    ir(enlace.buscar(paramsDesdeConsulta({ q: texto.trim() })))
  }

  return (
    <div>
      <section className="border-b">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1.15fr_1fr] md:px-6 md:py-16">
          <div className="flex flex-col justify-center">
            <p className="etiqueta">Fondo de consulta · Prototipo</p>
            <h1 className="mt-3 text-4xl font-semibold leading-[1.08] tracking-tight md:text-[3.25rem]">
              Archivo fotográfico de <em className="font-normal text-primary">El Fogón de los Arrieros</em>
            </h1>
            <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-muted-foreground">
              {estadisticas.seleccion ? (
                <>
                  Selección piloto: {estadisticas.fotos.toLocaleString("es-AR")} fotografías con título o datos
                  manuscritos del reverso, de las {estadisticas.inventario.toLocaleString("es-AR")} inventariadas
                  en {estadisticas.cajas} cajas.
                </>
              ) : (
                <>
                  {estadisticas.fotos.toLocaleString("es-AR")} fotografías conservadas en {estadisticas.cajas} cajas
                  y {estadisticas.sobres} sobres.
                </>
              )}{" "}
              Cada fotografía tiene su ficha, su signatura y una cita lista para usar en investigación.
            </p>
            <div className="mt-7 flex items-center gap-3">
              <form onSubmit={enviar} role="search" className="max-w-md flex-1">
                <label htmlFor="busqueda" className="sr-only">
                  Buscar en el fondo
                </label>
                <div className="flex h-10 items-center rounded-sm border border-input bg-card focus-within:ring-2 focus-within:ring-ring">
                  <Search className="ml-3 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                  <input
                    id="busqueda"
                    type="search"
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    placeholder="Fogoneros, artistas, eventos, obras, fechas…"
                    className="h-full w-full min-w-0 bg-transparent px-2.5 text-sm outline-none placeholder:text-muted-foreground/70"
                  />
                  <button
                    type="submit"
                    className="h-full shrink-0 border-l px-3.5 text-sm font-medium text-primary hover:bg-accent"
                  >
                    Buscar
                  </button>
                </div>
              </form>
              <a
                href={enlace.cajas()}
                className="foco shrink-0 rounded-sm border border-primary bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:opacity-90"
              >
                Explorar
              </a>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 self-center">
            {portada.map(({ caja, foto }, i) => (
              <a
                key={caja.id}
                href={enlace.caja(caja.id)}
                className={`foco group relative overflow-hidden rounded-sm border ${i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"}`}
              >
                <Imagen foto={foto!} ancho={i === 0 ? 800 : 400} className="transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-2 pb-1.5 pt-6 text-left text-[0.72rem] leading-tight text-white">
                  <span className="signatura opacity-90">Caja {caja.numero}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
