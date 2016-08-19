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

    this._stopWebServer = process.env.cucumber_html_formatter_output === 'eventsource' ?
      () => this._app.webServer.stop() :
      () => Promise.resolve()

    const connectToEventSource = () => this._app.webServer.start(WEB_PORT)
      .then(() => new Promise((resolve, reject) => {
        const eventSource = new EventSource(`http://localhost:${WEB_PORT}/sse`)
        const outputStream = new EventSourceStream(eventSource)
        eventSource.onopen = () => resolve(outputStream)
        eventSource.onerror = () => reject(new Error("Couln't connect EventSource"))
      }))
    
    const connectToSocket = () => this._app.socketServer.start(SOCKET_PORT)
      .then(() => new Promise((resolve, reject) => {
        const socket = new Socket({writable: true})
        const toJsonStream = new ToJsonLineStream()
        toJsonStream.pipe(socket)

        socket.on('connect', () => resolve(toJsonStream))
        socket.on('error', reject)
        socket.connect(SOCKET_PORT)
      }))

    const connectToEngineStream = () => Promise.resolve(this._app.engine.openStream())

    const connectOutput = process.env.cucumber_html_formatter_output === 'eventsource' ?
      connectToEventSource :
      connectToEngineStream

    const connectInput = process.env.cucumber_html_formatter_input === 'socket' ?
      connectToSocket :
      connectToEngineStream

    return connectOutput()
      .then(outputStream => outputStream.pipe(this._sinkStream = new SinkStream()))
      .then(connectInput)
      .then(inputStream => this._inputStream = inputStream)
  })

  this.After(function () {
    return this._stopWebServer()
  })
}
