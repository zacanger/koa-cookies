const tape = require('tape')
const http = require('http')
const Koa = require('koa')
const request = require('supertest')
const cookies = require('.')

/* eslint-disable n/handle-callback-err */

tape.test('set cookie', (t) => {
  const app = new Koa()
  app.use(cookies.setCookie('foo', 'bar'))
  request(http.createServer(app.callback()))
    .get('/')
    .expect(200, (err, res) => {
      t.true(res.headers['set-cookie'][0].includes('foo=bar; path=/;'))
      t.end()
    })
})

tape.test('clear cookie', (t) => {
  const app = new Koa()
  app.use(cookies.clearCookie('foo'))
  request(http.createServer(app.callback()))
    .get('/')
    .expect(200, (err, res) => {
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
    .expect(200, (err, res) => {
      t.true(res.headers['set-cookie'][0].includes('domain=example.com;'))
      t.end()
    })
})

tape.test('unicode', (t) => {
  const app = new Koa()
  app.use(cookies.setCookie('λ', 'bar'))
  request(http.createServer(app.callback()))
    .get('/')
    .expect(200, (err, res) => {
      const sc = res.headers['set-cookie'][0]
      t.true(sc.includes('%CE%BB=b'))
      t.true(decodeURIComponent(sc).includes('λ'))
      t.end()
    })
})
