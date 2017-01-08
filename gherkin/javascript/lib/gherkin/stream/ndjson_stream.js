var Stream = require('stream')

function ndjsonStream() {
  return new Stream.Transform({
    objectMode: true,
    transform: function (event, _, callback) {
      this.push(JSON.stringify(event) + "\n")
      callback()
    }
  })
}

module.exports = ndjsonStream