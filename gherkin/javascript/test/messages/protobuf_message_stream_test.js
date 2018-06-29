const assert = require('assert')
const cm = require('cucumber-messages').io.cucumber.messages
const ProtobufMessageStream = require('../../lib/gherkin/messages/protobuf_message_stream')

describe('ProtobufMessageStream', () => {
  it('writes 2 messages', (callback) => {
    const w1 = cm.Wrapper.fromObject({
      source: cm.Source.fromObject({uri: 'w1', data: 'data w1'})
    })
    const w2 = cm.Wrapper.fromObject({
      source: cm.Source.fromObject({uri: 'w2', data: 'data 2'})
    })
    const w3 = cm.Wrapper.fromObject({
      source: cm.Source.fromObject({uri: 'w3', data: 'data in w3'})
    })

    var b1 = cm.Wrapper.encodeDelimited(w1).finish()
    var b2 = cm.Wrapper.encodeDelimited(w2).finish()
    var b3 = cm.Wrapper.encodeDelimited(w3).finish()

    var buffer = Buffer.concat([b1, b2, b3])

    var stream = new ProtobufMessageStream(cm.Wrapper, 1)
    var n = 0
    stream.on('data', message => {
      n++
      if (n === 1) {
        assert.deepEqual(message, w1)
      }
      if (n === 2) {
        assert.deepEqual(message, w2)
      }
      if (n === 3) {
        assert.deepEqual(message, w3)
        callback()
      }
    })
    stream.on('error', err => callback(err))

    var chunkSize = buffer.length
    for (var i = 0; i < buffer.length; i += chunkSize) {
      stream.write(buffer.slice(i, i + chunkSize))
    }
  })
})