import assert from 'assert'
import TestStep from '../../src/test-case-builder/TestStep'
import { messages } from 'cucumber-messages'

class MockTestStep extends TestStep {
  constructor(private readonly result: messages.ITestResult) {
    super()
  }

  public toMessage(): messages.TestCase.ITestStep {
    return new messages.TestCase.TestStep()
  }

  public run(): messages.ITestResult {
    return this.result
  }
}

describe('test-case-builder/TestStep', () => {
  let receivedMessages: messages.IEnvelope[]

  beforeEach(() => {
    receivedMessages = []
  })

  context('#execute', () => {
    it('emits a TestStepStarted message', () => {
      const testStep = new MockTestStep(new messages.TestResult())

      testStep.execute(
        message => receivedMessages.push(message),
        'some-testCaseStartedId'
      )

      assert.strictEqual(
        receivedMessages[0].testStepStarted.testCaseStartedId,
        'some-testCaseStartedId'
      )
    })

    it('emits a TestStepFinished message containing the testResult from #run', () => {
      const testResult = new messages.TestResult({
        status: messages.TestResult.Status.AMBIGUOUS,
        message: 'Everything is ok',
      })
      const testStep = new MockTestStep(testResult)

      testStep.execute(
        message => receivedMessages.push(message),
        'some-testCaseStartedId'
      )

      assert.deepStrictEqual(
        receivedMessages[1].testStepFinished.testResult,
        testResult
      )
    })
  })
})
