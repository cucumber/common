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
        media_type: 'text/plain',
        content_encoding: 'IDENTITY',
        test_case_started_id: 'the-test-case-started-id',
        test_step_id: 'the-test-step-id',
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
        media_type: 'application/octet-stream',
        test_case_started_id: 'the-test-case-started-id',
        test_step_id: 'the-test-step-id',
        body: buffer.toString('base64'),
        content_encoding: 'BASE64',
      },
    }
    assert.deepStrictEqual(envelopes[0], expected)
  })

  it('can attach a readable stream', async () => {
    const envelopes: messages.Envelope[] = []
    const listener: EnvelopeListener = (envelope: messages.Envelope) => envelopes.push(envelope)

    const attach = makeAttach('the-test-step-id', 'the-test-case-started-id', listener)

    const stream = fs.createReadStream(__dirname + '/cucumber-growing-on-vine.jpg')

    await attach(stream, 'image/jpg')

    const expectedLength = 851133 // wc -c < ./attachments/cucumber-growing-on-vine.jpg
    const buffer = Buffer.from(envelopes[0].attachment.body, 'base64')
    assert.strictEqual(buffer.length, expectedLength)
  })
})
