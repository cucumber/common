const Stream = require('stream')

class StateOutput extends Stream.Writable {
  constructor() {
    super({objectMode: true})
  }

  _write(state, _, callback) {
    this._state = state
    callback()
  }

  getFeatureNames() {
    return Promise.resolve(
      Array.from(this._state.get('sources').values())
        .map(gherkinDocument => gherkinDocument.getIn(['feature', 'name'])))
  }
}

module.exports = StateOutput
