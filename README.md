# koa-cookies

Set and clear cookies in your Koa application.

[Donate](https://ko-fi.com/zacanger)

--------

## Installation

`npm i koa-cookies`

## Usage

```javascript
// set up your koa server, koa-router, etc.
import { clearCookie, setCookie, parseCookie } from 'koa-cookies'

// Use in routes
app.get('/foo', async (ctx, next) => {
  await setCookie('bar', 'baz')(ctx)
})
app.get('/things', (ctx) => {
  await clearCookie('foo')(ctx)
})
app.get('/stuff', (ctx) => {
  await parseCookie('bar')(ctx) // => string value for this cookie key
})

// Use as middlewares
app.use(setCookie('foo', 'bar', config)) // set on every request
app.use(clearCookie('baz', config)) // clear on every request
app.use(parseCookie()) // always add all cookies to ctx.cookies
```

The `config` argument is optional. Defaults:

```
setCookieConfig = {
  domain: ctx.host,
  maxAge: one week,
  expires: one week from now
}

clearCookieConfig = {
  domain: ctx.host,
  maxAge: 1 second,
  expires: 1970-01-01T00:00:00.001Z
}
```

[LICENSE](./LICENSE.md)
