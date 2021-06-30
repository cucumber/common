import assert from 'assert'
import makeAttach from '../src/makeAttach'
import { EnvelopeListener } from '../src/types'
import * as messages from '@cucumber/messages'
import fs from 'fs'

describe('#attach', () => {
  it('can attach a string', () => {
    const envelopes: messages.Envelope[] = []
    const listener: EnvelopeListener = (envelope: messages.Envelope) => envelopes.push(envelope)

    const attach = makeAttach('the-test-step-id', 'the-test-case-started-id', listener)

    attach('hello', 'text/plain')

    const expected: messages.Envelope = {
      attachment: {
        mediaType: 'text/plain',
        contentEncoding: messages.AttachmentContentEncoding.IDENTITY,
        testCaseStartedId: 'the-test-case-started-id',
        testStepId: 'the-test-step-id',
        body: 'hello',
      },
    }
    assert.deepStrictEqual(envelopes[0], expected)
  })

  it('can attach a buffer', () => {
    const envelopes: messages.Envelope[] = []
    const listener: EnvelopeListener = (envelope: messages.Envelope) => envelopes.push(envelope)

    const attach = makeAttach('the-test-step-id', 'the-test-case-started-id', listener)

    const buffer = Buffer.from([...Array(4).keys()])
    attach(buffer, 'application/octet-stream')

    const expected: messages.Envelope = {
      attachment: {
        mediaType: 'application/octet-stream',
        testCaseStartedId: 'the-test-case-started-id',
        testStepId: 'the-test-step-id',
        body: buffer.toString('base64'),
        contentEncoding: messages.AttachmentContentEncoding.BASE64,
      },
    }
    assert.deepStrictEqual(envelopes[0], expected)
  })

  it('can attach a readable stream', async () => {
    const envelopes: messages.Envelope[] = []
    const listener: EnvelopeListener = (envelope: messages.Envelope) => envelopes.push(envelope)

    const attach = makeAttach('the-test-step-id', 'the-test-case-started-id', listener)

    const stream = fs.createReadStream(__dirname + '/cucumber.png')

    await attach(stream, 'image/png')

    const expectedLength = 1739 // wc -c < ./attachments/cucumber.png
    const buffer = Buffer.from(envelopes[0].attachment.body, 'base64')
    assert.strictEqual(buffer.length, expectedLength)
  })
})
