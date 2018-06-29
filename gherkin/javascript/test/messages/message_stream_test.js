const assert = require('assert')
const fs = require('fs')
const SourceStream = require('../../lib/gherkin/messages/source_stream')
const MessageStream = require('../../lib/gherkin/messages/message_stream')

describe('MessageStream', () => {
  it("transforms input to messages", (callback) => {
    const messages = []
    const eventStream = new MessageStream({
      includeSource: true,
      includeGherkinDocument: true,
      includePickles: true
    })
    eventStream.on('data', message => messages.push(message))
    eventStream.on('end', () => {
      assert.equal(messages.length, 3)
      callback()
    })
    fs.createReadStream(__dirname + '/test.feature', {encoding: 'UTF-8'}).pipe(new SourceStream('test.feature')).pipe(eventStream)
  })

  it("accepts a language parameter", (callback) => {
    const messages = []
    const eventStream = new MessageStream({
      includeSource: true,
      includeGherkinDocument: true,
      includePickles: true,
    }, 'fr')
    eventStream.on('data', message => messages.push(message))
    eventStream.on('end', () => {
      assert.equal(messages.length, 3)
      callback()
    })
    fs.createReadStream(__dirname + '/test_fr.feature', {encoding: 'UTF-8'}).pipe(new SourceStream('test.feature')).pipe(eventStream)
  })
})
