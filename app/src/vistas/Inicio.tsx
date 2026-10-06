import { ArrowRight } from "lucide-react"
import { cajas, estadisticas, fotoPorId, fotosPorSobre, indice } from "@/lib/datos"
import { enlace } from "@/lib/ruta"
import { paramsDesdeConsulta } from "@/lib/busqueda"
import { Imagen } from "@/components/Imagen"

const ACCESOS = [
  { etiqueta: "Teatro", q: "teatro" },
  { etiqueta: "Mena", q: "mena" },
  { etiqueta: "Aldo Boglietti", q: "aldo" },
  { etiqueta: "Visitas", q: "visita" },
  { etiqueta: "Hilda Torres Varela", q: "hilda" },
]

export function Inicio() {
  // Una fotografía por caja, en el orden del fondo
  const portada = cajas
    .map((c) => ({ caja: c, foto: fotosPorSobre.get(c.sobres[0]?.id)?.[0] }))
    .filter((d) => d.foto)
    .slice(0, 6)
  const muestraIndice = indice.slice(0, 12)

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
            <div className="mt-7 flex flex-wrap gap-2">
              {ACCESOS.map((a) => (
                <a
                  key={a.q}
                  href={enlace.buscar(paramsDesdeConsulta({ q: a.q }))}
                  className="foco rounded-sm border bg-card px-3 py-1.5 text-sm hover:border-primary hover:text-primary"
                >
                  {a.etiqueta}
                </a>
              ))}
              <a
                href="#/buscar"
                className="foco rounded-sm border border-primary bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:opacity-90"
              >
                Explorar todo el fondo
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

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border bg-border md:grid-cols-4">
          {[
            [estadisticas.seleccion ? "Fotografías en el piloto" : "Fotografías", estadisticas.seleccion ? `${estadisticas.fotos} / ${estadisticas.inventario.toLocaleString("es-AR")}` : estadisticas.fotos],
            ["Cajas · sobres", `${estadisticas.cajas} · ${estadisticas.sobres}`],
            ["Con reverso digitalizado", estadisticas.reversos],
            ["Fichas catalogadas", estadisticas.catalogadas],
          ].map(([k, v]) => (
            <div key={k} className="bg-card px-5 py-4">
              <dt className="etiqueta">{k}</dt>
              <dd className="mt-1 font-serif text-3xl tabular-nums">
                {typeof v === "number" ? v.toLocaleString("es-AR") : v}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 md:grid-cols-[1fr_1.3fr] md:px-6">
        <div>
          <p className="etiqueta">Fuente descriptiva</p>
          <h2 className="mt-2 text-2xl font-semibold">El índice manuscrito</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            El archivo conserva un <em>Índice Fotografías</em> escrito a mano: personas, visitas, funciones de
            teatro, homenajes. Cada entrada corresponde a un sobre (la entrada N describe el sobre SN) y sus
            fotografías toman de allí su título atribuido, entre corchetes.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Entradas con sobre en el fondo: {estadisticas.vinculadasIndice} de {estadisticas.entradasIndice}.
          </p>
          <a href="#/indice" className="foco mt-5 inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-primary hover:underline">
            Ver el índice completo <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <ol className="rounded-sm border bg-card px-5 py-3 font-serif">
          {muestraIndice.map((e) => {
            const foto = e.fotos[0] ? fotoPorId.get(e.fotos[0]) : undefined
            return (
              <li key={e.n} className="renglon">
                <a
                  href={foto ? enlace.sobre(e.sobres[0]) : "#/indice"}
                  className="flex items-baseline gap-3 py-1.5 hover:text-primary"
                >
                  <span className="w-8 shrink-0 text-right font-mono text-xs tabular-nums text-muted-foreground">{e.n}</span>
                  <span className="flex-1 italic">{e.titulo}</span>
                  {foto && <span className="signatura text-xs text-primary">{e.sobres[0]} · {e.fotos.length}</span>}
                </a>
              </li>
            )
          })}
          <li className="py-2 pl-11 text-sm text-muted-foreground">
            <a href="#/indice" className="hover:text-primary">… y {indice.length - muestraIndice.length} entradas más</a>
          </li>
        </ol>
      </section>
    </div>
  )
}
