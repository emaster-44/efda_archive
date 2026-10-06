import { useEffect, useMemo } from "react"
import { useRuta } from "@/lib/ruta"
import { consultaDesdeParams } from "@/lib/busqueda"
import { Cabecera } from "@/components/Cabecera"
import logo from "@/assets/logo.png"
import nedim from "@/assets/nedim.png"
import { Inicio } from "@/vistas/Inicio"
import { Buscar } from "@/vistas/Buscar"
import { Cajas, VistaCaja, VistaSobre, VistaSobres, NoEncontrado } from "@/vistas/Cajas"
import { Indice } from "@/vistas/Indice"
import { Ficha } from "@/vistas/Ficha"
import { Acerca } from "@/vistas/Acerca"

export default function App() {
  const ruta = useRuta()
  const consulta = useMemo(() => consultaDesdeParams(ruta.params), [ruta.params])

  useEffect(() => {
    if (ruta.vista !== "foto") window.scrollTo({ top: 0 })
  }, [ruta.vista, ruta.arg])

  let vista: React.ReactNode
  switch (ruta.vista) {
    case "":
      vista = <Inicio />
      break
    case "buscar":
      vista = <Buscar consulta={consulta} />
      break
    case "cajas":
      vista = <Cajas />
      break
    case "sobres":
      vista = <VistaSobres />
      break
    case "caja":
      vista = <VistaCaja id={ruta.arg} />
      break
    case "indice":
      vista = <Indice />
      break
    case "sobre":
      vista = <VistaSobre id={ruta.arg} />
      break
    case "foto":
      vista = <Ficha id={ruta.arg} />
      break
    case "acerca":
      vista = <Acerca />
      break
    default:
      vista = <NoEncontrado que="esta página" />
  }

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:bg-card focus:px-3 focus:py-2">
        Saltar al contenido
      </a>
      <Cabecera />
      {/* En la portada el hero llega hasta arriba; en el resto se deja aire para los controles flotantes */}
      <main id="contenido" className={ruta.vista === "" ? "flex-1" : "flex-1 pt-14"}>
        {vista}
      </main>
      <footer className={ruta.vista === "" ? "border-t" : "mt-16 border-t"}>
        <div className="flex flex-wrap items-center justify-between gap-6 px-4 py-6 md:px-10">
          <a href="#/" className="foco flex items-center gap-3 rounded-sm">
            <img src={logo} alt="" className="h-10 w-auto dark:invert" />
            <span className="text-sm text-muted-foreground">Fundación El Fogón de los Arrieros</span>
          </a>
          <img
            src={nedim}
            alt="NEDIM · Núcleo de Estudios y Documentación de la Imagen"
            className="h-10 w-auto md:h-12 dark:invert dark:hue-rotate-180"
          />
        </div>
      </footer>
    </div>
  )
}
