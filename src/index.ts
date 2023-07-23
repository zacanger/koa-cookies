import * as Koa from 'koa'

interface CookiesConfig {
  domain: string
  maxAge: number
  expires: Date
}

const defaultNext = async (): Promise<void> => await Promise.resolve()

const getFutureDate = (): Date => {
  const d = new Date()
  d.setDate(d.getDate() + 7)
  return d
}

const getDefaultSetConfig = (ctx: Koa.Context): CookiesConfig => ({
  domain: ctx.host,
  maxAge: 604_800,
  expires: getFutureDate()
})

export const setCookie = (name, value, config = {}) => async (
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

const getDefaultClearConfig = (ctx: Koa.Context): CookiesConfig => ({
  domain: ctx.host,
  maxAge: 1,
  expires: new Date(1)
})

export const clearCookie = (name, config = {}) => async (ctx, next = defaultNext) => {
  ctx.cookies.set(
    encodeURIComponent(name),
    'removed',
    Object.assign({}, getDefaultClearConfig(ctx), config)
  )
  await next()
}
