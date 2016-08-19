const assert = require('assert')

module.exports = function () {
  const series = "df1d3970-644e-11e6-8b77-86f30ca893d3" // some arbitrary uuid

  this.When(/^a new feature at (.*) is streamed:$/, function (uri, gherkinSource, callback) {
    this._gherkinSource = gherkinSource

    this._inputStream.write({
      __type__: "start",
      timestamp: Date.now(),
      series
    })
    this._inputStream.write({
      __type__: "source",
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


  this.Then(/^the feature should be reported$/, function () {
    return new Promise(resolve => setTimeout(resolve, 800)) // Hack to wait for messages to arrive.
      .then(() => {
        const sourceEvent = this._sinkStream.events.find(e => e.__type__ == 'source')
        assert.equal(sourceEvent.data, this._gherkinSource)
      })
  })
}
