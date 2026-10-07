import { useEffect, useMemo, useRef } from "react"
import { useRuta, type Ruta } from "@/lib/ruta"
import { consultaDesdeParams } from "@/lib/busqueda"
import { cajaDeSobre, cajaPorId, config, fotoPorId, tituloVisible } from "@/lib/datos"
import { Cabecera } from "@/components/Cabecera"
import logo from "data-url:./assets/logo.png"
import nedim from "data-url:./assets/nedim.png"
import { Inicio } from "@/vistas/Inicio"
import { Buscar } from "@/vistas/Buscar"
import { Cajas, VistaCaja, VistaSobre, VistaSobres, NoEncontrado } from "@/vistas/Cajas"
import { Indice } from "@/vistas/Indice"
import { Ficha } from "@/vistas/Ficha"
import { Acerca } from "@/vistas/Acerca"

const SITIO = "Archivo Fotográfico El Fogón de los Arrieros"

/** Título del documento por vista (WCAG 2.4.2). */
function tituloDocumento(r: Ruta): string {
  const parte = (() => {
    switch (r.vista) {
      case "":
        return ""
      case "buscar": {
        const q = r.params.get("q")
        return q ? `«${q}» · Buscar` : "Buscar en el fondo"
      }
      case "cajas":
        return "Cajas"
      case "sobres":
        return "Sobres"
      case "caja": {
        const c = cajaPorId.get(r.arg)
        return c ? `Caja ${c.numero} · ${c.etiqueta}` : "No encontrado"
      }
      case "sobre": {
        const c = cajaDeSobre.get(r.arg)
        return c ? `Sobre ${r.arg} · Caja ${c.numero}` : "No encontrado"
      }
      case "foto": {
        const f = fotoPorId.get(r.arg)
        return f ? `${tituloVisible(f)} · ${f.id}` : "No encontrado"
      }
      case "indice":
        return "Índice manuscrito"
      case "acerca":
        return "Acerca"
      default:
        return "No encontrado"
    }
  })()
  return parte ? `${parte} · ${SITIO}` : SITIO
}

export default function App() {
  const ruta = useRuta()
  const consulta = useMemo(() => consultaDesdeParams(ruta.params), [ruta.params])
  const primera = useRef(true)

  useEffect(() => {
    if (ruta.vista !== "foto") window.scrollTo({ top: 0 })
  }, [ruta.vista, ruta.arg])

  // Título por vista y, tras navegar, foco en el h1 para que lectores de pantalla anuncien el cambio
  useEffect(() => {
    document.title = tituloDocumento(ruta)
    if (primera.current) {
      primera.current = false
      return
    }
    const id = requestAnimationFrame(() => {
      const h1 = document.querySelector<HTMLElement>("#contenido h1")
      if (!h1) return
      h1.setAttribute("tabindex", "-1")
      h1.focus({ preventScroll: true })
    })
    return () => cancelAnimationFrame(id)
  }, [ruta])

  // El enlace de salto no debe tocar el hash: el router lo interpretaría como una vista
  const saltar = (e: React.MouseEvent) => {
    e.preventDefault()
    const main = document.getElementById("contenido")
    main?.focus()
    main?.scrollIntoView()
  }

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

  const pie = "rounded-sm text-sm text-muted-foreground hover:text-primary foco"

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#contenido"
        onClick={saltar}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-2 focus:z-50 focus:rounded-sm focus:bg-card focus:px-3 focus:py-2 focus:shadow-lg"
      >
        Saltar al contenido
      </a>
      <Cabecera />
      {/* En la portada el hero llega hasta arriba; en el resto se deja lugar para la barra fija */}
      <main id="contenido" tabIndex={-1} className={ruta.vista === "" ? "flex-1 outline-none" : "flex-1 pt-14 outline-none"}>
        {vista}
      </main>
      <footer className={ruta.vista === "" ? "border-t" : "mt-16 border-t"}>
        <div className="grid gap-8 px-4 py-8 md:grid-cols-[1fr_auto_auto] md:items-start md:px-10">
          <div className="space-y-2">
            <a href="#/" className="foco inline-flex items-center gap-3 rounded-sm">
              <img src={logo} alt="" className="h-10 w-auto dark:invert" />
              <span className="font-serif text-base">Fundación El Fogón de los Arrieros</span>
            </a>
            <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
              Prototipo de consulta · Proyecto SGCyT-UNNE. Metadatos bajo licencia {config.archivo.licencia_metadatos};
              las imágenes conservan los derechos de sus titulares.
            </p>
          </div>
          <nav aria-label="Pie de página">
            <ul className="space-y-1.5">
              <li><a href="#/buscar" className={pie}>Buscar</a></li>
              <li><a href="#/cajas" className={pie}>Explorar el fondo</a></li>
              <li><a href="#/indice" className={pie}>Índice manuscrito</a></li>
              <li><a href="#/acerca" className={pie}>Acerca y cómo citar</a></li>
            </ul>
          </nav>
          {/* PNG con fondo blanco: multiply lo funde con el papel; en oscuro, invert + screen lo funde con la tinta */}
          <img
            src={nedim}
            alt="NEDIM · Núcleo de Estudios y Documentación de la Imagen"
            className="h-10 w-auto mix-blend-multiply md:h-12 dark:mix-blend-screen dark:invert dark:hue-rotate-180"
          />
        </div>
      </footer>
    </div>
  )
}
