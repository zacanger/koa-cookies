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

export const setCookie = (s: string, value: any, config = {}) =>
  async (ctx: Koa.Context, next = defaultNext) => {
    ctx.cookies.set(
      encodeURIComponent(s),
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

export const clearCookie = (s: string, config = {}) =>
  async (ctx: Koa.Context, next = defaultNext) => {
    ctx.cookies.set(
      encodeURIComponent(s),
      'removed',
      Object.assign({}, getDefaultClearConfig(ctx), config)
    )
    await next()
  }

interface cookieMap { [key: string]: string }
// TODO: in here, we could add more functionality,
// like express's cookie-parser
const getCookies = (cookieStr: string = ''): cookieMap =>
  cookieStr.split(';')
    .reduce((prev, curr) => {
      const [k, v] = curr.split('=')
      if (k != null && v != null) {
        prev[k] = v
      }
      return prev
    }, {})

export const parseCookie = (s?: string) =>
  async (ctx: Koa.Context, next?: typeof defaultNext) => {
    const allCookies = getCookies(ctx.headers?.cookie ?? '')
    ctx.cookie = { ...ctx.cookie, ...allCookies }
    if ((next != null) && typeof next === 'function') {
      await next()
    }
    if (s != null) {
      return allCookies[s]
    }
  }
