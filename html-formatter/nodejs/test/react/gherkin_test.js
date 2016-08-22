const assert = require('assert')
const Gherkin = require('gherkin')
const React = require('react')
const Map = require('immutable').Map
const OrderedMap = require('immutable').Map
const fromJS = require('immutable').fromJS
import {shallow} from "enzyme"

const parser = new Gherkin.Parser()

const reducer = (state, action) => {
  switch (action.__type__) {
    case 'start':
      return state.set('sources', OrderedMap())
    case 'source':
      const gherkinDocument = parser.parse(action.data)
      return state.setIn(['sources', action.uri], gherkinDocument)
    default:
      throw new Error("Unsupported action: " + JSON.stringify(action))
  }
}

const GherkinDocument = ({node}) => <div>
  <Feature node={node.feature}/>
</div>


const Feature = ({node}) => <div>
  <h1><span>{node.keyword}: </span><span>{node.name}</span></h1>
</div>

describe('Gherkin.jsx', () => {
  it("renders the feature header", () => {
    const initialState = Map()

    // taken from example.txt
    const events = [
      {"__type__": "start", "timestamp": 1471614838649, "series": "df1d3970-644e-11e6-8b77-86f30ca893d3"},
      {
        "__type__": "source",
        "timestamp": 1471614838650,
        "series": "df1d3970-644e-11e6-8b77-86f30ca893d3",
        "contentType": "text/plain+gherkin",
        "uri": "features/hello.feature",
        "data": "Feature: Hello\n  Scenario: World\n    Given hello",
        "dataEncoding": "utf-8"
      }
    ]

    const state = events.reduce(reducer, initialState)
    const gherkinDocumentComp = shallow(<GherkinDocument node={state.getIn(['sources', 'features/hello.feature'])}/>)
    const featureComp = gherkinDocumentComp.find(Feature)

    assert.equal(featureComp.prop('node').name, 'Hello')
  })
})