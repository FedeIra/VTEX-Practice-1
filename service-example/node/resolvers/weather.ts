interface Args {
  city: string
}

// interface Other {
//   temp: number
//   feels_like: number
//   temp_min: number
//   temp_max: number
//   pressure: number
//   humidity: number
//   sea_level: number
//   grnd_level: number
// }

// interface MainWeather {
//   id: number
//   main: string
//   description: string
//   icon: string
// }

// interface Main {
//   visibility: number
//   timezone: number
//   id: number
//   name: string
//   cod: number
//   mainWeather: MainWeather[]
//   other: Other
// }

export const getWeatherResolver = async(
  _: unknown,
  { city }: Args,
  { clients }: Context
) => {
  const { data: weather } = await clients.weather.getWeatherByCity(city)

  return weather
}
