const net = require('net')
const es = require('event-stream')
const FromJsonStream = require('./from_json_stream')

class SocketServer {
  constructor(engine) {
    this._engine = engine
  }

  start(port) {
    return new Promise((resolve, reject) => {
      this._server = net.createServer(socket => {
        const splitStream = es.split() // deliver individual lines
        const fromJsonStream = new FromJsonStream()
        socket.pipe(splitStream).pipe(fromJsonStream).pipe(this._engine.openStream(), {end: false})
        socket.on('error', err => console.error(err.stack))
      })
      this._server.listen(port, err => {
        if (err) return reject(err)
        resolve()
      })
    })
  }
}

module.exports = SocketServer