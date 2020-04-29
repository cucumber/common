import { gherkinMessages, streamToArray } from './TestHelpers'
import { IdGenerator, messages } from '@cucumber/messages'
import { EnvelopeListener } from '../src/types'
import assert from 'assert'
import TestPlan from '../src/TestPlan'
import { Query } from '@cucumber/gherkin'
import IncrementClock from '../src/IncrementClock'
import { withSourceFramesOnlyStackTrace } from '../src/ErrorMessageGenerator'
import SupportCode from '../src/SupportCode'
import makeTestCase from '../src/makeTestCase'
import makePickleTestStep from '../src/makePickleTestStep'
import makeHookTestStep from '../src/makeHookTestStep'

describe('TestPlan', () => {
  let supportCode: SupportCode
  beforeEach(() => {
    supportCode = new SupportCode(
      IdGenerator.incrementing(),
      new IncrementClock(),
      withSourceFramesOnlyStackTrace()
    )
  })

  it('executes test cases', async () => {
    supportCode.defineStepDefinition(null, 'a passed step', () => undefined)

    const gherkinSource = `Feature: test
  Scenario: test
    Given a passed step
`
    const testPlan = await makeTestPlan(gherkinSource, supportCode)
    const envelopes: messages.IEnvelope[] = []
    const listener: EnvelopeListener = (envelope) => {
      if (!envelope) throw new Error('Envelope was null or undefined')
      envelopes.push(envelope)
    }
    await testPlan.execute(listener)
    const testStepFinisheds = envelopes
      .filter((m) => m.testStepFinished)
      .map((m) => m.testStepFinished)
    assert.deepStrictEqual(testStepFinisheds.length, 1)
    assert.strictEqual(
      testStepFinisheds[0].testStepResult.status,
      messages.TestStepFinished.TestStepResult.Status.PASSED
    )
  })

  class Flight {
    constructor(public readonly name: string) {}
  }

  it('defines parameter types', async () => {
    supportCode.defineParameterType({
      name: 'flight',
      regexp: /[A-Z]{3}-[A-Z]{3}/,
      transformer(name) {
        return new Flight(name)
      },
    })

    supportCode.defineStepDefinition(
      null,
      'flight {flight}',
      (flight: Flight) => assert.strictEqual(flight.name, 'LHR-CDG')
    )

    const gherkinSource = `Feature: test
  Scenario: test
    Given flight LHR-CDG
`
    const testPlan = await makeTestPlan(gherkinSource, supportCode)
    const envelopes: messages.IEnvelope[] = []
    const listener: EnvelopeListener = (envelope) => envelopes.push(envelope)
    await testPlan.execute(listener)
    const testStepFinisheds = envelopes
      .filter((m) => m.testStepFinished)
      .map((m) => m.testStepFinished)
    assert.deepStrictEqual(testStepFinisheds.length, 1)
    assert.strictEqual(
      testStepFinisheds[0].testStepResult.status,
      messages.TestStepFinished.TestStepResult.Status.PASSED
    )
    const parameterTypes = envelopes
      .filter((m) => m.parameterType)
      .map((m) => m.parameterType)
    assert.deepStrictEqual(parameterTypes.length, 1)
    assert.strictEqual(parameterTypes[0].name, 'flight')
  })

  it('attaches text attachments', async () => {
    supportCode.defineStepDefinition(null, 'a passed step', function () {
      this.attach('hello world', 'text/plain')
    })

    const gherkinSource = `Feature: test
  Scenario: test
    Given a passed step
`
    const testPlan = await makeTestPlan(gherkinSource, supportCode)
    const envelopes: messages.IEnvelope[] = []
    const listener: EnvelopeListener = (envelope) => envelopes.push(envelope)
    await testPlan.execute(listener)

    const attachments = envelopes
      .filter((m) => m.attachment)
      .map((m) => m.attachment)
    assert.deepStrictEqual(attachments.length, 1)
    assert.strictEqual(attachments[0].body, 'hello world')
  })
})

async function makeTestPlan(
  gherkinSource: string,
  supportCode: SupportCode
): Promise<TestPlan> {
  const gherkinEnvelopes = await streamToArray(
    gherkinMessages(gherkinSource, 'test.feature')
  )
  const gherkinQuery = new Query()
  for (const gherkinEnvelope of gherkinEnvelopes) {
    gherkinQuery.update(gherkinEnvelope)
  }

  const testCases = gherkinQuery
    .getPickles()
    .map((pickle) =>
      makeTestCase(
        pickle,
        supportCode.stepDefinitions,
        supportCode.beforeHooks,
        supportCode.afterHooks,
        gherkinQuery,
        supportCode.newId,
        supportCode.clock,
        supportCode.makeErrorMessage,
        makePickleTestStep,
        makeHookTestStep
      )
    )

  return new TestPlan(testCases, supportCode)
}
