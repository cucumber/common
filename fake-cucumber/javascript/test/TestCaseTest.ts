import { messages } from 'cucumber-messages'
import assert from 'assert'
import TestResult from '../src/TestResult'
import TestStep from '../src/TestStep'
import TestCase from '../src/TestCase'
import { MessageNotifier } from '../src/types'

class StubTestStep extends TestStep {
  public constructor(
    private readonly status: messages.TestResult.Status,
    private readonly message?: string,
    private readonly waitTime?: number
  ) {
    super('some-id', [])
  }

  public execute(
    notifier: MessageNotifier,
    testCaseStartedId: string
  ): TestResult {
    this.wait()

    return this.emitTestStepFinished(
      testCaseStartedId,
      new TestResult(this.status, 0, this.message),
      notifier
    )
  }

  private wait() {
    if (this.waitTime === undefined) {
      return
    }

    const until = Date.now() + this.waitTime
    while (Date.now() < until) {
      // No-op
    }
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
      testCase.execute(
        (message: messages.IEnvelope) => emitted.push(message),
        0
      )
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
      testCase.execute(
        (message: messages.IEnvelope) => emitted.push(message),
        0
      )
      const testStepStatuses = emitted
        .filter(m => m.testStepFinished)
        .map(m => m.testStepFinished.testResult.status)
      assert.deepStrictEqual(testStepStatuses, [
        messages.TestResult.Status.FAILED,
        messages.TestResult.Status.SKIPPED,
      ])
    })

    it('emits TestCaseStarted and TestCaseFinished messages', () => {
      const emitted: messages.IEnvelope[] = []
      const testSteps: TestStep[] = [
        new StubTestStep(messages.TestResult.Status.PASSED),
      ]
      const testCase = new TestCase(testSteps, 'some-pickle-id')
      testCase.execute(
        (message: messages.IEnvelope) => emitted.push(message),
        0
      )

      const testCaseStarted = emitted[0].testCaseStarted
      const testCaseFinished = emitted.find(m => m.testCaseFinished)
        .testCaseFinished

      assert.strictEqual(testCaseStarted.testCaseId, testCase.id)
      assert.strictEqual(testCaseFinished.testCaseStartedId, testCaseStarted.id)
    })

    it('the error message from the first failed step is shown in TestResult message', () => {
      const testSteps = [
        new StubTestStep(messages.TestResult.Status.PASSED),
        new StubTestStep(messages.TestResult.Status.FAILED, 'This step failed'),
        new StubTestStep(
          messages.TestResult.Status.FAILED,
          'This step failed too'
        ),
      ]
      const emitted: messages.IEnvelope[] = []
      const testCase = new TestCase(testSteps, 'some-pickle-id')
      testCase.execute(
        (message: messages.IEnvelope) => emitted.push(message),
        0
      )
      const testResult = emitted.find(m => m.testCaseFinished).testCaseFinished
        .testResult

      assert.strictEqual(testResult.message, 'This step failed')
    })

    it('the test execution time is computed on execution', () => {
      const testSteps = [
        new StubTestStep(messages.TestResult.Status.PASSED, '', 150),
        new StubTestStep(messages.TestResult.Status.PASSED, '', 150),
        new StubTestStep(messages.TestResult.Status.PASSED, '', 150),
      ]
      const emitted: messages.IEnvelope[] = []
      const testCase = new TestCase(testSteps, 'some-pickle-id')
      testCase.execute(
        (message: messages.IEnvelope) => emitted.push(message),
        0
      )
      const testResult = emitted.find(m => m.testCaseFinished).testCaseFinished
        .testResult

      assert.strictEqual(testResult.duration.seconds, 0)
      assert.ok(testResult.duration.nanos > 300000000)
    })

    context(
      'status of TestCaseFinished messages is computed from step statuses',
      () => {
        function getTestStatus(
          testSteps: TestStep[]
        ): messages.TestResult.Status {
          const emitted: messages.IEnvelope[] = []
          const testCase = new TestCase(testSteps, 'some-pickle-id')
          testCase.execute(
            (message: messages.IEnvelope) => emitted.push(message),
            0
          )

          return emitted.find(m => m.testCaseFinished).testCaseFinished
            .testResult.status
        }

        it('emits PASSED when at all steps pass', () => {
          const testStatus = getTestStatus([
            new StubTestStep(messages.TestResult.Status.PASSED),
            new StubTestStep(messages.TestResult.Status.PASSED),
          ])
          assert.strictEqual(testStatus, messages.TestResult.Status.PASSED)
        })

        it('emits FAILED when at least one step is failed', () => {
          const testStatus = getTestStatus([
            new StubTestStep(messages.TestResult.Status.PASSED),
            new StubTestStep(messages.TestResult.Status.FAILED),
            new StubTestStep(messages.TestResult.Status.PENDING),
          ])
          assert.strictEqual(testStatus, messages.TestResult.Status.FAILED)
        })

        it('emits PENDING when there is pending steps', () => {
          const testStatus = getTestStatus([
            new StubTestStep(messages.TestResult.Status.PASSED),
            new StubTestStep(messages.TestResult.Status.PENDING),
          ])
          assert.strictEqual(testStatus, messages.TestResult.Status.PENDING)
        })

        it('emits UNKNOWN when there is no steps', () => {
          const testStatus = getTestStatus([])
          assert.strictEqual(testStatus, messages.TestResult.Status.UNKNOWN)
        })
      }
    )
  })
})
