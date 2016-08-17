const Stream = require('stream')
const assert = require('assert')
const Engine = require('../../lib/engine.js')

class SinkStream extends Stream.Writable {
  constructor() {
    super({objectMode: true})
    this.events = []
  }

  _write(event, _, callback) {
    this.events.push(event)
    callback()
  }
}

module.exports = function () {
  const series = "df1d3970-644e-11e6-8b77-86f30ca893d3" // some arbitrary uuid
  let engine, stream, sinkStream
  this.Before(function (callback) {
    engine = new Engine()
    stream = engine.openStream()

    sinkStream = new SinkStream()
    stream.pipe(sinkStream)

    stream.write({
      __type__: "start",
      timestamp: Date.now(),
      series
    }, callback)
  })

  this.When(/^a new feature at (.*) is streamed:$/, function (uri, gherkinSource, callback) {
    this.uri = uri
    this.gherkinSource = gherkinSource

    stream.write({
      __type__: "source",
      timestamp: Date.now(),
      series,
      contentType: "text/plain+gherkin",
      uri,
      data: gherkinSource,
      dataEncoding: "utf-8"
    }, callback)
  })

  this.Then(/^the feature should be reported$/, function (callback) {
    sinkStream.on('finish', () => {
      const sourceEvent = sinkStream.events.find(e => e.__type__ == 'source')
      try {
        assert.equal(sourceEvent.data, this.gherkinSource)
        callback()
      } catch(err) {
        callback(err)
      }
    })
    stream.end()
  })
}
