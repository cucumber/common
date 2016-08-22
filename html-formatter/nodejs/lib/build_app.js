import Engine from "./engine"
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
  const engine = new Engine()
  const webApp = buildWebApp(engine)
  const webServer = new WebServer(engine, webApp)
  const socketServer = new SocketServer(engine)

  return new App({
    engine,
    webApp,
    webServer,
    socketServer
  })
}
