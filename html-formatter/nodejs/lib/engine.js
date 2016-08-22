import Stream from "stream"

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
  constructor() {
    this._stream = new CucumberEventStream()
  }

  openStream() {
    return this._stream
  }
}

export default Engine
