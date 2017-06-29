const assert = require('assert')
const fs = require('fs')
const EventStream = require('../../lib/gherkin/stream/event_stream')

describe('EventStream', () => {
  it("transforms input to stream", (callback) => {
    const events = []
    const eventStream = new EventStream('test.feature', {
      'source': true,
      'gherkin-document': true,
      'pickle': true
    })
    eventStream.on('data', data => events.push(data))
    eventStream.on('end', () => {
      assert.equal(events.length, 3)
      assert.deepEqual(events.map(e => e.uri), ['test.feature', 'test.feature', 'test.feature'])
      callback()
    })
    fs.createReadStream(__dirname + '/test.feature', { encoding: 'utf-8' }).pipe(eventStream)
  })
})