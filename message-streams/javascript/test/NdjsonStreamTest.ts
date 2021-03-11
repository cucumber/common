import { messages } from '@cucumber/messages'
import { MessageToNdjsonStream } from '../src'
import assert from 'assert'
import NdjsonToMessageStream from '../src/NdjsonToMessageStream'
import verifyStreamContract from './verifyStreamContract'
import toArray from './toArray'

describe('NdjsonStream', () => {
  const makeToMessageStream = () =>
    new NdjsonToMessageStream(messages.Envelope.fromObject.bind(messages.Envelope))
  const makeFromMessageStream = () => new MessageToNdjsonStream()
  verifyStreamContract(makeFromMessageStream, makeToMessageStream)

  it('converts a buffer stream written byte by byte', (cb) => {
    const stream = makeToMessageStream()
    const envelope = messages.Envelope.create({
      testStepFinished: messages.TestStepFinished.create({
        testStepResult: messages.TestStepFinished.TestStepResult.create({
          status: messages.TestStepFinished.TestStepResult.Status.UNKNOWN,
        }),
      }),
    })
    const json = JSON.stringify(envelope.toJSON())
    stream.on('error', cb)
    stream.on('data', (receivedEnvelope: messages.IEnvelope) => {
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
        testStepFinished: {
          testStepResult: {
            status: 'UNKNOWN',
          },
        },
      })
      cb()
    })
    stream.write(
      messages.Envelope.create({
        testStepFinished: messages.TestStepFinished.create({
          testStepResult: messages.TestStepFinished.TestStepResult.create({
            status: messages.TestStepFinished.TestStepResult.Status.UNKNOWN,
          }),
        }),
      })
    )
  })

  it('converts messages to JSON with undefined arrays omitted', (cb) => {
    const stream = new MessageToNdjsonStream()
    stream.on('data', (json: string) => {
      const ob = JSON.parse(json)
      assert.deepStrictEqual(ob, { testCase: { pickleId: '123' } })
      cb()
    })
    stream.write(
      messages.Envelope.create({
        testCase: messages.TestCase.create({
          pickleId: '123',
        }),
      })
    )
  })

  it('converts messages to JSON with undefined strings omitted', (cb) => {
    const stream = new MessageToNdjsonStream()
    stream.on('data', (json: string) => {
      const ob = JSON.parse(json)
      assert.deepStrictEqual(ob, { testCase: {} })
      cb()
    })
    stream.write(
      messages.Envelope.create({
        testCase: messages.TestCase.create({ pickleId: '' }),
      })
    )
  })

  it('converts messages to JSON with undefined numbers omitted', (cb) => {
    const stream = new MessageToNdjsonStream()
    stream.on('data', (json: string) => {
      const ob = JSON.parse(json)
      assert.deepStrictEqual(ob, {
        gherkinDocument: {
          feature: {
            location: {
              column: 1,
            },
          },
        },
      })
      cb()
    })
    stream.write(
      messages.Envelope.create({
        gherkinDocument: messages.GherkinDocument.create({
          feature: messages.GherkinDocument.Feature.create({
            location: messages.Location.create({
              column: 1,
            }),
          }),
        }),
      })
    )
  })

  it('ignores missing fields', async () => {
    const toMessageStream = makeToMessageStream()
    toMessageStream.write('{"unused": 999}\n')
    toMessageStream.end()

    const incomingMessages = await toArray(toMessageStream)

    assert.deepStrictEqual(incomingMessages, [messages.Envelope.create({})])
  })

  it('ignores empty lines', async () => {
    const toMessageStream = makeToMessageStream()
    toMessageStream.write('{}\n{}\n\n{}\n')
    toMessageStream.end()

    const incomingMessages = await toArray(toMessageStream)

    assert.deepStrictEqual(incomingMessages, [
      messages.Envelope.create({}),
      messages.Envelope.create({}),
      messages.Envelope.create({}),
    ])
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
