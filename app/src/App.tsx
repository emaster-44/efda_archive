import { useEffect, useMemo } from "react"
import { useRuta } from "@/lib/ruta"
import { config } from "@/lib/datos"
import { consultaDesdeParams } from "@/lib/busqueda"
import { Cabecera } from "@/components/Cabecera"
import { Inicio } from "@/vistas/Inicio"
import { Buscar } from "@/vistas/Buscar"
import { Cajas, VistaCaja, VistaSobre, NoEncontrado } from "@/vistas/Cajas"
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
    case "sobres":
      vista = <Cajas />
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
      <main id="contenido" className="flex-1">
        {vista}
      </main>
      <footer className="mt-16 border-t">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-6 text-xs text-muted-foreground md:flex-row md:justify-between md:px-6">
          <span>{config.archivo.institucion}</span>
          <span>Prototipo de investigación · Proyecto SGCyT-UNNE</span>
        </div>
      </footer>
    </div>
  )
}
