import net from "net"
import es from "event-stream"
import FromJsonStream from "./from_json_stream"
import dbg from "debug"
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

export default SocketServer
