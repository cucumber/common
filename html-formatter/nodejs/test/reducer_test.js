import assert from "assert"
import reducer from "../lib/reducer"

describe(reducer.name, () => {
  it("keeps a map of sources", () => {
    const events = [
      {"type": "start", "timestamp": 1471614838649, "series": "df1d3970-644e-11e6-8b77-86f30ca893d3"},
      {
        "type": "source",
        "timestamp": 1471614838650,
        "series": "df1d3970-644e-11e6-8b77-86f30ca893d3",
        "contentType": "text/plain+gherkin",
        "uri": "features/hello.feature",
        "data": "Feature: Hello\n",
        "dataEncoding": "utf-8"
      },
      {
        "type": "source",
        "timestamp": 1471614838650,
        "series": "df1d3970-644e-11e6-8b77-86f30ca893d3",
        "contentType": "text/plain+gherkin",
        "uri": "features/world.feature",
        "data": "Feature: World\n",
        "dataEncoding": "utf-8"
      }
    ]

    const state = events.reduce(reducer, reducer())

    const featureNames = Array.from(state.get('sources').values()).map(gherkinDocument => gherkinDocument.getIn(['feature', 'name']))
    assert.deepEqual(featureNames, ['Hello', 'World'])
  })
})