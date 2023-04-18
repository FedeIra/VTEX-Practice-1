/*
Creo el middleware que voy a utilizar para hacer la petición a la API externa. En este caso, voy a utilizar el middleware de getUniversities.
*1) Obtengo los parámetros (country) y client que me llegan en la petición.
*2) Hago la petición por medio de la función getUniversitiesByCountry de nuestro cliente universities.
*3) Si la petición es exitosa, devuelvo la data de la respuesta. Si no, devuelvo un mensaje de error.
*/

export async function getUniversities(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
    clients: { universities },
  } = ctx

  console.info('Received params :', params);

  const { country } = params

  console.info('Received country :', country);

  // ----------------------------------------
  const appId = process.env.VTEX_APP_ID ? process.env.VTEX_APP_ID : ''
  const { universities: universitiesSchema, country: countrySchema } = await ctx.clients.apps.getAppSettings(appId)

  console.info('Received universitiesSchema :', universitiesSchema);
  console.info('Received countrySchema :', countrySchema);
 // ----------------------------------------

  const response = await universities.getUniversitiesByCountry(country)

  console.log('UNIVERSIDADES:', response.data);

  if (response.status === 200) {
    ctx.body = response.data // con esto aparece toda la data en el postman
  } else {
    ctx.body = "Error"
  } // esto lo puedo usar con el getRaw, pero no con el get ya que el getRaw te devuelve el status, headers, etc. y el get solo te devuelve data.

  await next()
}
