import assert from "assert"

module.exports = function () {
  this.Given(/^the (.+) rule is enabled$/, function (ruleName) {
    this.ruleName = ruleName
  })

  this.Then(/^the following warning should emitted:$/, function (errorTable) {
    const expectedError = errorTable.rowsHash()

    assert(Array.isArray(this.warningEvents))
    assert(this.warningEvents.length, 1)

    const event = this.warningEvents[0]
    assert.deepEqual({
      location: `${event.source.uri}:${event.source.start.line}`,
      message: event.message
    }, expectedError)
  })

  this.Then(/^no warnings should be emitted$/, function () {
    assert.deepEqual(this.warningEvents, [])
  })
}
