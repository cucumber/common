/* eslint-env mocha */
import assert from "assert"
import Stream from "stream"
import arrayToStream from './array_to_stream'
import streamToArray from './stream_to_array'
import ReducerStream from '../lib/reducer_stream'

describe(ReducerStream.name, () => {
  it("reduces events to state", () => {
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
    const passthru = new Stream.PassThrough({objectMode: true})
    arrayToStream(events)
      .pipe(reducerStream)
      .pipe(passthru)

    return streamToArray(passthru)
      .then(states => assert.deepEqual(
        states[0].getIn(['sources', 'features/hello.feature', 'feature', 'name']),
        'Hello'
      ))
  })
})