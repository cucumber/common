import * as messages from '@cucumber/messages'
import assert from 'assert'
import TestStep from '../src/TestStep'
import TestCase from '../src/TestCase'
import { EnvelopeListener, IWorld, withSourceFramesOnlyStackTrace } from '../src'
import IncrementClock from '../src/IncrementClock'
import IncrementStopwatch from '../src/IncrementStopwatch'

const { millisecondsToDuration } = messages.TimeConversion

class StubTestStep extends TestStep {
  public constructor(
    alwaysExecute: boolean,
    private readonly status:
      | 'UNKNOWN'
      | 'PASSED'
      | 'SKIPPED'
      | 'PENDING'
      | 'UNDEFINED'
      | 'AMBIGUOUS'
      | 'FAILED',
    private readonly message?: string
  ) {
    super(
      'some-id',
      'some-source-id',
      alwaysExecute,
      [],
      ['some.feature:123'],
      new IncrementClock(),
      new IncrementStopwatch(),
      withSourceFramesOnlyStackTrace()
    )
  }

  public toMessage(): messages.TestStep {
    return {}
  }

  public async execute(
    world: IWorld,
    testCaseStartedId: string,
    listener: EnvelopeListener
  ): Promise<messages.TestStepResult> {
    const testStepResult = this.emitTestStepFinished(
      testCaseStartedId,
      {
        status: this.status,
        duration: millisecondsToDuration(1005),
        message: this.message,
      },
      listener
    )
    return Promise.resolve(testStepResult)
  }
}

describe('TestCase', () => {
  describe('#execute', () => {
    it('executes all passing steps', async () => {
      const emitted: messages.Envelope[] = []
      const testSteps: TestStep[] = [
        new StubTestStep(false, 'PASSED'),
        new StubTestStep(false, 'PASSED'),
      ]
      const testCase = new TestCase(
        'some-test-case-id',
        testSteps,
        'some-pickle-id',
        new IncrementClock()
      )
      await testCase.execute(
        (message: messages.Envelope) => emitted.push(message),
        0,
        'test-case-started-id'
      )
      const testStepStatuses = emitted
        .filter((m) => m.test_step_finished)
        .map((m) => m.test_step_finished.test_step_result.status)

      assert.deepStrictEqual(testStepStatuses, ['PASSED', 'PASSED'])
    })

    it('skips steps after a failed step', async () => {
      const emitted: messages.Envelope[] = []
      const testSteps: TestStep[] = [
        new StubTestStep(false, 'FAILED'),
        new StubTestStep(false, 'PASSED'),
      ]
      const testCase = new TestCase(
        'some-test-case-id',
        testSteps,
        'some-pickle-id',
        new IncrementClock()
      )
      await testCase.execute(
        (message: messages.Envelope) => emitted.push(message),
        0,
        'test-case-started-id'
      )
      const testStepStatuses = emitted
        .filter((m) => m.test_step_finished)
        .map((m) => m.test_step_finished.test_step_result.status)
      assert.deepStrictEqual(testStepStatuses, ['FAILED', 'SKIPPED'])
    })

    it('always runs after steps regardless of previous steps status', async () => {
      const emitted: messages.Envelope[] = []
      const testSteps: TestStep[] = [
        new StubTestStep(true, 'FAILED'),
        new StubTestStep(true, 'FAILED'),
      ]
      const testCase = new TestCase(
        'some-test-case-id',
        testSteps,
        'some-pickle-id',
        new IncrementClock()
      )
      await testCase.execute(
        (message: messages.Envelope) => emitted.push(message),
        0,
        'test-case-started-id'
      )
      const testStepStatuses = emitted
        .filter((m) => m.test_step_finished)
        .map((m) => m.test_step_finished.test_step_result.status)
      assert.deepStrictEqual(testStepStatuses, ['FAILED', 'FAILED'])
    })

    it('emits TestCaseStarted and TestCaseFinished messages', async () => {
      const emitted: messages.Envelope[] = []
      const testSteps: TestStep[] = [new StubTestStep(false, 'PASSED')]
      const testCase = new TestCase(
        'some-test-case-id',
        testSteps,
        'some-pickle-id',
        new IncrementClock()
      )
      await testCase.execute(
        (message: messages.Envelope) => emitted.push(message),
        0,
        'test-case-started-id'
      )

      const testCaseStarted = emitted[0].test_case_started
      const testCaseFinished = emitted.find((m) => m.test_case_finished).test_case_finished

      assert.strictEqual(testCaseStarted.test_case_id, testCase.id)
      assert.strictEqual(testCaseFinished.test_case_started_id, testCaseStarted.id)
    })
  })
})
