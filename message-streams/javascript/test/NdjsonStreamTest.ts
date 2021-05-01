import * as messages from '@cucumber/messages'
import { MessageToNdjsonStream } from '../src'
import assert from 'assert'
import NdjsonToMessageStream from '../src/NdjsonToMessageStream'
import verifyStreamContract from './verifyStreamContract'
import toArray from './toArray'
import { Envelope } from '@cucumber/messages'

describe('NdjsonStream', () => {
  const makeToMessageStream = () => new NdjsonToMessageStream()
  const makeFromMessageStream = () => new MessageToNdjsonStream()
  verifyStreamContract(makeFromMessageStream, makeToMessageStream)

  it('converts a buffer stream written byte by byte', (cb) => {
    const stream = makeToMessageStream()
    const envelope: messages.Envelope = {
      testStepFinished: {
        testStepResult: {
          status: messages.TestStepResultStatus.UNKNOWN,
          duration: { nanos: 0, seconds: 0 },
          willBeRetried: false,
        },
        testCaseStartedId: '1',
        testStepId: '2',
        timestamp: {
          seconds: 0,
          nanos: 0,
        },
      },
    }
    const json = JSON.stringify(envelope)
    stream.on('error', cb)
    stream.on('data', (receivedEnvelope: messages.Envelope) => {
      assert.deepStrictEqual(envelope, receivedEnvelope)
      cb()
    })
    const buffer = Buffer.from(json)
    for (let i = 0; i < buffer.length; i++) {
      stream.write(buffer.slice(i, i + 1))
    }
    stream.end()
  })

  it('converts messages to JSON with enums as strings', (cb) => {
    const stream = new MessageToNdjsonStream()
    stream.on('data', (json: string) => {
      const ob = JSON.parse(json)
      const expected: messages.Envelope = {
        testStepFinished: {
          testStepResult: {
            status: messages.TestStepResultStatus.UNKNOWN,
            duration: { nanos: 0, seconds: 0 },
            willBeRetried: false,
          },
          testCaseStartedId: '1',
          testStepId: '2',
          timestamp: {
            seconds: 0,
            nanos: 0,
          },
        },
      }
      assert.deepStrictEqual(ob, expected)
      cb()
    })
    const envelope: messages.Envelope = {
      testStepFinished: {
        testStepResult: {
          status: messages.TestStepResultStatus.UNKNOWN,
          duration: { nanos: 0, seconds: 0 },
          willBeRetried: false,
        },
        testCaseStartedId: '1',
        testStepId: '2',
        timestamp: {
          seconds: 0,
          nanos: 0,
        },
      },
    }

    stream.write(envelope)
  })

  it('ignores empty lines', async () => {
    const toMessageStream = makeToMessageStream()
    toMessageStream.write('{}\n{}\n\n{}\n')
    toMessageStream.end()

    const incomingMessages = await toArray(toMessageStream)

    assert.deepStrictEqual(incomingMessages, [new Envelope(), new Envelope(), new Envelope()])
  })

  it('includes offending line in error message', async () => {
    const toMessageStream = makeToMessageStream()
    await assert.rejects(
      async () => {
        toMessageStream.write('{}\n  BLA BLA\n\n{}\n')
        toMessageStream.end()
        await toArray(toMessageStream)
      },
      {
        message: "Unexpected token B in JSON at position 2\nNot JSON: '  BLA BLA'\n",
      }
    )
  })
})
