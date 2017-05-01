/* eslint-env mocha */
const assert = require('assert')
const Gherkin = require('gherkin')
const arrayToStream = require('./array_to_stream')
const streamToArray = require('./stream_to_array')
const ReducerStream = require('../lib/reducer_stream')
const HtmlStream = require('../lib/html_stream')

describe(HtmlStream.name, () => {
  it("writes HTML from state", () => {
    const data = "Feature: Hello\n  Scenario: World\n    Given hello"
    const uri = "features/hello.feature"
    const events = Gherkin.generateEvents(data, uri)
    const reducerStream = new ReducerStream()
    const htmlStream = new HtmlStream()
    arrayToStream(events)
      .pipe(reducerStream)
      .pipe(htmlStream)

    return streamToArray(htmlStream)
      .then(htmls => {
        const html = htmls[0]
        assert(html.match(/Hello<\/span>/), html)
      })
  })
})
