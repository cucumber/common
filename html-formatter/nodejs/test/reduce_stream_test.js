import assert from "assert"
import Stream from "stream"
import arrayToStream from './array_to_stream'
import streamToArray from './stream_to_array'
import ReduceStream from '../lib/reduce_stream'

describe(ReduceStream.name, () => {
  it("reduces events to state", () => {
    const events = [
      {"type": "start", "timestamp": 1471614838649, "series": "df1d3970-644e-11e6-8b77-86f30ca893d3"},
      {
        "type": "source",
        "timestamp": 1471614838650,
        "series": "df1d3970-644e-11e6-8b77-86f30ca893d3",
        "contentType": "text/plain+gherkin",
        "uri": "features/hello.feature",
        "data": "Feature: Hello\n  Scenario: World\n    Given hello",
        "dataEncoding": "utf-8"
      }
    ]

    const reduceStream = new ReduceStream()
    const passthru = new Stream.PassThrough({objectMode: true})
    arrayToStream(events)
      .pipe(reduceStream)
      .pipe(passthru)

    return streamToArray(passthru)
      .then(states => assert.deepEqual(states[0].get('sources').get('features/hello.feature').feature.name, 'Hello'))
  })
})