/*
*1) Creo el cliente que voy a utilizar. En este caso, voy a utilizar el cliente de la API de universidades de hipolabs.com.

*2) Creo la clase que hereda de ExternalClient, que es la clase que me permite hacer peticiones a una API externa y no de vtex.

*3) En el constructor, le paso la url de la API externa y el contexto de la petición. También le paso las opciones de la instancia, que en este caso no las voy a utilizar.

*4) En el método getUniversitiesByCountry, le paso el país que quiero buscar y hago una petición GET a la API externa. En este caso, le paso la url completa, pero también podría haberle pasado solo el path y que el cliente se encargara de concatenar la url base con el path.
*/

import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class UniversitiesClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('http://universities.hipolabs.com/', context, {
      ...options,
    /*    headers: {
          VtexIdclientAutCookie: context.authToken || context.adminUserAuthToken || context.storeUserAuthToken,
        } */
      }
    )
  }

  public async getUniversitiesByCountry(country: string | string[]) {
    return this.http.getRaw(`search?country=${country}`) // te devuelve status de la petición, headers, config, requests, etc.
    // return this.http.get(`search?country=${country}`) // solo te devuelve data
  }

//  public async postUniversitiesByCountry(country: string)/* : Promise<string> */ {
//     return this.http.postRaw(`${country}`)
//   }
}
