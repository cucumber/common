import { messages, MessageToNdjsonStream } from '../src'
import assert from 'assert'
import NdjsonToMessageStream from '../src/NdjsonToMessageStream'
import verifyStreamContract from './verifyStreamContract'

describe('NdjsonStream', () => {
  const makeToMessageStream = () =>
    new NdjsonToMessageStream(
      messages.Envelope.fromObject.bind(messages.Envelope)
    )
  const makeFromMessageStream = () => new MessageToNdjsonStream()
  verifyStreamContract(makeFromMessageStream, makeToMessageStream)

  it('converts messages to JSON with enums as strings', cb => {
    const stream = new MessageToNdjsonStream()
    stream.on('data', (json: string) => {
      const ob = JSON.parse(json)
      assert.deepStrictEqual(ob, {
        testStepFinished: {
          testResult: {
            status: 'UNKNOWN',
          },
        },
      })
      cb()
    })
    stream.write(
      messages.Envelope.create({
        testStepFinished: messages.TestStepFinished.create({
          testResult: messages.TestResult.create({
            status: messages.TestResult.Status.UNKNOWN,
          }),
        }),
      })
    )
  })

  it('converts messages to JSON with undefined arrays omitted', cb => {
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

  it('converts messages to JSON with undefined strings omitted', cb => {
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

  it('converts messages to JSON with undefined numbers omitted', cb => {
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
})
