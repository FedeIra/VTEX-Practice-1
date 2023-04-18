/*
*1) Creo el resolver que voy a utilizar para hacer la petición a la API externa. En este caso, voy a utilizar el resolver de getUniversities que recibe el clients de context y el country de args que es la interface que definimos antes que básicamente es el parametro ocuntry.
*/

interface Args {
  country: string
}

interface University {
  name: string
  domains: [string]
  state_province: string | undefined
  web_pages: [string]
  country: string
  alpha_two_code: string
  'state-province'?: string
} // interface University: es la interface que me devuelve la API externa. Como se puede ver, tiene una propiedad llamada state-province que no me sirve porque graphql no acepta el guión medio. Por eso, la hago optativa y le agrego la opción de undefined a la propiedad state_province. De lo contrario, no haría falta crear esta interface y simplemente usaría la que me devuelve la API externa.

export const getUniversitiesResolver = async (
  _: unknown, // _: unknown: el underscore es porque no vamos a usar esta variable, pero es obligatorio ponerla. Y en estos casos no hay problema en ponerle unknown o any porque no vamos a usarla.
  { country }: Args, //? { country }: Args: le paso los argumentos que me llegan en la petición. En este caso, le paso el país que quiero buscar.
  { clients } : Context //? { clients }: Context: le paso el contexto de la petición.
) => {
  const { data: universities } = await clients.universities.getUniversitiesByCountry(country)

    console.log('UNIVERSITIES!!!:',universities);

  return universities.map((university: University) => {
    university.state_province = university['state-province'] // anteriormente tuve que cambiar el nombre de la propiedad state-province a state_province por graphql no acepta el guión medio. Por eso, hago un map para cambiar el nombre de la propiedad. De lo contrario, tira null pq no existe la propiedad state_province.
    delete university['state-province'] // elimino la propiedad state-province para que no se repita en el objeto que voy a retornar. Para eso torno esta propiedad optativa en la interface University y agrego la opción de undefined a la propiedad state_province.
    return university
  })


} // clients.universities.getUniversitiesByCountry(country): le paso el país que quiero buscar a la función getUniversitiesByCountry de nuestro cliente universities.
