import * as messages from '@cucumber/messages'
import { Transform } from 'stream'
import toArray from './toArray'
import assert = require('assert')

export default function verifyStreamContract(
  makeFromMessageStream: () => Transform,
  makeToMessageStream: () => Transform
) {
  describe('contract', () => {
    it('can be serialised over a stream', async () => {
      const fromMessageStream = makeFromMessageStream()
      const toMessageStream = makeToMessageStream()

      fromMessageStream.pipe(toMessageStream)

      const outgoingMessages: messages.Envelope[] = [
        {
          source: {
            data: 'Feature: Hello',
            uri: 'hello.feature',
            mediaType: messages.SourceMediaType.TEXT_X_CUCUMBER_GHERKIN_PLAIN,
          },
        },
        {
          attachment: {
            body: 'hello',
            contentEncoding: messages.AttachmentContentEncoding.IDENTITY,
            mediaType: 'text/plain',
          },
        },
      ]

      for (const outgoingMessage of outgoingMessages) {
        fromMessageStream.write(outgoingMessage)
      }
      fromMessageStream.end()

      const incomingMessages = await toArray(toMessageStream)

      assert.deepStrictEqual(
        JSON.parse(JSON.stringify(incomingMessages)),
        JSON.parse(JSON.stringify(outgoingMessages))
      )
    })
  })
}
