import Stream from "stream"

class StateOutput extends Stream.Writable {
  constructor() {
    super({objectMode: true})
  }

  _write(state, _, callback) {
    this._state = state
    callback()
  }

  getFeatureName() {
    return this._state.getIn(['sources', 'features/hello.feature']).feature.name
  }
}

export default StateOutput