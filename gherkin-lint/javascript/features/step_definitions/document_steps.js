import assert from "assert"
import Gherkin from "gherkin"

const parser = new Gherkin.Parser()

module.exports = function () {
  this.Given(/^a Gherkin document at (.*) with contents:$/, function (path, source) {
    this.path = path
    this.source = source
  })

  this.When(/^the document is linted$/, function () {
    try {
      this.gherkinDocument = parser.parse(this.source)
    } catch (err) {
      // If err is a Gherkin.Errors.CompositeParserException then there are more errors on the .errors property
      const errors = err.errors || [err]
      for (const e of errors) {
        this.event = {
          "type": "error",
          "source": {
            "uri": this.path,
            "start": e.location
          },
          "message": e.message
        }
      }
    }
  })

  this.Then(/^the following event should be emitted:$/, function (json) {
    const expectedEvent = JSON.parse(json)
    assert.deepEqual(this.event, expectedEvent)
  })
}