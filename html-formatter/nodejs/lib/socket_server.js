const net = require('net')
const es = require('event-stream')
const FromJsonStream = require('./from_json_stream')
const dbg = require('debug')
const debug = dbg('cucumber-html:SocketServer')

class SocketServer {
  constructor(eventBus) {
    this._eventBus = eventBus
  }

  start(port, closeEngineStreamOnDisconnect) {
    debug(`start(${port}, ${closeEngineStreamOnDisconnect})`)
    return new Promise((resolve, reject) => {
      this._server = net.createServer(socket => {
        debug('New connection')
        const splitStream = es.split() // deliver individual lines
        const fromJsonStream = new FromJsonStream()
        socket.pipe(splitStream).pipe(fromJsonStream).pipe(this._eventBus, {end: closeEngineStreamOnDisconnect})
        // eslint-disable-next-line no-console
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
