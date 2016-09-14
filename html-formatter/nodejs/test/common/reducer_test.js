/* eslint-env mocha */
import assert from "assert"
import reducer from "../../lib/common/reducer"

describe(reducer.name, () => {
  it("keeps a map of sources", () => {
    const events = [
      {"type": "start", "timestamp": 1471614838649, "series": "df1d3970-644e-11e6-8b77-86f30ca893d3"},
      {
        "type": "source",
        "timestamp": 1471614838650,
        "series": "df1d3970-644e-11e6-8b77-86f30ca893d3",
        "uri": "features/hello.feature",
        "data": "Feature: Hello\n"
      },
      {
        "type": "source",
        "timestamp": 1471614838650,
        "series": "df1d3970-644e-11e6-8b77-86f30ca893d3",
        "uri": "features/world.feature",
        "data": "Feature: World\n"
      }
    ]

    const state = events.reduce(reducer, reducer())

    const featureNames = Array.from(state.get('sources').values()).map(gherkinDocument => gherkinDocument.getIn(['feature', 'name']))
    assert.deepEqual(featureNames, ['Hello', 'World'])
  })

  it("links attachments to line number", () => {
    const events = [
      {"type": "start", "timestamp": 1471614838649, "series": "df1d3970-644e-11e6-8b77-86f30ca893d3"},
      {
        "type": "source",
        "timestamp": 1471614838650,
        "series": "df1d3970-644e-11e6-8b77-86f30ca893d3",
        "uri": "features/hello.feature",
        "data": "Feature: Hello\n"
      },
      {
        "type": "attachment",
        "timestamp": 1471420027078,
        "series": "df1d3970-644e-11e6-8b77-86f30ca893d3",
        "source": {
          "uri": "features/hello.feature",
          "start": {
            "line": 22,
            "column": 7
          }
        },
        "uri": "build/screenshots/hello.png"
      },
      {
        "type": "attachment",
        "timestamp": 1471420027078,
        "series": "df1d3970-644e-11e6-8b77-86f30ca893d3",
        "source": {
          "uri": "features/hello.feature",
          "start": {
            "line": 22,
            "column": 7
          }
        },
        "uri": "build/screenshots/world.png"
      }
    ]

    const state = events.reduce(reducer, reducer())

    const attachments = state.getIn(['sources', 'features/hello.feature', 'attachments', 22])
    assert.deepEqual(attachments.toJS(), [
      { uri: 'build/screenshots/hello.png', data: undefined, media: undefined },
      { uri: 'build/screenshots/world.png', data: undefined, media: undefined }
    ])
  })
})