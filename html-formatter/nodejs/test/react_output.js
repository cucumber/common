import Stream from "stream"
import React from "react" // eslint-disable-line no-unused-vars
import {render} from "enzyme"
import {Cucumber} from "../lib/cucumber_react"

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

export default ReactOutput