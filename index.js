const defaultNext = () => Promise.resolve()

const setCookie = (name, value, config) =>
  async (ctx, next = defaultNext) => {
    ctx.cookies.set(name, value, config)
    await next()
  }

const getDefaultConfig = (ctx) => ({
  domain: ctx.host,
  maxAge: 1,
  expires: new Date(1)
})

const clearCookie = (name, config) =>
  async (ctx, next = defaultNext) => {
    ctx.cookies.set(name, 'removed', Object.assign({}, getDefaultConfig(ctx), config))
    await next()
  }

module.exports = {
  setCookie,
  clearCookie
}
