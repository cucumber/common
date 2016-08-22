import Stream from "stream"
import reducer from "../lib/reducer"
import React from "react" // eslint-disable-line no-unused-vars
import {shallow} from "enzyme"
import {GherkinDocument, Feature} from "../lib/cucumber_react"

class ReactOutput extends Stream.Writable {
  constructor() {
    super({objectMode: true})
    this.state = reducer()
  }

  _write(event, _, callback) {
    this.state = reducer(this.state, event)
    callback()
  }

  getFeatureName() {
    const node = this.state.getIn(['sources', 'features/hello.feature'])

    const gherkinDocumentComp = shallow(<GherkinDocument node={node}/>)
    const featureComp = gherkinDocumentComp.find(Feature)
    return featureComp.prop('node').name
  }
}

module.exports = ReactOutput