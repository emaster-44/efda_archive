import { useEffect, useState } from "react"
import { Check, ChevronLeft, ChevronRight, Copy, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { cajaPorId, config, fechaLegible, fotoPorId, fotosPorSobre, type Foto } from "@/lib/datos"
import { enlace, ir } from "@/lib/ruta"
import { citaAPA, citaBibTeX, citaChicago, urlPermanente } from "@/lib/citas"
import { Imagen } from "@/components/Imagen"
import { NoEncontrado } from "./Cajas"

export function Ficha({ id }: { id: string }) {
  const foto = fotoPorId.get(id)
  const [lado, setLado] = useState<"anverso" | "reverso">("anverso")
  const [ampliada, setAmpliada] = useState(false)

  const hermanas = foto ? fotosPorSobre.get(foto.sobre) ?? [] : []
  const pos = hermanas.findIndex((f) => f.id === id)
  const ant = hermanas[pos - 1]
  const sig = hermanas[pos + 1]

  useEffect(() => {
    setLado("anverso")
    window.scrollTo({ top: 0 })
  }, [id])

  useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || ampliada) return
      if (e.key === "ArrowLeft" && ant) ir(enlace.foto(ant.id))
      if (e.key === "ArrowRight" && sig) ir(enlace.foto(sig.id))
    }
    window.addEventListener("keydown", tecla)
    return () => window.removeEventListener("keydown", tecla)
  }, [ant, sig, ampliada])

  if (!foto) return <NoEncontrado que={`la fotografía ${id}`} />

  const pendiente = foto.estado_ficha === "pendiente"
  const caja = cajaPorId.get(foto.caja)

  return (
    <article className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <nav aria-label="Ruta" className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
        <span>
          <a href="#/cajas" className="hover:text-primary">Cajas y sobres</a> /{" "}
          <a href={enlace.caja(foto.caja)} className="hover:text-primary">Caja {caja?.numero}</a> /{" "}
          <a href={enlace.sobre(foto.sobre)} className="hover:text-primary">Sobre {foto.sobre}</a> /{" "}
          <span className="signatura">{foto.id}</span>
        </span>
        <span className="flex items-center gap-1">
          <NavFoto f={ant} dir="ant" />
          <span className="px-2 tabular-nums">{pos + 1} / {hermanas.length}</span>
          <NavFoto f={sig} dir="sig" />
        </span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        {/* Imagen */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-sm border bg-[hsl(var(--placa))] md:aspect-[5/5]">
            <Imagen foto={foto} lado={lado} ancho={config.imagenes.ancho_ficha} contener />
            <button
              type="button"
              onClick={() => setAmpliada(true)}
              className="foco absolute right-2 top-2 rounded-sm bg-background/85 p-2 backdrop-blur hover:text-primary"
              aria-label="Ampliar imagen"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <div className="inline-flex rounded-sm border p-0.5 text-sm" role="tablist" aria-label="Lado de la fotografía">
              {(["anverso", "reverso"] as const).map((l) => (
                <button
                  key={l}
                  role="tab"
                  aria-selected={lado === l}
                  onClick={() => setLado(l)}
                  className={cn(
                    "rounded-[2px] px-3 py-1 capitalize",
                    lado === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
            {!foto.reverso && <span className="text-xs text-muted-foreground">Reverso aún no digitalizado</span>}
          </div>
        </div>

        {/* Ficha */}
        <div>
          <p className="etiqueta">Fotografía · <span className="signatura normal-case tracking-normal">{foto.id}</span></p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight md:text-[2.15rem]">
            {foto.sin_titulo ? (
              <span className="font-normal italic text-muted-foreground">Sin título</span>
            ) : (
              <>
                {foto.titulo_atribuido && <span className="font-normal text-muted-foreground">[</span>}
                {foto.titulo}
                {foto.titulo_atribuido && <span className="font-normal text-muted-foreground">]</span>}
              </>
            )}
          </h1>
          {foto.titulo_fuente && (
            <p className="mt-1.5 text-xs text-muted-foreground">
              Título atribuido, tomado {foto.titulo_fuente === "indice" ? "del índice manuscrito" : "de la leyenda del reverso"}
            </p>
          )}
          <p className="mt-2 text-muted-foreground">
            {fechaLegible(foto)}
            {foto.fecha_inferida && " (inferida del índice manuscrito)"}
            {foto.lugar && ` · ${foto.lugar}`}
          </p>

          {pendiente && (
            <div className="mt-5 border-l-2 border-primary bg-card px-4 py-3 text-sm leading-relaxed">
              <strong className="font-medium">Ficha en proceso de catalogación.</strong>{" "}
              <span className="text-muted-foreground">
                {foto.titulo_atribuido
                  ? "El título se toma de la entrada del índice manuscrito que describe el sobre. "
                  : "Todavía no tiene título asignado, entrada del índice manuscrito vinculada ni leyenda en el reverso. "}
                Descripción, personas y datos técnicos se incorporarán a medida que avance el trabajo del proyecto.
              </span>
            </div>
          )}
          {foto.estado_ficha === "borrador" && (
            <div className="mt-5 border-l-2 border-primary bg-card px-4 py-3 text-sm leading-relaxed">
              <strong className="font-medium">Ficha en borrador.</strong>{" "}
              <span className="text-muted-foreground">
                Los datos provienen de la transcripción del reverso y están pendientes de revisión.
              </span>
            </div>
          )}

          {foto.descripcion && <p className="mt-6 font-serif text-lg leading-relaxed">{foto.descripcion}</p>}

          <Seccion titulo="Identificación">
            <Campo k="Signatura" v={<span className="signatura">{foto.id}</span>} />
            <Campo
              k="Índice manuscrito"
              v={
                foto.indice_n ? (
                  <a href="#/indice" className="text-primary hover:underline">
                    Entrada {foto.indice_n}: <em>{foto.indice_titulo}</em>
                    {Number(foto.sobre.match(/\d+/)?.[0]) !== foto.indice_n && (
                      <span className="text-muted-foreground"> · corresponde al sobre {foto.indice_n}, se conserva en {foto.sobre}</span>
                    )}
                  </a>
                ) : undefined
              }
            />
            <Campo k="Caras digitalizadas" v={foto.reverso ? "Anverso y reverso" : "Anverso (reverso no digitalizado)"} />
            <Campo k="Archivo digital" v={<span className="signatura">{foto.archivo}</span>} />
          </Seccion>

          <Seccion titulo="Ubicación física">
            <Campo
              k="Caja"
              v={
                <a href={enlace.caja(foto.caja)} className="text-primary hover:underline">
                  Caja {caja?.numero} · {caja?.etiqueta} <span className="signatura text-muted-foreground">({foto.caja})</span>
                </a>
              }
            />
            <Campo
              k="Sobre"
              v={
                <a href={enlace.sobre(foto.sobre)} className="text-primary hover:underline">
                  {foto.sobre}
                </a>
              }
            />
            <Campo k="Posición en el sobre" v={foto.numero ?? undefined} />
          </Seccion>

          <Seccion titulo="Contenido">
            <Campo k="Personas" v={lista(foto.personas, "personas")} />
            <Campo k="Evento" v={foto.evento} />
            <Campo k="Lugar" v={foto.lugar} />
            <Campo k="Fecha" v={foto.fecha ? fechaLegible(foto) : undefined} />
            <Campo k="Materias" v={lista(foto.materias, "materias")} />
          </Seccion>

          <Seccion titulo="Datos técnicos">
            <Campo k="Fotógrafo/a" v={foto.fotografo} />
            <Campo k="Técnica" v={foto.tecnica} />
            <Campo k="Soporte" v={foto.soporte} />
            <Campo k="Dimensiones" v={foto.dimensiones} />
            <Campo k="Leyenda del reverso" v={foto.leyenda_reverso} />
            <Campo k="Inscripciones (reverso)" v={foto.inscripciones_reverso} />
            <Campo k="Estado de conservación" v={foto.estado_conservacion} />
          </Seccion>

          <Seccion titulo="Contexto">
            <Campo k="Nota histórica" v={foto.nota_historica} />
            <Campo k="Nota biográfica" v={foto.nota_biografica} />
            <Campo k="Documentos relacionados" v={foto.documentos_relacionados?.join("; ")} />
            <Campo k="Bibliografía" v={foto.bibliografia?.join("; ")} />
          </Seccion>

          <Seccion titulo="Derechos" siempre>
            <Campo
              k="Uso"
              v={foto.derechos ?? "Consultar a la Fundación El Fogón de los Arrieros antes de reproducir."}
            />
          </Seccion>

          <Citas foto={foto} />
        </div>
      </div>

      <Dialog open={ampliada} onOpenChange={setAmpliada}>
        <DialogContent className="max-w-[min(96vw,1400px)] border-none bg-black/95 p-2 sm:p-4">
          <DialogTitle className="sr-only">{foto.titulo} ({lado})</DialogTitle>
          <div className="h-[86vh]">
            <Imagen foto={foto} lado={lado} ancho={2400} contener className="bg-transparent" />
          </div>
        </DialogContent>
      </Dialog>
    </article>
  )
}

function NavFoto({ f, dir }: { f?: Foto; dir: "ant" | "sig" }) {
  const Icono = dir === "ant" ? ChevronLeft : ChevronRight
  const etiqueta = dir === "ant" ? "Fotografía anterior del sobre" : "Fotografía siguiente del sobre"
  if (!f) return <span className="rounded-sm border p-1.5 opacity-30"><Icono className="h-4 w-4" /></span>
  return (
    <a href={enlace.foto(f.id)} aria-label={etiqueta} title={`${etiqueta} (tecla ${dir === "ant" ? "←" : "→"})`} className="foco rounded-sm border p-1.5 hover:border-primary hover:text-primary">
      <Icono className="h-4 w-4" />
    </a>
  )
}

function lista(vs: string[] | undefined, campo: string) {
  if (!vs?.length) return undefined
  return (
    <span className="flex flex-wrap gap-1.5">
      {vs.map((v) => (
        <a
          key={v}
          href={enlace.buscar(new URLSearchParams([[`f.${campo}`, v]]).toString())}
          className="rounded-sm bg-accent px-1.5 py-0.5 text-sm hover:text-primary"
        >
          {v}
        </a>
      ))}
    </span>
  )
}

function Seccion({ titulo, children, siempre }: { titulo: string; children: React.ReactNode; siempre?: boolean }) {
  const hijos = (Array.isArray(children) ? children : [children]).filter(
    (c) => c && (c as React.ReactElement<{ v?: unknown }>).props.v != null && (c as React.ReactElement<{ v?: unknown }>).props.v !== "",
  )
  if (!hijos.length && !siempre) return null
  return (
    <section className="mt-8">
      <h2 className="etiqueta border-b pb-2">{titulo}</h2>
      <dl className="divide-y divide-border/60">{hijos}</dl>
    </section>
  )
}

function Campo({ k, v }: { k: string; v?: React.ReactNode }) {
  if (v == null || v === "") return null
  return (
    <div className="grid gap-1 py-2.5 sm:grid-cols-[11rem_1fr] sm:gap-4">
      <dt className="text-sm text-muted-foreground">{k}</dt>
      <dd className="text-[0.95rem]">{v}</dd>
    </div>
  )
}

function Citas({ foto }: { foto: Foto }) {
  const formatos = [
    { id: "apa", etiqueta: "APA 7", texto: citaAPA(foto) },
    { id: "chicago", etiqueta: "Chicago", texto: citaChicago(foto) },
    { id: "bibtex", etiqueta: "BibTeX", texto: citaBibTeX(foto) },
    { id: "url", etiqueta: "Enlace", texto: urlPermanente(foto) },
  ]
  const [activo, setActivo] = useState("apa")
  const [copiado, setCopiado] = useState(false)
  const actual = formatos.find((f) => f.id === activo)!

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(actual.texto)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 1600)
    } catch {
      /* portapapeles no disponible */
    }
  }

  return (
    <section className="mt-10">
      <h2 className="etiqueta border-b pb-2">Cómo citar</h2>
      <div className="mt-3 flex flex-wrap gap-1 text-sm" role="tablist">
        {formatos.map((f) => (
          <button
            key={f.id}
            role="tab"
            aria-selected={activo === f.id}
            onClick={() => setActivo(f.id)}
            className={cn(
              "rounded-sm px-2.5 py-1",
              activo === f.id ? "bg-accent font-medium" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {f.etiqueta}
          </button>
        ))}
      </div>
      <div className="relative mt-2 rounded-sm border bg-card">
        <pre className="whitespace-pre-wrap break-words p-4 pr-12 font-mono text-[0.78rem] leading-relaxed">{actual.texto}</pre>
        <button
          type="button"
          onClick={copiar}
          className="foco absolute right-2 top-2 rounded-sm p-2 text-muted-foreground hover:text-primary"
          aria-label="Copiar cita"
        >
          {copiado ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
    </section>
  )
}
