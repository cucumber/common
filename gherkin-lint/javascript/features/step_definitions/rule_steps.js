import assert from "assert"

module.exports = function () {
  this.Given(/^the (.+) rule is enabled$/, function (ruleName) {
    this.ruleName = ruleName
  })

  this.Then(/^the following errors should be found:$/, function (errorTable) {
    const expectedError = errorTable.rowsHash()
    assert.deepEqual({
      location: `${this.event.source.uri}:${this.event.source.start.line}:${this.event.source.start.column}`,
      message: this.event.message
    }, expectedError)
  })

  this.Then(/^no error events should be emitted$/, function () {
    assert.equal(this.event, undefined)
  })
}
