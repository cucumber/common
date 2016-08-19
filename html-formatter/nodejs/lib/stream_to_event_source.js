const Stream = require('stream')
const EventEmitter = require('events').EventEmitter
const SSE = require('sse')

class WritableEventSourceStream extends Stream.Writable {
  constructor(eventSourceConnection, pingIntervalMs) {
    super({objectMode: true})
    this._eventSourceConnection = eventSourceConnection
    const pingInterval = setInterval(
      () => this._eventSourceConnection.send({event: 'ping', data: Date.now().toString()}),
      pingIntervalMs
    )
    this.on('finish', () => clearInterval(pingInterval))
  }

  _write(event, _, callback) {
    const json = JSON.stringify(event)
    this._eventSourceConnection.send({data: json})
    callback()
  }
}

const streamToEventSource = (server, path, readableEventStream, pingIntervalMs) => {
  const sse = new SSE(server, {path})
  const emitter = new EventEmitter()

  sse.on('connection', eventSourceConnection => {
    const writableStream = new WritableEventSourceStream(eventSourceConnection, pingIntervalMs)

    emitter.emit('open', writableStream)
    readableEventStream.pipe(writableStream)

    eventSourceConnection.on('close', () => {
      emitter.emit('close', writableStream)
      readableEventStream.unpipe(writableStream)
      writableStream.end()
    })
  })
  return emitter
}

module.exports = streamToEventSource
