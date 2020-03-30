import { messages } from '../src'
import { Transform } from 'stream'
import toArray from './toArray'
import assert = require('assert')

export default function(
  makeFromMessageStream: () => Transform,
  makeToMessageStream: () => Transform
) {
  describe('contract', () => {
    it('can be serialised over a stream', async () => {
      const fromMessageStream = makeFromMessageStream()
      const toMessageStream = makeToMessageStream()

      fromMessageStream.pipe(toMessageStream)

      const outgoingMessages: messages.IEnvelope[] = [
        messages.Envelope.create({
          source: messages.Source.create({ data: 'Feature: Hello' }),
        }),
        messages.Envelope.create({
          attachment: messages.Attachment.create({
            body: 'hello',
          }),
        }),
      ]

      for (const outgoingMessage of outgoingMessages) {
        fromMessageStream.write(outgoingMessage)
      }
      fromMessageStream.end()

      const incomingMessages = await toArray(toMessageStream)

      assert.deepStrictEqual(incomingMessages, outgoingMessages)
    })
  })
}
