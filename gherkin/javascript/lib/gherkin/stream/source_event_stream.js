var Stream = require('stream')
var fs = require('fs')

function sourceEventStream(paths) {
  var stream = new Stream.PassThrough({objectMode: true})
  Promise.all(paths.map(function (path) {
    return new Promise(function (resolve, reject) {
      fs.readFile(path, 'utf-8', function (err, data) {
        if (err) return reject(err)
        resolve({
          type: 'source',
          uri: path,
          data: data,
          media: {
            encoding: 'utf-8',
            type: 'text/vnd.cucumber.gherkin+plain'
          }
        })
      })
    })
  }))
    .then(function (events) {
      events.forEach(function (event) {
        stream.write(event)
      })
    })
  return stream
}

module.exports = sourceEventStream