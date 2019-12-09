import { messages, TimeConversion } from 'cucumber-messages'
import assert from 'assert'
import TestStep from '../src/TestStep'
import TestCase from '../src/TestCase'
import { MessageNotifier } from '../src/types'
import IWorld from '../src/IWorld'

const { millisecondsToDuration } = TimeConversion

class StubTestStep extends TestStep {
  public constructor(
    private readonly status: messages.TestResult.Status,
    private readonly message?: string
  ) {
    super('some-id', [])
  }

  public toMessage(): messages.TestCase.ITestStep {
    return new messages.TestCase.TestStep()
  }

  public async execute(
    world: IWorld,
    notifier: MessageNotifier,
    testCaseStartedId: string
  ): Promise<messages.ITestResult> {
    const testResult = this.emitTestStepFinished(
      testCaseStartedId,
      new messages.TestResult({
        status: this.status,
        duration: millisecondsToDuration(1005),
        message: this.message,
      }),
      notifier
    )
    return Promise.resolve(testResult)
  }
}

describe('TestCase', () => {
  describe('#execute', () => {
    it('executes all passing steps', async () => {
      const emitted: messages.IEnvelope[] = []
      const testSteps: TestStep[] = [
        new StubTestStep(messages.TestResult.Status.PASSED),
        new StubTestStep(messages.TestResult.Status.PASSED),
      ]
      const testCase = new TestCase(testSteps, 'some-pickle-id')
      await testCase.execute(
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

    it('skips steps after a failed step', async () => {
      const emitted: messages.IEnvelope[] = []
      const testSteps: TestStep[] = [
        new StubTestStep(messages.TestResult.Status.FAILED),
        new StubTestStep(messages.TestResult.Status.PASSED),
      ]
      const testCase = new TestCase(testSteps, 'some-pickle-id')
      await testCase.execute(
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

    it('emits TestCaseStarted and TestCaseFinished messages', async () => {
      const emitted: messages.IEnvelope[] = []
      const testSteps: TestStep[] = [
        new StubTestStep(messages.TestResult.Status.PASSED),
      ]
      const testCase = new TestCase(testSteps, 'some-pickle-id')
      await testCase.execute(
        (message: messages.IEnvelope) => emitted.push(message),
        0
      )

      const testCaseStarted = emitted[0].testCaseStarted
      const testCaseFinished = emitted.find(m => m.testCaseFinished)
        .testCaseFinished

      assert.strictEqual(testCaseStarted.testCaseId, testCase.id)
      assert.strictEqual(testCaseFinished.testCaseStartedId, testCaseStarted.id)
    })

    it('the error message from the first failed step is shown in TestResult message', async () => {
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
      await testCase.execute(
        (message: messages.IEnvelope) => emitted.push(message),
        0
      )
      const testResult = emitted.find(m => m.testCaseFinished).testCaseFinished
        .testResult

      assert.strictEqual(testResult.message, 'This step failed')
    })

    it('the execution duration is based on the data provided by NanosTimer', async () => {
      const testSteps = [
        new StubTestStep(messages.TestResult.Status.PASSED),
        new StubTestStep(messages.TestResult.Status.PASSED),
        new StubTestStep(messages.TestResult.Status.PASSED),
      ]
      const emitted: messages.IEnvelope[] = []
      const testCase = new TestCase(testSteps, 'some-pickle-id')
      await testCase.execute(
        (message: messages.IEnvelope) => emitted.push(message),
        0
      )
      const testResult = emitted.find(m => m.testCaseFinished).testCaseFinished
        .testResult

      assert.strictEqual(testResult.duration.seconds, 0)
    })

    context(
      'status of TestCaseFinished messages is computed from step statuses',
      () => {
        async function getTestStatus(
          testSteps: TestStep[]
        ): Promise<messages.TestResult.Status> {
          const emitted: messages.IEnvelope[] = []
          const testCase = new TestCase(testSteps, 'some-pickle-id')
          await testCase.execute(
            (message: messages.IEnvelope) => emitted.push(message),
            0
          )

          return emitted.find(m => m.testCaseFinished).testCaseFinished
            .testResult.status
        }

        it('emits PASSED when at all steps pass', async () => {
          const testStatus = await getTestStatus([
            new StubTestStep(messages.TestResult.Status.PASSED),
            new StubTestStep(messages.TestResult.Status.PASSED),
          ])
          assert.strictEqual(testStatus, messages.TestResult.Status.PASSED)
        })

        it('emits FAILED when at least one step is failed', async () => {
          const testStatus = await getTestStatus([
            new StubTestStep(messages.TestResult.Status.PASSED),
            new StubTestStep(messages.TestResult.Status.FAILED),
            new StubTestStep(messages.TestResult.Status.PENDING),
          ])
          assert.strictEqual(testStatus, messages.TestResult.Status.FAILED)
        })

        it('emits PENDING when there is pending steps', async () => {
          const testStatus = await getTestStatus([
            new StubTestStep(messages.TestResult.Status.PASSED),
            new StubTestStep(messages.TestResult.Status.PENDING),
          ])
          assert.strictEqual(testStatus, messages.TestResult.Status.PENDING)
        })

        it('emits UNKNOWN when there is no steps', async () => {
          const testStatus = await getTestStatus([])
          assert.strictEqual(testStatus, messages.TestResult.Status.UNKNOWN)
        })
      }
    )
  })
})
