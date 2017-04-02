/* eslint-env mocha */
const assert = require('assert')
const Stream = require('stream')
const Gherkin = require('gherkin')
const arrayToStream = require('./array_to_stream')
const streamToArray = require('./stream_to_array')
const ReducerStream = require('../lib/reducer_stream')

describe(ReducerStream.name, () => {
  it("reduces events to state", () => {
    const data = "Feature: Hello\n  Scenario: World\n    Given hello"
    const uri = "features/hello.feature"
    const events = Gherkin.events(data, uri, { source: true, gherkinDocument: true, pickles: true })

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
