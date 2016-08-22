import assert from "assert"

module.exports = function () {
  const series = "df1d3970-644e-11e6-8b77-86f30ca893d3" // some arbitrary uuid

  this.When(/^a new feature at (.*) is streamed:$/, function (uri, gherkinSource, callback) {
    this._inputStream.write({
      type: "start",
      timestamp: Date.now(),
      series
    })
    this._inputStream.write({
      type: "source",
      timestamp: Date.now(),
      series,
      contentType: "text/plain+gherkin",
      uri,
      data: gherkinSource,
      dataEncoding: "utf-8"
    }, callback)
  })

  this.When(/^the stream is closed$/, function (callback) {
    this._inputStream.end(callback)
  })


  this.Then(/^a feature with name "([^"]*)" should be reported$/, function (featureName) {
    return new Promise(resolve => setTimeout(resolve, 800)) // Hack to wait for messages to arrive.
      .then(() => {
        assert.equal(this._output.getFeatureName(), featureName)
      })
  })
}
