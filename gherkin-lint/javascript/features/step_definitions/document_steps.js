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
      if(this.ruleName == 'implementation-detail') {
        this.event = {
          "type": "error",
          "source": {
            "uri": this.path,
            "start": {
              "line": 4,
              "column": 26
            }
          },
          "message": "(4:26): Implementation detail: button"
        }
      }
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
}