const stream = require('stream')
const buildWebApp = require('./build_web_app')
const WebServer = require('./web_server')
const SocketServer = require('./socket_server')

class App {
  constructor(components) {
    Object.keys(components).forEach(component => {
      Object.defineProperty(this, component, {
        get: function () {
          return components[component]
        }
      })
    })
  }
}

module.exports = () => {
  const eventBus = new stream.PassThrough({objectMode: true})
  const webApp = buildWebApp()
  const webServer = new WebServer(webApp, eventBus)
  const socketServer = new SocketServer(eventBus)

  return new App({
    eventBus,
    webApp,
    webServer,
    socketServer
  })
}
