/*
*1) Agrego el cliente de universities a la clase Clients, que es la clase que se encarga de crear los clientes de vtex y de terceros. Para esto tengo que importar la clase UniversitiesClient y agregarla como propiedad de la clase Clients y crear un getter para acceder a ella.

*/

import { IOClients } from '@vtex/api'

import Status from './status'
import UniversitiesClient from './universities'
import WeatherClient from './weather'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get status() { // get status() es un getter, que es una función que se ejecuta cuando se accede a la propiedad status. En este caso, se ejecuta cuando se accede a la propiedad status de la clase Clients.
    return this.getOrSet('status', Status) // getOrSet es un método de la clase IOClients que se encarga de crear una instancia de la clase que le pasemos como parámetro y de guardarla en una propiedad de la clase Clients. Si la instancia ya existe, la devuelve.
  }
    public get universities() {
    return this.getOrSet('universities', UniversitiesClient)
    }
  public get weather() {
    return this.getOrSet('weather', WeatherClient)
  }
}
