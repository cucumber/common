import Stream from "stream"
import reducer from "../lib/reducer"

// TODO: Extract ReducerStream
class ReducerOutput extends Stream.Writable {
  constructor() {
    super({objectMode: true})
    this.state = reducer()
  }

  _write(event, _, callback) {
    this.state = reducer(this.state, event)
    callback()
  }

  getFeatureName() {
    return this.state.getIn(['sources', 'features/hello.feature']).feature.name
  }
}

module.exports = ReducerOutput