# koa-cookies

Set and clear cookies in your Koa application.

[![Support with PayPal](https://img.shields.io/badge/paypal-donate-yellow.png)](https://paypal.me/zacanger) [![Patreon](https://img.shields.io/badge/patreon-donate-yellow.svg)](https://www.patreon.com/zacanger) [![ko-fi](https://img.shields.io/badge/donate-KoFi-yellow.svg)](https://ko-fi.com/U7U2110VB)

--------

## Installation

`npm i koa-cookies`

## Usage

```javascript
// set up your koa server, koa-router, etc.
const { clearCookie, setCookie } = require('koa-cookies')

app.get('/foo', async (ctx, next) => {
  setCookie('bar', 'baz')(ctx)
  // other /foo stuff
})

app.get('/things', (ctx) => {
  clearCookie('foo')(ctx)
})

app.use(setCookie('foo', 'bar', config))
app.use(clearCookie('baz', config))
```

`setCookie` and `clearCookie` work in both routes and as middleware.

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
