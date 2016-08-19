const Engine = require('./engine')
const buildWebApp = require('./build_web_app')
const WebServer = require('./web_server')

class App {
  constructor(components) {
    Object.keys(components).forEach(component => {
      Object.defineProperty(this, component, { get: function () { return components[component] } })
    })
  }
}

module.exports = () => {
  const engine = new Engine()
  const webApp = buildWebApp(engine)
  const webServer = new WebServer(engine, webApp)

  return new App({
    engine,
    webApp,
    webServer
  })
}
