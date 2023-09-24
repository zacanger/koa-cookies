import tape from 'tape'
import * as http from 'http'
import Koa from 'koa'
import request from 'supertest'
import * as cookies from '.'

/* eslint-disable n/handle-callback-err,@typescript-eslint/no-misused-promises */

tape.test('set cookie', (t) => {
  const app = new Koa()
  app.use(cookies.setCookie('foo', 'bar'))
  request(http.createServer(app.callback()))
    .get('/')
    .expect(200, (_, res) => {
      t.true(res.headers['set-cookie'][0].includes('foo=bar; path=/;'))
      t.end()
    })
})

tape.test('clear cookie', (t) => {
  const app = new Koa()
  app.use(cookies.clearCookie('foo'))
  request(http.createServer(app.callback()))
    .get('/')
    .expect(200, (_, res) => {
      t.true(res.headers['set-cookie'][0].includes('foo=removed;'))
      t.end()
    })
})

tape.test('config', (t) => {
  const app = new Koa()
  const config = {
    domain: 'example.com'
  }
  app.use(cookies.setCookie('foo', 'bar', config))
  request(http.createServer(app.callback()))
    .get('/')
    .expect(200, (_, res) => {
      t.true(res.headers['set-cookie'][0].includes('domain=example.com;'))
      t.end()
    })
})

tape.test('unicode', (t) => {
  const app = new Koa()
  app.use(cookies.setCookie('λ', 'bar'))
  request(http.createServer(app.callback()))
    .get('/')
    .expect(200, (_, res) => {
      const sc = res.headers['set-cookie'][0]
      t.true(sc.includes('%CE%BB=b'))
      t.true(decodeURIComponent(sc).includes('λ'))
      t.end()
    })
})
