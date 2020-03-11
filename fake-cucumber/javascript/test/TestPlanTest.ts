import {
  gherkinMessages,
  streamToArray,
  stubMatchingStepDefinition,
} from './TestHelpers'
import { IdGenerator, messages } from '@cucumber/messages'
import { EnvelopeListener } from '../src/types'
import assert from 'assert'
import TestPlan from '../src/TestPlan'
import IStepDefinition from '../src/IStepDefinition'
import {
  CucumberExpression,
  ParameterTypeRegistry,
} from '@cucumber/cucumber-expressions'
import ExpressionStepDefinition from '../src/ExpressionStepDefinition'
import { Query } from '@cucumber/gherkin'
import IncrementClock from '../src/IncrementClock'
import { withSourceFramesOnlyStackTrace } from '../src/ErrorMessageGenerator'
import SupportCode from '../src/SupportCode'
import makeTestCase from '../src/makeTestCase'

describe('TestPlan', () => {
  it('executes test cases', async () => {
    const stepDefinition = stubMatchingStepDefinition()

    const gherkinSource = `Feature: test
  Scenario: test
    Given a passed step
`
    const testPlan = await makeTestPlan(gherkinSource, stepDefinition)
    const envelopes: messages.IEnvelope[] = []
    const listener: EnvelopeListener = message => envelopes.push(message)
    await testPlan.execute(listener)
    assert.deepStrictEqual(envelopes.length, 7)
  })

  it('attaches text attachments', async () => {
    const stepDefinition = new ExpressionStepDefinition(
      'stepdef-id',
      new CucumberExpression('a passed step', new ParameterTypeRegistry()),
      null,
      function() {
        this.attach('hello world', 'text/plain')
      }
    )

    const gherkinSource = `Feature: test
  Scenario: test
    Given a passed step
`
    const testPlan = await makeTestPlan(gherkinSource, stepDefinition)
    const envelopes: messages.IEnvelope[] = []
    const listener: EnvelopeListener = message => envelopes.push(message)
    await testPlan.execute(listener)

    const attachments = envelopes
      .filter(m => m.attachment)
      .map(m => m.attachment)
    assert.deepStrictEqual(attachments.length, 1)
    assert.strictEqual(attachments[0].text, 'hello world')
  })
})

async function makeTestPlan(
  gherkinSource: string,
  stepDefinition: IStepDefinition
): Promise<TestPlan> {
  const gherkinEnvelopes = await streamToArray(
    gherkinMessages(gherkinSource, 'test.feature')
  )
  const gherkinQuery = new Query()
  for (const gherkinEnvelope of gherkinEnvelopes) {
    gherkinQuery.update(gherkinEnvelope)
  }

  const supportCode = new SupportCode(
    IdGenerator.incrementing(),
    new IncrementClock(),
    withSourceFramesOnlyStackTrace()
  )

  const testCases = gherkinQuery
    .getPickles()
    .map(pickle =>
      makeTestCase(
        pickle,
        [stepDefinition],
        [],
        [],
        gherkinQuery,
        supportCode.newId,
        supportCode.clock,
        supportCode.makeErrorMessage
      )
    )

  return new TestPlan(testCases, supportCode)
}
