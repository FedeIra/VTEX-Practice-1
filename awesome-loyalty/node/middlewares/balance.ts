import axios from 'axios'

export async function balance(ctx: Context, next: () => Promise<any>) {

  const body = await json(ctx.req)

  const {client: {email } } = body
  console.log("🚀 ~ file: search.ts:9 ~ search ~ email:", email)

  const http = axios.create({
    headers: {
      VtexIdAuthCookie: ctx.VtexIdAuthCookie,
      "REST-Range": "resources=0-1",
      "Cache-Control": "no-cache",
      "X-Vtex-Use-Https": true
    }
  })

  const { data } = await http.get(`http://${ctx.vtex.account}.myvtex.com/api/dataentities/awesome_loyalty/search?_schema=awesome_loyalty_schema&_fields_all&email=${email}`)

  const response = [
    {
      id: `${data[0].id}`,
      provider: `basedevmkp`,
      balance: `${data[0].balance}`,
      totalBalance: `${data[0].balance}`,
      _self: {
        href: `${ctx.vtex.account}/giftcardproviders/basedevmkp`
      }
    }
  ]
  console.log("🚀 ~ file: search.ts:33 ~ search ~ response:", response)


  ctx.status = 200
  ctx.body = response
  ctx.set('Cache-Control', 'no-cache')

  await next()
}
