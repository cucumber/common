const assert = require('assert')

// A better assert.error that allows an exact error message
module.exports = (fn, message) => {
  const regexp = new RegExp(message.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&'))
  assert.throws(fn, regexp)
}
