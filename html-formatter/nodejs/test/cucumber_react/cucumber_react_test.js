import assert from 'assert'
import React from 'react' // eslint-disable-line no-unused-vars
import {shallow} from "enzyme"
import {GherkinDocument, Feature, Scenario, Step} from '../../lib/cucumber_react/cucumber_react'
import reducer from "../../lib/common/reducer"

const events = [
  {"type": "start", "timestamp": 1471614838649, "series": "df1d3970-644e-11e6-8b77-86f30ca893d3"},
  {
    "type": "source",
    "timestamp": 1471614838650,
    "series": "df1d3970-644e-11e6-8b77-86f30ca893d3",
    "uri": "features/hello.feature",
    "data": "Feature: Hello\n  Scenario: World\n    Given hello"
  }
]

describe('Cucumber React', () => {
  describe(GherkinDocument.name, () => {
    it("renders the feature", () => {
      const node = events.reduce(reducer, reducer()).getIn(['sources', 'features/hello.feature'])
      const component = shallow(<GherkinDocument node={node}/>)
      assert.equal(component.find(Feature).length, 1)
    })
  })

  describe(Feature.name, () => {
    it("renders the name", () => {
      const node = events.reduce(reducer, reducer()).getIn(['sources', 'features/hello.feature', 'feature'])
      const component = shallow(<Feature node={node}/>)
      assert.equal(component.find('.name').text(), 'Hello')
    })

    it("renders the scenario", () => {
      const node = events.reduce(reducer, reducer()).getIn(['sources', 'features/hello.feature', 'feature'])
      const component = shallow(<Feature node={node}/>)
      assert.equal(component.find(Scenario).length, 1)
    })
  })

  describe(Scenario.name, () => {
    it("renders the name", () => {
      const node = events.reduce(reducer, reducer()).getIn(['sources', 'features/hello.feature', 'feature', 'children', 0])
      const component = shallow(<Scenario node={node}/>)
      assert.equal(component.find('.name').text(), 'World')
    })

    it("renders the step", () => {
      const node = events.reduce(reducer, reducer()).getIn(['sources', 'features/hello.feature', 'feature', 'children', 0])
      const component = shallow(<Scenario node={node}/>)
      assert.equal(component.find(Step).length, 1)
    })
  })
})