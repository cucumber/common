import { messages, ProtobufMessageStream } from '../src'
import { PassThrough, Readable, Writable } from 'stream'
import assert = require('assert')

import Source = messages.Source
import Attachment = messages.Attachment
import Wrapper = messages.Wrapper

describe('messages', () => {
  it('can be serialised over a stream', async () => {
    const outgoingMessages: Wrapper[] = createOutgoingMessages()

    const out = new PassThrough()
    const input = out.pipe(
      new ProtobufMessageStream(Wrapper.decodeDelimited.bind(Wrapper))
    )

    writeOutgoingMessages(outgoingMessages, out)
    const incomingMessages: Wrapper[] = await readIncomingMessages(input)

    assert.deepStrictEqual(incomingMessages, outgoingMessages)
  })

  function createOutgoingMessages() {
    return [
      Wrapper.create({ source: Source.create({ data: 'Feature: Hello' }) }),
      Wrapper.create({
        attachment: Attachment.create({ data: 'Some stack trace' }),
      }),
    ]
  }

  function writeOutgoingMessages(
    outgoingMessages: Wrapper[],
    output: Writable
  ) {
    for (const outgoingMessage of outgoingMessages) {
      const chunk = Wrapper.encodeDelimited(outgoingMessage).finish()
      output.write(chunk)
    }
    output.end()
  }

  function readIncomingMessages(input: Readable): Promise<Wrapper[]> {
    return new Promise((resolve, reject) => {
      const result: Wrapper[] = []
      input.on('data', (wrapper: Wrapper) => result.push(wrapper))
      input.on('end', () => resolve(result))
      input.on('error', (err: Error) => reject(err))
    })
  }
})
