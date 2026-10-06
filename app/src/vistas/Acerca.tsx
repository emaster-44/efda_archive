import { config, estadisticas } from "@/lib/datos"

export function Acerca() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <p className="etiqueta">Acerca del prototipo</p>
      <h1 className="mt-2 text-3xl font-semibold md:text-4xl">Un fondo de consulta para el archivo fotográfico del Fogón</h1>

      <div className="mt-8 space-y-5 font-serif text-[1.08rem] leading-relaxed">
        <p>
          El Fogón de los Arrieros (Resistencia, Chaco) conserva un archivo fotográfico que registra más de
          tres décadas de vida cultural: visitas de artistas e intelectuales, funciones de teatro,
          homenajes, la construcción de su edificio y las superficies expositivas de su colección.
        </p>
        <p>
          Este prototipo forma parte del proyecto <em>{config.archivo.proyecto}</em>, y responde a su
          objetivo de transferencia: poner en valor el archivo mediante inventario, digitalización y un
          reservorio en línea para la consulta.
        </p>
      </div>

      <h2 className="mt-12 text-2xl font-semibold">Criterios</h2>
      <ul className="mt-4 space-y-3 leading-relaxed text-muted-foreground">
        <li>
          <strong className="text-foreground">Orden de precedencia.</strong> Se respeta la organización del
          fondo: Caja › Sobre › Fotografía. Cajas y sobres son unidades de resguardo; la fotografía es la
          unidad de archivo.
        </li>
        <li>
          <strong className="text-foreground">Signaturas preservadas.</strong> Cada fotografía tiene una
          signatura estable, <span className="signatura">C01a20-S20-0004</span> (caja C01a20,
          sobre S20, fotografía 4), que sirve también como enlace permanente para citar.
        </li>
        <li>
          <strong className="text-foreground">Índice manuscrito.</strong> El <em>Índice Fotografías</em> describe
          fotografías individuales. Cuando una entrada se vincula con su fotografía, la ficha toma de ella un
          título atribuido, entre corchetes.
        </li>
        <li>
          <strong className="text-foreground">Anverso y reverso.</strong> Los dorsos digitalizados se vinculan
          a su anverso: las inscripciones manuscritas son fuente documental.
        </li>
        <li>
          <strong className="text-foreground">Enriquecimiento progresivo.</strong> La ficha prevé campos de
          contexto (notas históricas y biográficas, documentos relacionados, bibliografía) que se
          completarán con el material del archivo documental.
        </li>
      </ul>

      <h2 className="mt-12 text-2xl font-semibold">Estado actual</h2>
      <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-sm border bg-border text-sm">
        {[
          ["Fotografías inventariadas", estadisticas.fotos],
          ["Cajas · sobres", `${estadisticas.cajas} · ${estadisticas.sobres}`],
          ["Entradas del índice vinculadas", `${estadisticas.vinculadasIndice} / ${estadisticas.entradasIndice}`],
          ["Fichas catalogadas", estadisticas.catalogadas],
        ].map(([k, v]) => (
          <div key={k} className="bg-card px-4 py-3">
            <dt className="text-muted-foreground">{k}</dt>
            <dd className="mt-0.5 font-serif text-2xl tabular-nums">{v}</dd>
          </div>
        ))}
      </dl>

      <h2 className="mt-12 text-2xl font-semibold">Créditos</h2>
      <p className="mt-4 leading-relaxed text-muted-foreground">
        {config.archivo.institucion}. Proyecto SGCyT-UNNE. Metadatos publicados bajo licencia{" "}
        {config.archivo.licencia_metadatos}. Las imágenes conservan los derechos de sus titulares; su
        reproducción requiere autorización de la Fundación.
      </p>
    </article>
  )
}
