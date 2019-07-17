import { messages, ProtobufMessageStream } from '../src'
import { PassThrough, Readable, Writable } from 'stream'
import assert = require('assert')

import Source = messages.Source
import Attachment = messages.Attachment
import Envelope = messages.Envelope

describe('messages', () => {
  it('can be serialised over a stream', async () => {
    const outgoingMessages: Envelope[] = createOutgoingMessages()

    const out = new PassThrough()
    const input = out.pipe(
      new ProtobufMessageStream(Envelope.decodeDelimited.bind(Envelope))
    )

    writeOutgoingMessages(outgoingMessages, out)
    const incomingMessages: Envelope[] = await readIncomingMessages(input)

    assert.deepStrictEqual(incomingMessages, outgoingMessages)
  })

  function createOutgoingMessages() {
    return [
      Envelope.create({ source: Source.create({ data: 'Feature: Hello' }) }),
      Envelope.create({
        attachment: Attachment.create({ data: 'Some stack trace' }),
      }),
    ]
  }

  function writeOutgoingMessages(
    outgoingMessages: Envelope[],
    output: Writable
  ) {
    for (const outgoingMessage of outgoingMessages) {
      const chunk = Envelope.encodeDelimited(outgoingMessage).finish()
      output.write(chunk)
    }
    output.end()
  }

  function readIncomingMessages(input: Readable): Promise<Envelope[]> {
    return new Promise((resolve, reject) => {
      const result: Envelope[] = []
      input.on('data', (wrapper: Envelope) => result.push(wrapper))
      input.on('end', () => resolve(result))
      input.on('error', (err: Error) => reject(err))
    })
  }
})
