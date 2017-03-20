/* eslint-env mocha */
const assert = require('assert')
const gherkinEvents = require('./gherkinEvents')
const eventValidator = require('cucumber-event-validator')
const {
  reducer,
  lineAttachments,
  featureNames
} = require('../src')

const media = {
  "encoding": "utf-8",
  "type": "text/vnd.cucumber.stacktrace.java+plain"
}

function attachmentEvent(uri, line, data) {
  return {
    "type": "attachment",
    "source": {
      "uri": uri,
      "start": {
        "line": line,
        "column": 1
      }
    },
    "data": data,
    "media": media
  }
}

describe(reducer.name, () => {
  it("keeps a map of parsed gherkin AST documents", async function() {
    const events = []
      .concat(await gherkinEvents("features/hello.feature", "Feature: Hello F\nScenario: Hello S\nGiven hello g"))
      .concat(await gherkinEvents("features/world.feature", "Feature: World F\nScenario: World S\nGiven world g"))

    const state = events.reduce(reducer, reducer())
    assert.deepEqual(featureNames(state), ['Hello F', 'World F'])
  })

  it("links attachments to line number", async function() {
    const data1 = "Exception in thread \"main\" java.lang.NullPointerException\n"
    const data2 = "Exception in thread \"main\" java.lang.RuntimeException\n"

    const events = []
      .concat(await gherkinEvents("features/hello.feature", "Feature: Hello F\nScenario: Hello S\nGiven hello g"))
      .concat(await gherkinEvents("features/world.feature", "Feature: World F\nScenario: World S\nGiven world g"))
      .concat([
        attachmentEvent("features/hello.feature", 22, data1),
        attachmentEvent("features/hello.feature", 22, data2)
      ])

    const state = events.reduce(reducer, reducer())
    const attachments = lineAttachments(state, 'features/hello.feature', 22)
    assert.deepEqual(attachments.toJS(), [
      { data: data1, media },
      { data: data2, media }
    ])
  })
})
