const Stream = require('stream')
const Socket = require('net').Socket
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

class ToJsonLineStream extends Stream.Transform {
  constructor() {
    super({objectMode: true})
  }

  _transform(line, _, callback) {
    this.push(JSON.stringify(line) + '\n')
    callback()
  }
}

const WEB_PORT = 2222
const SOCKET_PORT = 2223

module.exports = function () {
  this.Before(function () {
    this._app = buildApp()

    const startWebServer = process.env.cucumber_html_formatter_output === 'eventsource' ?
      () => this._app.webServer.start(WEB_PORT) :
      () => Promise.resolve()

    const startSocketServer = process.env.cucumber_html_formatter_input === 'socket' ?
      () => this._app.socketServer.start(SOCKET_PORT) :
      () => Promise.resolve()

    const connectToInputStream = process.env.cucumber_html_formatter_input === 'socket' ?
      () => new Promise((resolve, reject) => {
        const socket = new Socket({writable: true})
        socket.on('connect', () => resolve())
        socket.on('error', reject)
        socket.connect(SOCKET_PORT)

        const toJsonStream = new ToJsonLineStream()
        toJsonStream.pipe(socket)

        this._inputStream = toJsonStream
      }) :
      () => {
        this._inputStream = this._app.engine.openStream()
      }

    const connectToOuptutStream = process.env.cucumber_html_formatter_output === 'eventsource' ?
      () => new Promise((resolve, reject) => {
        this._eventSource = new EventSource(`http://localhost:${WEB_PORT}/sse`)
        this._outputStream = new EventSourceStream(this._eventSource)
        this._eventSource.onopen = () => resolve()
        this._eventSource.onerror = () => reject(new Error("Couln't connect EventSource"))
      }) :
      () => {
        this._outputStream = this._app.engine.openStream()
      }

    this._stopWebServer = process.env.cucumber_html_formatter_output === 'eventsource' ?
      () => this._app.webServer.stop() :
      () => Promise.resolve()

    return startWebServer()
      .then(startSocketServer)
      .then(connectToInputStream)
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
