const Stream = require('stream')

class CucumberEventStream extends Stream.Transform {
  constructor() {
    super({objectMode: true})
  }

  _transform(event, _, callback) {
    // TODO: Do some validation
    this.push(event)
    callback()
  }
}

class Engine {
  openStream() {
    return new CucumberEventStream()
  }
}

module.exports = Engine
