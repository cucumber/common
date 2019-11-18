import { messages } from 'cucumber-messages'
import assert from 'assert'
import TestStep from '../src/TestStep'
import TestCase from '../src/TestCase'
import { MessageNotifier } from '../src/types'

class StubTestStep extends TestStep {
  public constructor(private readonly status: messages.TestResult.Status) {
    super('some-id', [])
  }

  public execute(notifier: MessageNotifier) {
    notifier(
      new messages.Envelope({
        testStepFinished: new messages.TestStepFinished({
          testResult: new messages.TestResult({
            status: this.status,
          }),
        }),
      })
    )
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
      const testCase = new TestCase(testSteps)
      testCase.execute((message: messages.IEnvelope) => emitted.push(message))
      const testStepStatuses = emitted
        .filter(m => m.testStepFinished)
        .map(m => m.testStepFinished.testResult.status)
      assert.deepStrictEqual(testStepStatuses, [
        messages.TestResult.Status.PASSED,
        messages.TestResult.Status.PASSED,
      ])
    })
  })
})

// const testCase = makeTestCase(envelope.pickle)
