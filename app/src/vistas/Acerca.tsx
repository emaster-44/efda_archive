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
          <strong className="text-foreground">Orden original.</strong> Se respeta la organización por sobres del
          archivo y su <em>Índice Fotografías</em> manuscrito, transcripto para este prototipo.
        </li>
        <li>
          <strong className="text-foreground">Signatura estable.</strong> Cada fotografía recibe una signatura{" "}
          <span className="signatura">EFDA-F-S&lt;sobre&gt;-&lt;número&gt;</span> que no cambia aunque cambie la
          ficha, y que sirve como enlace permanente para citar.
        </li>
        <li>
          <strong className="text-foreground">Títulos atribuidos.</strong> Mientras una fotografía no está
          catalogada, su título se toma del índice del sobre y se muestra entre corchetes.
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
          ["Sobres digitalizados", estadisticas.sobres],
          ["Sobres del índice sin digitalizar", estadisticas.faltantes],
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
