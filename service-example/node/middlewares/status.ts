export async function status(ctx: Context, next: () => Promise<any>) {
  const {
    // state: { code }, // This is the same as:
    // obtain code without using state bag:
    vtex: {
      route: { params },
    },
    clients: { status: statusClient },
  } = ctx

  console.info('Received code:', params)

  const { code } = params

  // const statusResponse = await statusClient.getStatus(code) // correction for this:
  const statusResponse = await statusClient.getStatus(code as unknown as number)

  console.info('Status response:', statusResponse)

  const {
    headers,
    data,
    status: responseStatus,
  } = await statusClient.getStatusWithHeaders(code as unknown as number)

  console.info('Status headers', headers)
  console.info('Status data:', data)

  ctx.status = responseStatus
  ctx.body = data
  ctx.set('Cache-Control', headers['cache-control'])

  await next()
}
