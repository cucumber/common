import stream from "stream"
import buildWebApp from "./build_web_app"
import WebServer from "./web_server"
import SocketServer from "./socket_server"

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

export default () => {
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
