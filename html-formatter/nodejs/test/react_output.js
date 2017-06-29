const Stream = require('stream')
const React = require('react')
const { render } = require('enzyme')
const { Cucumber } = require('cucumber-react')

class ReactOutput extends Stream.Writable {
  constructor() {
    super({objectMode: true})
  }

  _write(state, _, callback) {
    this._state = state
    callback()
  }

  getFeatureNames() {
    const cucumber = render(<Cucumber sources={this._state.get('sources')}/>)
    return Promise.resolve(cucumber.find('.feature > .name').text())
  }
}

module.exports = ReactOutput
