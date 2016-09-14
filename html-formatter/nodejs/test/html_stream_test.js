/* eslint-env mocha */
import assert from 'assert'
import arrayToStream from './array_to_stream'
import streamToArray from './stream_to_array'
import ReducerStream from '../lib/reducer_stream'
import HtmlStream from '../lib/html_stream'

describe(HtmlStream.name, () => {
  it("writes HTML from state", () => {
    const events = [
      {"type": "start", "timestamp": 1471614838649, "series": "df1d3970-644e-11e6-8b77-86f30ca893d3"},
      {
        "type": "source",
        "timestamp": 1471614838650,
        "series": "df1d3970-644e-11e6-8b77-86f30ca893d3",
        "uri": "features/hello.feature",
        "data": "Feature: Hello\n  Scenario: World\n    Given hello"
      }
    ]

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