import assert from 'assert'
import makeAttach from '../src/makeAttach'
import { MessageNotifier } from '../src/types'
import { messages } from '@cucumber/messages'
import fs from 'fs'

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

    const stream = fs.createReadStream(
      __dirname + '/cucumber-growing-on-vine.jpg'
    )

    await attach(stream, 'image/jpg')

    const expectedLength = 851133 // wc -c < ./attachments/cucumber-growing-on-vine.jpg
    assert.equal(envelopes[0].attachment.binary.length, expectedLength)

    // assert that we can turn it into JSON, read it back and get the same buffer length
    const json = JSON.stringify(envelopes[0])
    const envelope = messages.Envelope.fromObject(JSON.parse(json))

    assert.equal(envelope.attachment.binary.length, expectedLength)
  })
})
