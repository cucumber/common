const Stream = require('stream')
const EventSource = require('eventsource')
const EventSourceStream = require('./../../test/readable_event_source_stream')
const buildApp = require('../../lib/build_app')

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
  this.Before(function () {
    this._app = buildApp()
    this._inputStream = this._app.engine.openStream()

    const startWebServer = process.env.cucumber_html_formatter_output === 'eventsource' ?
      () => this._app.webServer.start(2222) :
      () => Promise.resolve()

    const connectToOuptutStream = process.env.cucumber_html_formatter_output === 'eventsource' ?
      () => new Promise((resolve, reject) => {
        this._eventSource = new EventSource('http://localhost:2222/sse')
        this._outputStream = new EventSourceStream(this._eventSource)
        this._eventSource.onopen = () => resolve()
        this._eventSource.onerror = () => reject(new Error("Couln't connect EventSource"))
      }) :
      () => {
        this._outputStream = this._inputStream
      }

    this._stopWebServer = process.env.cucumber_html_formatter_output === 'eventsource' ?
      () => this._app.webServer.stop() :
      () => Promise.resolve()

    return startWebServer()
      .then(connectToOuptutStream)
      .then(() => {
        this._sinkStream = new SinkStream()
        this._outputStream.pipe(this._sinkStream)
      })
  })

  this.After(function () {
    return this._stopWebServer()
  })
}
