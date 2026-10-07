import { useEffect, useState } from "react"
import { Check, ChevronLeft, ChevronRight, Copy, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { cajaPorId, config, fechaLegible, fotoPorId, fotosPorSobre, tituloVisible, type Foto } from "@/lib/datos"
import { enlace, ir } from "@/lib/ruta"
import { citaAPA } from "@/lib/citas"
import { Imagen } from "@/components/Imagen"
import { NoEncontrado } from "./Cajas"
import { Migas, migasDe } from "@/components/PanelExplorador"

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
      // Las flechas solo navegan entre fotos si no hay un control que las use (WCAG 2.1.1)
      const t = e.target as HTMLElement
      if (ampliada || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return
      if (t.closest?.("input, textarea, select, [contenteditable], [role=tablist], [role=radiogroup], [role=group], [role=listbox], [role=menu]")) return
      if (e.key === "ArrowLeft" && ant) ir(enlace.foto(ant.id))
      if (e.key === "ArrowRight" && sig) ir(enlace.foto(sig.id))
    }
    window.addEventListener("keydown", tecla)
    return () => window.removeEventListener("keydown", tecla)
  }, [ant, sig, ampliada])

  if (!foto) return <NoEncontrado que={`la fotografía ${id}`} />

  const caja = cajaPorId.get(foto.caja)

  return (
    <article className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Migas items={migasDe({ caja: foto.caja, sobre: foto.sobre, foto: foto.id })} />
        <span className="flex items-center gap-1 text-sm text-muted-foreground">
          <NavFoto f={ant} dir="ant" />
          <span className="px-2 tabular-nums" aria-label={`Fotografía ${pos + 1} de ${hermanas.length} del sobre`}>
            {pos + 1} / {hermanas.length}
          </span>
          <NavFoto f={sig} dir="sig" />
        </span>
      </div>

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        {/* Imagen */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-sm border bg-[hsl(var(--placa))] md:aspect-[5/5]">
            <Imagen foto={foto} lado={lado} ancho={config.imagenes.ancho_ficha} contener />
            <button
              type="button"
              onClick={() => setAmpliada(true)}
              className="foco absolute right-2 top-2 rounded-sm bg-background/85 p-2 backdrop-blur hover:text-primary"
              aria-label={`Ampliar ${lado}`}
            >
              <Maximize2 className="h-4 w-4" aria-hidden />
            </button>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <div className="inline-flex rounded-sm border border-input p-0.5 text-sm" role="group" aria-label="Cara de la fotografía">
              {(["anverso", "reverso"] as const).map((l) => {
                const falta = l === "reverso" && !foto.reverso
                return (
                  <button
                    key={l}
                    type="button"
                    aria-pressed={lado === l}
                    disabled={falta}
                    title={falta ? "Reverso no digitalizado" : undefined}
                    onClick={() => setLado(l)}
                    className={cn(
                      "foco rounded-[2px] px-3 py-1.5 capitalize disabled:cursor-not-allowed disabled:opacity-50",
                      lado === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {l}
                  </button>
                )
              })}
            </div>
            {!foto.reverso && <span className="text-xs text-muted-foreground">Reverso no digitalizado</span>}
          </div>
        </div>

        {/* Ficha */}
        <div>
          <h1 className="text-3xl font-semibold leading-tight md:text-[2.15rem]">
            {foto.sin_titulo ? (
              <span className="font-normal italic text-muted-foreground">Sin título</span>
            ) : (
              tituloVisible(foto)
            )}
          </h1>
          {foto.titulo_atribuido && !foto.sin_titulo && (
            <p className="mt-1 text-xs text-muted-foreground">
              Título atribuido, tomado {foto.titulo_fuente === "reverso" ? "de la leyenda del reverso" : "del índice manuscrito"}.
            </p>
          )}
          <p className="mt-2 text-muted-foreground">
            {fechaLegible(foto)}
            {foto.fecha_inferida && " (fecha inferida del índice manuscrito)"}
            {foto.lugar && ` · ${foto.lugar}`}
          </p>


          {foto.descripcion && <p className="mt-6 font-serif text-lg leading-relaxed">{foto.descripcion}</p>}

          <Seccion titulo="Identificación">
            <Campo k="Signatura" v={<span className="signatura">{foto.id}</span>} />
            <Campo
              k="Índice manuscrito"
              v={
                foto.indice_n ? (
                  <a href="#/indice" className="foco rounded-sm text-primary hover:underline">
                    Entrada {foto.indice_n}: <em>{foto.indice_titulo}</em>
                    {Number(foto.sobre.match(/\d+/)?.[0]) !== foto.indice_n && (
                      <span className="text-muted-foreground"> · corresponde al sobre {foto.indice_n}, se conserva en {foto.sobre}</span>
                    )}
                  </a>
                ) : undefined
              }
            />
            <Campo k="Archivo digital" v={<span className="signatura">{foto.archivo}</span>} />
          </Seccion>

          <Seccion titulo="Ubicación física">
            <Campo
              k="Caja"
              v={
                <a href={enlace.caja(foto.caja)} className="foco rounded-sm text-primary hover:underline">
                  Caja {caja?.numero} · {caja?.etiqueta} <span className="signatura text-muted-foreground">({foto.caja})</span>
                </a>
              }
            />
            <Campo
              k="Sobre"
              v={
                <a href={enlace.sobre(foto.sobre)} className="foco rounded-sm text-primary hover:underline">
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
            {/* La transcripción completa ya contiene la leyenda: se muestra la leyenda sola solo si no hay transcripción */}
            <Campo k="Leyenda del reverso" v={foto.inscripciones_reverso ? undefined : foto.leyenda_reverso} />
            <Campo k="Transcripción del reverso" v={foto.inscripciones_reverso} />
            <Campo k="Estado de conservación" v={foto.estado_conservacion} />
          </Seccion>

          <Seccion titulo="Contexto">
            <Campo k="Nota histórica" v={foto.nota_historica} />
            <Campo k="Nota biográfica" v={foto.nota_biografica} />
            <Campo k="Documentos relacionados" v={foto.documentos_relacionados?.join("; ")} />
            <Campo k="Bibliografía" v={foto.bibliografia?.join("; ")} />
          </Seccion>

          <Citas foto={foto} />
        </div>
      </div>

      <Dialog open={ampliada} onOpenChange={setAmpliada}>
        <DialogContent className="max-w-[min(96vw,1400px)] border-none bg-black/95 p-2 sm:p-4">
          <DialogTitle className="sr-only">{tituloVisible(foto)} ({lado})</DialogTitle>
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
  if (!f) return <span className="rounded-sm border p-2.5 opacity-30" aria-hidden><Icono className="h-4 w-4" /></span>
  return (
    <a href={enlace.foto(f.id)} aria-label={etiqueta} title={`${etiqueta} (tecla ${dir === "ant" ? "←" : "→"})`} className="foco rounded-sm border p-2.5 hover:border-primary hover:text-primary">
      <Icono className="h-4 w-4" aria-hidden />
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
          className="foco rounded-sm bg-accent px-1.5 py-0.5 text-sm hover:underline"
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
  const texto = citaAPA(foto)
  const [copiado, setCopiado] = useState(false)

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(texto)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 1600)
    } catch {
      /* portapapeles no disponible */
    }
  }

  return (
    <section className="mt-10">
      <h2 className="etiqueta border-b pb-2">Cómo citar · APA 7</h2>
      <div className="relative mt-3 rounded-sm border bg-card">
        <pre className="whitespace-pre-wrap break-all p-4 pr-12 font-mono text-[0.78rem] leading-relaxed">{texto}</pre>
        <button
          type="button"
          onClick={copiar}
          className="foco absolute right-2 top-2 inline-flex items-center gap-1 rounded-sm p-2 text-xs text-muted-foreground hover:text-primary"
          aria-label="Copiar cita"
        >
          {copiado ? <Check className="h-4 w-4 text-primary" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
        </button>
      </div>
      <p className="mt-1.5 h-4 text-xs text-primary" aria-live="polite">
        {copiado ? "Cita copiada al portapapeles." : ""}
      </p>
    </section>
  )
}
