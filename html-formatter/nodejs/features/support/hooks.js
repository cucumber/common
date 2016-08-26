import Stream from "stream"
import {Socket} from "net"
import buildApp from "../../lib/build_app"
import ReduceStream from "../../lib/reduce_stream"
import EventSourceStream from "../../test/event_source_stream"
import ReactOutput from "../../test/react_output"
import StateOutput from "../../test/state_output"

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

    // es -> reduce ->  state
    // When the stream is closed
    //    inputStream.end() (writable)
    //    es.flush()
    const createEventSourceOutput = () => this._app.webServer.start(WEB_PORT)
      .then(() => new Promise((resolve, reject) => {
        const outputStream = new EventSourceStream(`http://localhost:${WEB_PORT}/sse`)
        this._output = new StateOutput()
        outputStream.pipe(new ReduceStream()).pipe(this._output)
        outputStream.on('open', () => resolve(this._output)) // TODO: Look up stream API for proper event
        outputStream.on('error', reject)
      }))

    const createReactOutput = () => {
      this._output = new ReactOutput()
      this._app.engine.openStream().pipe(new ReduceStream()).pipe(this._output)
      return Promise.resolve(this._output)
    }

    const createReducerOutput = () => {
      this._output = new StateOutput()
      this._app.engine.openStream().pipe(new ReduceStream()).pipe(this._output)
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
