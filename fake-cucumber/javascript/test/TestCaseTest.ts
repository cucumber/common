import { messages } from 'cucumber-messages'
import assert from 'assert'
import TestStep from '../src/TestStep'
import TestCase from '../src/TestCase'
import { MessageNotifier } from '../src/types'

class StubTestStep extends TestStep {
  public constructor(private readonly status: messages.TestResult.Status) {
    super('some-id', [])
  }

  public execute(notifier: MessageNotifier): messages.TestResult.Status {
    return this.notifyAndReturn(this.status, notifier)
  }
}

describe('TestCase', () => {
  describe('#execute', () => {
    it('executes all passing steps', () => {
      const emitted: messages.IEnvelope[] = []
      const testSteps: TestStep[] = [
        new StubTestStep(messages.TestResult.Status.PASSED),
        new StubTestStep(messages.TestResult.Status.PASSED),
      ]
      const testCase = new TestCase(testSteps, 'some-pickle-id')
      testCase.execute((message: messages.IEnvelope) => emitted.push(message))
      const testStepStatuses = emitted
        .filter(m => m.testStepFinished)
        .map(m => m.testStepFinished.testResult.status)
      assert.deepStrictEqual(testStepStatuses, [
        messages.TestResult.Status.PASSED,
        messages.TestResult.Status.PASSED,
      ])
    })

    it('skips steps after a failed step', () => {
      const emitted: messages.IEnvelope[] = []
      const testSteps: TestStep[] = [
        new StubTestStep(messages.TestResult.Status.FAILED),
        new StubTestStep(messages.TestResult.Status.PASSED),
      ]
      const testCase = new TestCase(testSteps, 'some-pickle-id')
      testCase.execute((message: messages.IEnvelope) => emitted.push(message))
      const testStepStatuses = emitted
        .filter(m => m.testStepFinished)
        .map(m => m.testStepFinished.testResult.status)
      assert.deepStrictEqual(testStepStatuses, [
        messages.TestResult.Status.FAILED,
        messages.TestResult.Status.SKIPPED,
      ])
    })

    it('emits a TestCaseFinished message after running the steps', () => {
      const emitted: messages.IEnvelope[] = []
      const testSteps: TestStep[] = [
        new StubTestStep(messages.TestResult.Status.PASSED),
        new StubTestStep(messages.TestResult.Status.PASSED),
      ]
      const testCase = new TestCase(testSteps, 'some-pickle-id')
      testCase.execute((message: messages.IEnvelope) => emitted.push(message))
      const testCaseFinished = emitted.find(m => m.testCaseFinished)
        .testCaseFinished

      assert.deepStrictEqual(
        testCaseFinished.testResult.status,
        messages.TestResult.Status.PASSED
      )
    })

    it('emits a TestCaseFinished message after running the steps', () => {
      const emitted: messages.IEnvelope[] = []
      const testSteps: TestStep[] = [
        new StubTestStep(messages.TestResult.Status.PASSED),
        new StubTestStep(messages.TestResult.Status.FAILED),
      ]
      const testCase = new TestCase(testSteps, 'some-pickle-id')
      testCase.execute((message: messages.IEnvelope) => emitted.push(message))
      const testCaseFinished = emitted.find(m => m.testCaseFinished)
        .testCaseFinished

      assert.deepStrictEqual(
        testCaseFinished.testResult.status,
        messages.TestResult.Status.FAILED
      )
    })
  })
})
