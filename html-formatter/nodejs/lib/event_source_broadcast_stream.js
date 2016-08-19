const Stream = require('stream')
const SSE = require('sse')

class ConnectionStream extends Stream.Writable {
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

class EventSourceBroadcastStream extends Stream.PassThrough {
  constructor(server, path, pingIntervallMillis) {
    super({objectMode: true})
    const sse = new SSE(server, {path})

    sse.on('connection', eventSourceConnection => {
      const connectionStream = new ConnectionStream(eventSourceConnection, pingIntervallMillis)
      this.pipe(connectionStream)
      eventSourceConnection.on('close', () => {
        this.unpipe(connectionStream)
        connectionStream.end()
      })
    })
  }
}

module.exports = EventSourceBroadcastStream
