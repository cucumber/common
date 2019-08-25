const assert = require('assert')
const fs = require('fs')
const EventStream = require('../../../src/legacy/gherkin/stream/event_stream')

describe('EventStream (legacy)', () => {
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
      assert.deepEqual(events.map(e => Object.values(e)[0].uri), ['test.feature', 'test.feature', 'test.feature'])
      callback()
    })
    fs.createReadStream(__dirname + '/test.feature', { encoding: 'utf-8' }).pipe(eventStream)
  })

  it("accepts a language parameter", (callback) => {
    const events = []
    const eventStream = new EventStream('test_fr.feature', {
      'source': true,
      'gherkin-document': true,
      'pickle': true
    }, 'fr')
    eventStream.on('data', data => events.push(data))
    eventStream.on('end', () => {
      assert.equal(events.length, 3)
      assert.deepEqual(events.map(e => Object.values(e)[0].uri), ['test_fr.feature', 'test_fr.feature', 'test_fr.feature'])
      callback()
    })
    fs.createReadStream(__dirname + '/test_fr.feature', { encoding: 'utf-8' }).pipe(eventStream)
  })
})
