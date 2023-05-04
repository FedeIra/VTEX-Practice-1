export async function getWeather (ctx: Context, next: () => Promise<any>)  {
  console.log('getWeather');
  const {
    vtex: {
      route: { params },
    },
    clients: { weather },
  } = ctx

  const { city } = params

  const cityWeather = await weather.getWeatherByCity(city)

  if (cityWeather.status === 200) {
    ctx.body = cityWeather.data
  } else {
    ctx.body = "Error"
  }
    await next()
}

