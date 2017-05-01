import assert from "assert"
import Gherkin from 'gherkin'

module.exports = function () {
  this.When(/^a new feature at (.*) is streamed:$/, function (uri, gherkinSource, callback) {
    const events = Gherkin.generateEvents(gherkinSource, uri)
    events.forEach(event => this._inputStream.write(event))
    callback()
  })

  this.When(/^the stream is closed$/, function (callback) {
    // Allow messages to arrive on the other side before closing....
    setTimeout(() => {
      this._inputStream.end(callback)
    }, 800)
  })

  this.Then(/^a feature with name "([^"]*)" should be reported$/, function (featureName) {
    return new Promise(resolve => setTimeout(resolve, 800)) // Hack to wait for messages to arrive.
      .then(() => this._output.getFeatureNames())
      .then(featureNames => assert(featureNames.includes(featureName), `Couldn't find ${featureName} among ${featureNames}`))
  })
}
