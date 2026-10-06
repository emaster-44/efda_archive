import { useEffect, useState } from "react"

export interface Ruta {
  vista: string
  arg: string
  params: URLSearchParams
}

function leer(): Ruta {
  const h = decodeURI(window.location.hash.replace(/^#\/?/, ""))
  const [camino, query = ""] = h.split("?")
  const [vista = "", ...resto] = camino.split("/")
  return { vista, arg: resto.join("/"), params: new URLSearchParams(query) }
}

export function useRuta() {
  const [ruta, setRuta] = useState(leer)
  useEffect(() => {
    const cambio = () => {
      setRuta(leer())
    }
    window.addEventListener("hashchange", cambio)
    return () => window.removeEventListener("hashchange", cambio)
  }, [])
  return ruta
}

export function ir(destino: string) {
  window.location.hash = destino.startsWith("#") ? destino : `#/${destino.replace(/^\//, "")}`
}

export const enlace = {
  foto: (id: string) => `#/foto/${id}`,
  sobre: (id: string) => `#/sobre/${id}`,
  caja: (id: string) => `#/caja/${id}`,
  buscar: (qs = "") => `#/buscar${qs ? "?" + qs : ""}`,
}
