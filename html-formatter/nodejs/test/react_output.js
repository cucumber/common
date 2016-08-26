import Stream from "stream"
import React from "react" // eslint-disable-line no-unused-vars
import {shallow} from "enzyme"
import {GherkinDocument, Feature} from "../lib/cucumber_react"

class ReactOutput extends Stream.Writable {
  constructor() {
    super({objectMode: true})
  }

  _write(state, _, callback) {
    this._state = state
    callback()
  }

  getFeatureName() {
    const node = this._state.getIn(['sources', 'features/hello.feature'])

    const gherkinDocumentComp = shallow(<GherkinDocument node={node}/>)
    const featureComp = gherkinDocumentComp.find(Feature)
    return featureComp.prop('node').name
  }
}

export default ReactOutput