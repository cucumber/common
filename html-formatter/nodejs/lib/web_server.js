const enableDestroy = require('server-destroy')
const streamEventSourceNotifications = require('./stream_event_source_notifications')

class WebServer {
  constructor(engine, webApp) {
    this._engine = engine
    this._webApp = webApp
  }

  start(port) {
    return new Promise((resolve, reject) => {
      this._server = this._webApp.listen(port, err => {
        if (err) return reject(err)

        streamEventSourceNotifications(this._server, '/sse', this._engine.openStream(), 20000)
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