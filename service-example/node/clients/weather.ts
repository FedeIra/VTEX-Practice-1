import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

const apiKey = '4ae2636d8dfbdc3044bede63951a019b'


export default class WeatherClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('https://api.openweathermap.org/data/2.5/', context, {
      ...options,
    })
  }
  public async getWeatherByCity(city: string | string[]) {
    return this.http.getRaw(`weather?q=${city}&appid=${apiKey}`)
  }
}
