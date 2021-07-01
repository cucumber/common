import * as messages from '@cucumber/messages'
import assert from 'assert'
import {
  ITestStep,
  withSourceFramesOnlyStackTrace,
  IncrementClock,
  makePickleTestStep,
  IncrementStopwatch,
} from '../src'
import ExpressionStepDefinition from '../src/ExpressionStepDefinition'
import { CucumberExpression, ParameterTypeRegistry } from '@cucumber/cucumber-expressions'
import TestCase from '../src/TestCase'

describe('TestCase', () => {
  describe('#execute', () => {
    let passedPickleTestStep: ITestStep
    beforeEach(() => {
      const stepDefinition = new ExpressionStepDefinition(
        'an-id',
        new CucumberExpression('an ambiguous step', new ParameterTypeRegistry()),
        null,
        () => {
          throw new Error('Should now be run')
        }
      )

      passedPickleTestStep = makePickleTestStep(
        'some-test-step-id',
        {
          text: 'an ambiguous step',
          astNodeIds: [],
          id: '1',
        },
        [stepDefinition],
        ['some.feature:234'],
        new IncrementClock(),
        new IncrementStopwatch(),
        withSourceFramesOnlyStackTrace()
      )
    })

    it('emits TestCaseStarted and TestCaseFinished messages', async () => {
      const emitted: messages.Envelope[] = []
      const testSteps: ITestStep[] = [passedPickleTestStep]
      const testCase = new TestCase(
        'some-test-case-id',
        testSteps,
        'some-pickle-id',
        new IncrementClock()
      )
      await testCase.execute(
        (message: messages.Envelope) => emitted.push(message),
        0,
        false,
        'test-case-started-id'
      )

      const testCaseStarted = emitted[0].testCaseStarted
      const testCaseFinished = emitted.find((m) => m.testCaseFinished).testCaseFinished

      assert.strictEqual(testCaseStarted.testCaseId, testCase.id)
      assert.strictEqual(testCaseFinished.testCaseStartedId, testCaseStarted.id)
    })

    it('indicates an upcoming retry on TestCaseFinished when FAILED', async () => {
      const emitted: messages.Envelope[] = []
      const testSteps: ITestStep[] = [passedPickleTestStep]
      const testCase = new TestCase(
        'some-test-case-id',
        testSteps,
        'some-pickle-id',
        new IncrementClock()
      )
      await testCase.execute(
        (message: messages.Envelope) => emitted.push(message),
        0,
        true,
        'test-case-started-id'
      )

      const testCaseFinished = emitted.find((m) => m.testCaseFinished).testCaseFinished

      assert.strictEqual(testCaseFinished.willBeRetried, true)
    })
  })
})
