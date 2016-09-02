import assert from 'assert'
import React from 'react' // eslint-disable-line no-unused-vars
import {shallow} from "enzyme"
import {GherkinDocument, Feature} from '../../lib/cucumber_react/cucumber_react'
import reducer from "../../lib/common/reducer"

describe('Cucumber React', () => {
  it("renders the feature header", () => {
    // taken from example.txt
    const events = [
      {"type": "start", "timestamp": 1471614838649, "series": "df1d3970-644e-11e6-8b77-86f30ca893d3"},
      {
        "type": "source",
        "timestamp": 1471614838650,
        "series": "df1d3970-644e-11e6-8b77-86f30ca893d3",
        "contentType": "text/plain+gherkin",
        "uri": "features/hello.feature",
        "data": "Feature: Hello\n  Scenario: World\n    Given hello",
        "dataEncoding": "utf-8"
      }
    ]

    const state = events.reduce(reducer, reducer())
    const gherkinDocumentComp = shallow(<GherkinDocument node={state.getIn(['sources', 'features/hello.feature'])}/>)
    const featureComp = gherkinDocumentComp.find(Feature)

    assert.equal(featureComp.prop('node').get('name'), 'Hello')
  })
})