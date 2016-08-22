import Stream from "stream"
import {Socket} from "net"
import EventSource from "eventsource"
import buildApp from "../../lib/build_app"
import EventSourceStream from "../../test/event_source_stream"
import ReactOutput from "../../test/react_output"
import ReducerOutput from "../../test/reducer_output"

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

    const createEventSourceOutput = () => this._app.webServer.start(WEB_PORT)
      .then(() => new Promise((resolve, reject) => {
        const eventSource = new EventSource(`http://localhost:${WEB_PORT}/sse`)
        const outputStream = new EventSourceStream(eventSource)
        this._output = new ReducerOutput()
        outputStream.pipe(this._output)
        eventSource.onopen = () => resolve(this._output)
        eventSource.onerror = () => reject(new Error("Couln't connect EventSource"))
      }))

    const createReactOutput = () => {
      this._output = new ReactOutput()
      this._app.engine.openStream().pipe(this._output)
      return Promise.resolve(this._output)
    }

    const createReducerOutput = () => {
      this._output = new ReducerOutput()
      this._app.engine.openStream().pipe(this._output)
      return Promise.resolve(this._output)
    }

    let createOutput
    switch (process.env.cucumber_html_formatter_output) {
      case 'eventsource':
        createOutput = createEventSourceOutput
        break
      case 'react':
        createOutput = createReactOutput
        break
      default:
        createOutput = createReducerOutput
        break
    }

    // Input

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

    const connectInput = process.env.cucumber_html_formatter_input === 'socket' ?
      connectToSocket :
      connectToEngineStream

    return createOutput()
      .then(output => this._output = output)
      .then(connectInput)
      .then(inputStream => this._inputStream = inputStream)
  })

  this.After(function () {
    return this._stopWebServer()
  })
}
