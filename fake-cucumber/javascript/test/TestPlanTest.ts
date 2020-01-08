import {
  gherkinMessages,
  streamToArray,
  stubMatchingStepDefinition,
} from './TestHelpers'
import { IdGenerator, messages } from 'cucumber-messages'
import { MessageNotifier } from '../src/types'
import assert from 'assert'
import TestPlan from '../src/TestPlan'
import IStepDefinition from '../src/IStepDefinition'
import { CucumberExpression, ParameterTypeRegistry } from 'cucumber-expressions'
import ExpressionStepDefinition from '../src/ExpressionStepDefinition'
import { GherkinQuery } from 'gherkin'
import IncrementClock from '../src/IncrementClock'
import { withSourceFramesOnlyStackTrace } from '../src/ErrorMessageGenerator'

describe('TestPlan', () => {
  it('executes test cases', async () => {
    const stepDefinition = stubMatchingStepDefinition()

    const gherkinEnvelopes = await streamToArray(
      gherkinMessages(
        `Feature: test
  Scenario: test
    Given a passed step
`,
        'test.feature'
      )
    )
    const gherkinQuery = new GherkinQuery()
    for (const gherkinEnvelope of gherkinEnvelopes) {
      gherkinQuery.update(gherkinEnvelope)
    }

    const pickles = gherkinEnvelopes.filter(m => m.pickle).map(m => m.pickle)
    const testPlan = new TestPlan(
      pickles,
      [stepDefinition],
      [],
      [],
      gherkinQuery,
      IdGenerator.incrementing(),
      new IncrementClock(),
      withSourceFramesOnlyStackTrace()
    )
    const envelopes: messages.IEnvelope[] = []
    const notifier: MessageNotifier = message => envelopes.push(message)
    await testPlan.execute(notifier)
    assert.deepStrictEqual(envelopes.length, 7)
  })

  it('attaches attachments from support code', async () => {
    const stepDefinition: IStepDefinition = new ExpressionStepDefinition(
      'stepdef-id',
      new CucumberExpression('a passed step', new ParameterTypeRegistry()),
      null,
      function() {
        this.attach('hello world', 'text/plain')
      }
    )

    const gherkinEnvelopes = await streamToArray(
      gherkinMessages(
        `Feature: test
  Scenario: test
    Given a passed step
`,
        'test.feature'
      )
    )

    const gherkinQuery = new GherkinQuery()
    for (const gherkinEnvelope of gherkinEnvelopes) {
      gherkinQuery.update(gherkinEnvelope)
    }

    const pickles = gherkinEnvelopes.filter(m => m.pickle).map(m => m.pickle)

    const testPlan = new TestPlan(
      pickles,
      [stepDefinition],
      [],
      [],
      gherkinQuery,
      IdGenerator.incrementing(),
      new IncrementClock(),
      withSourceFramesOnlyStackTrace()
    )
    const envelopes: messages.IEnvelope[] = []
    const notifier: MessageNotifier = message => envelopes.push(message)
    await testPlan.execute(notifier)

    const attachments = envelopes
      .filter(m => m.attachment)
      .map(m => m.attachment)
    assert.deepStrictEqual(attachments.length, 1)
    assert.strictEqual(attachments[0].text, 'hello world')
  })
})
