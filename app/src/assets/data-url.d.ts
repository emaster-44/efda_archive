/** Imports `data-url:` de Parcel: el recurso se incrusta como data URI en el bundle. */
declare module "data-url:*" {
  const url: string
  export default url
}
