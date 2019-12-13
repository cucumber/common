import assert from 'assert'
import makeAttach from '../src/makeAttach'
import { MessageNotifier } from '../src/types'
import { messages } from 'cucumber-messages'
import { ReadableStreamBuffer } from 'stream-buffers'

describe('#attach', () => {
  it('can attach a string', () => {
    const envelopes: messages.IEnvelope[] = []
    const notifier: MessageNotifier = (envelope: messages.IEnvelope) =>
      envelopes.push(envelope)

    const attach = makeAttach(
      'the-test-step-id',
      'the-test-case-started-id',
      notifier
    )

    attach('hello', 'text/plain')

    assert.deepStrictEqual(
      envelopes[0],
      new messages.Envelope({
        attachment: new messages.Attachment({
          mediaType: 'text/plain',
          testCaseStartedId: 'the-test-case-started-id',
          testStepId: 'the-test-step-id',
          text: 'hello',
        }),
      })
    )
  })

  it('can attach a buffer', () => {
    const envelopes: messages.IEnvelope[] = []
    const notifier: MessageNotifier = (envelope: messages.IEnvelope) =>
      envelopes.push(envelope)

    const attach = makeAttach(
      'the-test-step-id',
      'the-test-case-started-id',
      notifier
    )

    const buffer = Buffer.from([...Array(4).keys()])
    attach(buffer, 'application/octet-stream')

    assert.deepStrictEqual(
      envelopes[0],
      new messages.Envelope({
        attachment: new messages.Attachment({
          mediaType: 'application/octet-stream',
          testCaseStartedId: 'the-test-case-started-id',
          testStepId: 'the-test-step-id',
          binary: buffer,
        }),
      })
    )
  })

  it('can attach a readable stream', async () => {
    const envelopes: messages.IEnvelope[] = []
    const notifier: MessageNotifier = (envelope: messages.IEnvelope) =>
      envelopes.push(envelope)

    const attach = makeAttach(
      'the-test-step-id',
      'the-test-case-started-id',
      notifier
    )

    const size = 4096
    const buffer = Buffer.from([...Array(size).keys()].map(n => n % 256))
    const stream = new ReadableStreamBuffer({
      chunkSize: 1234,
      frequency: 1,
    })
    stream.put(buffer)
    stream.stop()

    await attach(stream, 'application/octet-stream')

    assert.deepStrictEqual(
      envelopes[0],
      new messages.Envelope({
        attachment: new messages.Attachment({
          mediaType: 'application/octet-stream',
          testCaseStartedId: 'the-test-case-started-id',
          testStepId: 'the-test-step-id',
          binary: buffer,
        }),
      })
    )
  })
})
