import { messages } from '../src'
import { MessageToNdjsonStream } from '../src/stream'
import assert from 'assert'
import NdjsonToMessageStream from '../src/NdjsonToMessageStream'
import verifyStreamContract from './verifyStreamContract'
import toArray from './toArray'
import { Envelope } from '../src/types/Envelope'

describe('NdjsonStream', () => {
  const makeToMessageStream = () => new NdjsonToMessageStream()
  const makeFromMessageStream = () => new MessageToNdjsonStream()
  verifyStreamContract(makeFromMessageStream, makeToMessageStream)

  it('converts a buffer stream written byte by byte', (cb) => {
    const stream = makeToMessageStream()
    const envelope: messages.Envelope = {
      test_step_finished: {
        test_step_result: {
          status: 'UNKNOWN',
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
      assert.deepStrictEqual(ob, {
        test_step_finished: {
          test_step_result: {
            status: 'UNKNOWN',
          },
        },
      })
      cb()
    })
    const envelope: messages.Envelope = {
      test_step_finished: {
        test_step_result: {
          status: 'UNKNOWN',
        },
      },
    }

    stream.write(envelope)
  })

  it('converts messages to JSON with undefined arrays omitted', (cb) => {
    const stream = new MessageToNdjsonStream()
    stream.on('data', (json: string) => {
      const ob = JSON.parse(json)
      assert.deepStrictEqual(ob, { testCase: { pickleId: '123' } })
      cb()
    })
    const envelope: Envelope = {
      test_case: {
        pickle_id: '123',
      },
    }
    stream.write(envelope)
  })

  it('converts messages to JSON with undefined strings omitted', (cb) => {
    const stream = new MessageToNdjsonStream()
    stream.on('data', (json: string) => {
      const ob = JSON.parse(json)
      assert.deepStrictEqual(ob, { testCase: {} })
      cb()
    })
    const envelope: Envelope = {
      test_case: {
        pickle_id: '',
      },
    }
    stream.write(envelope)
  })

  it('converts messages to JSON with undefined numbers omitted', (cb) => {
    const stream = new MessageToNdjsonStream()
    stream.on('data', (json: string) => {
      const ob: Envelope = JSON.parse(json)
      const expected: Envelope = {
        gherkin_document: {
          feature: {
            location: {
              column: 1,
            },
          },
        },
      }
      assert.deepStrictEqual(ob, expected)
      cb()
    })

    const envelope: Envelope = {
      gherkin_document: {
        feature: {
          location: {
            column: 1,
          },
        },
      },
    }

    stream.write(envelope)
  })

  it('ignores missing fields', async () => {
    const toMessageStream = makeToMessageStream()
    toMessageStream.write('{"unused": 999}\n')
    toMessageStream.end()

    const incomingMessages = await toArray(toMessageStream)

    assert.deepStrictEqual(incomingMessages, [{}])
  })

  it('ignores empty lines', async () => {
    const toMessageStream = makeToMessageStream()
    toMessageStream.write('{}\n{}\n\n{}\n')
    toMessageStream.end()

    const incomingMessages = await toArray(toMessageStream)

    assert.deepStrictEqual(incomingMessages, [{}, {}, {}])
  })

  it('includes offending line in error message', async () => {
    const toMessageStream = makeToMessageStream()
    await assert.rejects(
      async () => {
        toMessageStream.write('{}\nBLA BLA\n\n{}\n')
        toMessageStream.end()
        await toArray(toMessageStream)
      },
      {
        message: 'Not JSON: BLA BLA',
      }
    )
  })
})
