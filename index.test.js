const tape = require('tape')
const cookies = require('./')

tape.test('cookies', (t) => {
  t.ok(cookies, 'fake test')
  t.end()
})
