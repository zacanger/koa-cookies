# koa-cookies

Set and clear cookies in your Koa application.

[Donate](https://ko-fi.com/zacanger)

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
