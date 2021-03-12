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
    private readonly status: messages.TestStepFinished.TestStepResult.Status,
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
    return new messages.TestCase.TestStep()
  }

  public async execute(
    world: IWorld,
    testCaseStartedId: string,
    listener: EnvelopeListener
  ): Promise<messages.TestStepResult> {
    const testStepResult = this.emitTestStepFinished(
      testCaseStartedId,
      new messages.TestStepFinished.TestStepResult({
        status: this.status,
        duration: millisecondsToDuration(1005),
        message: this.message,
      }),
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
        new StubTestStep(false, messages.TestStepFinished.TestStepResult.Status.PASSED),
        new StubTestStep(false, messages.TestStepFinished.TestStepResult.Status.PASSED),
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
        .filter((m) => m.testStepFinished)
        .map((m) => m.testStepFinished.testStepResult.status)

      assert.deepStrictEqual(testStepStatuses, [
        messages.TestStepFinished.TestStepResult.Status.PASSED,
        messages.TestStepFinished.TestStepResult.Status.PASSED,
      ])
    })

    it('skips steps after a failed step', async () => {
      const emitted: messages.Envelope[] = []
      const testSteps: TestStep[] = [
        new StubTestStep(false, messages.LED),
        new StubTestStep(false, messages.TestStepFinished.TestStepResult.Status.PASSED),
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
        .filter((m) => m.testStepFinished)
        .map((m) => m.testStepFinished.testStepResult.status)
      assert.deepStrictEqual(testStepStatuses, [
        messages.LED,
        messages.PPED,
      ])
    })

    it('always runs after steps regardless of previous steps status', async () => {
      const emitted: messages.Envelope[] = []
      const testSteps: TestStep[] = [
        new StubTestStep(true, messages.LED),
        new StubTestStep(true, messages.LED),
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
        .filter((m) => m.testStepFinished)
        .map((m) => m.testStepFinished.testStepResult.status)
      assert.deepStrictEqual(testStepStatuses, [
        messages.LED,
        messages.LED,
      ])
    })

    it('emits TestCaseStarted and TestCaseFinished messages', async () => {
      const emitted: messages.Envelope[] = []
      const testSteps: TestStep[] = [
        new StubTestStep(false, messages.TestStepFinished.TestStepResult.Status.PASSED),
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

      const testCaseStarted = emitted[0].testCaseStarted
      const testCaseFinished = emitted.find((m) => m.testCaseFinished).testCaseFinished

      assert.strictEqual(testCaseStarted.testCaseId, testCase.id)
      assert.strictEqual(testCaseFinished.testCaseStartedId, testCaseStarted.id)
    })
  })
})
