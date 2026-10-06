import { ArbolExplorador } from "./ArbolExplorador"

/** Layout de dos paneles: árbol de cajas/sobres a la izquierda, contenido a la derecha. */
export function PanelExplorador({
  cajaActiva,
  sobreActivo,
  children,
}: {
  cajaActiva?: string
  sobreActivo?: string
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto max-w-7xl gap-8 px-4 py-8 md:flex md:px-6">
      <aside className="mb-8 border-b pb-6 md:mb-0 md:w-56 md:shrink-0 md:border-b-0 md:border-r md:pb-0 md:pr-6">
        <ArbolExplorador cajaActiva={cajaActiva} sobreActivo={sobreActivo} />
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}
