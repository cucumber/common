const enableDestroy = require('server-destroy')
const EventSourceBroadcastStream = require('./event_source_broadcast_stream')

class WebServer {
  constructor(engine, webApp) {
    this._engine = engine
    this._webApp = webApp
  }

  start(port) {
    return new Promise((resolve, reject) => {
      this._server = this._webApp.listen(port, err => {
        if (err) return reject(err)
        const esStream = new EventSourceBroadcastStream(this._server, '/sse', 20000)
        this._engine.openStream().pipe(esStream)
        resolve(port)
      })
      enableDestroy(this._server)
    })
  }

  stop() {
    return new Promise((resolve, reject) => {
      this._server.destroy(err => {
        if (err) return reject(err)
        resolve()
      })
    })
  }
}

module.exports = WebServer