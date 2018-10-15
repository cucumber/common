/* eslint-env mocha */
const assert = require('assert')
const cm = require('cucumber-messages').io.cucumber.messages
const ProtobufMessageStream = require('../src/ProtobufMessageStream')

describe('ProtobufMessageStream', () => {
  it('writes 2 messages', callback => {
    const w1 = cm.EventWrapper.fromObject({
      source: cm.Source.fromObject({ uri: 'w1', data: 'data w1' }),
    })
    const w2 = cm.EventWrapper.fromObject({
      source: cm.Source.fromObject({ uri: 'w2', data: 'data 2' }),
    })
    const w3 = cm.EventWrapper.fromObject({
      source: cm.Source.fromObject({ uri: 'w3', data: 'data in w3' }),
    })

    const b1 = cm.EventWrapper.encodeDelimited(w1).finish()
    const b2 = cm.EventWrapper.encodeDelimited(w2).finish()
    const b3 = cm.EventWrapper.encodeDelimited(w3).finish()

    const buffer = Buffer.concat([b1, b2, b3])

    const stream = new ProtobufMessageStream(cm.EventWrapper)
    let n = 0
    stream.on('data', message => {
      n++
      if (n === 1) {
        assert.deepStrictEqual(message, w1)
      }
      if (n === 2) {
        assert.deepStrictEqual(message, w2)
      }
      if (n === 3) {
        assert.deepStrictEqual(message, w3)
        callback()
      }
    })
    stream.on('error', err => callback(err))

    const chunkSize = buffer.length
    for (let i = 0; i < buffer.length; i += chunkSize) {
      stream.write(buffer.slice(i, i + chunkSize))
    }
  })
})
