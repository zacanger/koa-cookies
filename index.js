const defaultNext = () => Promise.resolve()

const getFutureDate = () => {
  const d = new Date()
  d.setDate(d.getDate() + 7)
  return d
}

const getDefaultSetConfig = (ctx) => ({
  domain: ctx.host,
  maxAge: 604_800,
  expires: getFutureDate()
})

const setCookie = (name, value, config = {}) => async (
  ctx,
  next = defaultNext
) => {
  ctx.cookies.set(
    encodeURIComponent(name),
    encodeURIComponent(value),
    Object.assign({}, getDefaultSetConfig(ctx), config)
  )
  await next()
}

const getDefaultClearConfig = (ctx) => ({
  domain: ctx.host,
  maxAge: 1,
  expires: new Date(1)
})

const clearCookie = (name, config = {}) => async (ctx, next = defaultNext) => {
  ctx.cookies.set(
    encodeURIComponent(name),
    'removed',
    Object.assign({}, getDefaultClearConfig(ctx), config)
  )
  await next()
}

module.exports = {
  setCookie,
  clearCookie
}
