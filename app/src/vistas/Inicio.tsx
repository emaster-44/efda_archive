import { ArrowRight } from "lucide-react"
import { config, estadisticas, fotosPorSobre, numeroSobre, sobres } from "@/lib/datos"
import { enlace } from "@/lib/ruta"
import { paramsDesdeConsulta } from "@/lib/busqueda"
import { Imagen } from "@/components/Imagen"

const ACCESOS = [
  { etiqueta: "Teatro", q: "teatro" },
  { etiqueta: "Homenajes a Mena", q: "homenaje mena" },
  { etiqueta: "El edificio", q: "edificio" },
  { etiqueta: "Aldo Boglietti", q: "aldo" },
  { etiqueta: "Visitas", q: "visita" },
  { etiqueta: "Murales", q: "mural" },
]

// Sobres del índice con los que se abre el recorrido de portada
const DESTACADOS = ["S001", "S030", "S035", "S056", "S081", "S097"]

export function Inicio() {
  const destacados = DESTACADOS.map((id) => ({ id, foto: fotosPorSobre.get(id)?.[0] })).filter(
    (d) => d.foto,
  )
  const indiceMuestra = sobres.slice(0, 14)

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
              {estadisticas.fotos.toLocaleString("es-AR")} fotografías organizadas en {estadisticas.sobres} sobres,
              según el índice manuscrito original del archivo. Cada imagen tiene su ficha, su signatura
              estable y una cita lista para usar en investigación.
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
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 self-center">
            {destacados.map(({ id, foto }, i) => (
              <a
                key={id}
                href={enlace.sobre(id)}
                className={`foco group relative overflow-hidden rounded-sm border ${i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"}`}
              >
                <Imagen foto={foto!} ancho={i === 0 ? 800 : 400} className="transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-2 pb-1.5 pt-6 text-left text-[0.72rem] leading-tight text-white">
                  <span className="signatura opacity-80">Sobre {numeroSobre(id)}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border bg-border md:grid-cols-4">
          {[
            ["Fotografías", estadisticas.fotos],
            ["Sobres digitalizados", estadisticas.sobres],
            ["Con reverso digitalizado", estadisticas.reversos],
            ["Fichas catalogadas", estadisticas.catalogadas],
          ].map(([k, v]) => (
            <div key={k} className="bg-card px-5 py-4">
              <dt className="etiqueta">{k}</dt>
              <dd className="mt-1 font-serif text-3xl tabular-nums">{Number(v).toLocaleString("es-AR")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 md:grid-cols-[1fr_1.3fr] md:px-6">
        <div>
          <p className="etiqueta">Orden original</p>
          <h2 className="mt-2 text-2xl font-semibold">El índice manuscrito como puerta de entrada</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            El archivo conserva un <em>Índice Fotografías</em> escrito a mano que asigna a cada sobre un tema,
            una persona o un acontecimiento. El prototipo respeta ese orden: los títulos de las fichas
            todavía no catalogadas se toman de ese índice y se muestran entre corchetes, como títulos
            atribuidos.
          </p>
          <a href="#/sobres" className="foco mt-5 inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-primary hover:underline">
            Ver el índice completo <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <ol className="rounded-sm border bg-card px-5 py-3 font-serif">
          {indiceMuestra.map((s) => (
            <li key={s.id} className="renglon">
              <a
                href={s.faltante ? undefined : enlace.sobre(s.id)}
                className={`flex items-baseline gap-3 py-1.5 ${s.faltante ? "text-muted-foreground" : "hover:text-primary"}`}
              >
                <span className="w-8 shrink-0 text-right font-mono text-xs tabular-nums text-muted-foreground">
                  {numeroSobre(s.id)}
                </span>
                <span className="flex-1 italic">{s.titulo || "—"}</span>
                <span className="text-xs tabular-nums text-muted-foreground">{s.faltante ? "falta" : s.cantidad}</span>
              </a>
            </li>
          ))}
          <li className="py-2 pl-11 text-sm text-muted-foreground">
            <a href="#/sobres" className="hover:text-primary">… y {sobres.length - indiceMuestra.length} sobres más</a>
          </li>
        </ol>
      </section>

      <p className="sr-only">{config.archivo.proyecto}</p>
    </div>
  )
}
