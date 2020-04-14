import assert from 'assert'
import makeAttach from '../src/makeAttach'
import { EnvelopeListener } from '../src/types'
import { messages } from '@cucumber/messages'
import fs from 'fs'

describe('#attach', () => {
  it('can attach a string', () => {
    const envelopes: messages.IEnvelope[] = []
    const listener: EnvelopeListener = (envelope: messages.IEnvelope) =>
      envelopes.push(envelope)

    const attach = makeAttach(
      'the-test-step-id',
      'the-test-case-started-id',
      listener
    )

    attach('hello', 'text/plain')

    assert.deepStrictEqual(
      envelopes[0],
      new messages.Envelope({
        attachment: new messages.Attachment({
          mediaType: 'text/plain',
          contentEncoding: messages.Attachment.ContentEncoding.IDENTITY,
          testCaseStartedId: 'the-test-case-started-id',
          testStepId: 'the-test-step-id',
          body: 'hello',
        }),
      })
    )
  })

  it('can attach a buffer', () => {
    const envelopes: messages.IEnvelope[] = []
    const listener: EnvelopeListener = (envelope: messages.IEnvelope) =>
      envelopes.push(envelope)

    const attach = makeAttach(
      'the-test-step-id',
      'the-test-case-started-id',
      listener
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
          body: buffer.toString('base64'),
          contentEncoding: messages.Attachment.ContentEncoding.BASE64,
        }),
      })
    )
  })

  it('can attach a readable stream', async () => {
    const envelopes: messages.IEnvelope[] = []
    const listener: EnvelopeListener = (envelope: messages.IEnvelope) =>
      envelopes.push(envelope)

    const attach = makeAttach(
      'the-test-step-id',
      'the-test-case-started-id',
      listener
    )

    const stream = fs.createReadStream(
      __dirname + '/cucumber-growing-on-vine.jpg'
    )

    await attach(stream, 'image/jpg')

    const expectedLength = 851133 // wc -c < ./attachments/cucumber-growing-on-vine.jpg
    const buffer = Buffer.from(envelopes[0].attachment.body, 'base64')
    assert.equal(buffer.length, expectedLength)
  })
})
