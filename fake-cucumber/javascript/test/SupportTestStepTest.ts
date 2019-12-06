import assert from 'assert'
import { messages } from 'cucumber-messages'
import { ICucumberSupportCode, CucumberSupportCode, SupportCodeExecutor } from 'cucumber-support-code'
import uuidv4 from 'uuid/v4'

import { MessageNotifier } from '../src/types'
import { RegularExpression, ParameterTypeRegistry } from 'cucumber-expressions'

class TestStep {
  public readonly id: string = uuidv4()

  constructor(
    private readonly supportCode: ICucumberSupportCode,
    private readonly pickleStep: messages.Pickle.IPickleStep
  ){}

  public execute(
    notifier: MessageNotifier,
    testCaseStartedId: string
  ): messages.ITestResult {
    const matches = this.supportCode.findMatchingStepDefinitions(this.pickleStep)

    if (matches.length == 0) {
      return this.emitTestStepFinished(
        testCaseStartedId,
        new messages.TestResult({
          status: messages.TestResult.Status.UNDEFINED,
        }),
        notifier
      )
    }

    if (matches.length > 1) {
      return this.emitTestStepFinished(
        testCaseStartedId,
        new messages.TestResult({
          status: messages.TestResult.Status.AMBIGUOUS,
        }),
        notifier
      )
    }
  }

  protected emitTestStepFinished(
    testCaseStartedId: string,
    testResult: messages.ITestResult,
    notifier: MessageNotifier
  ): messages.ITestResult {
    notifier(
      new messages.Envelope({
        testStepFinished: new messages.TestStepFinished({
          testCaseStartedId,
          testStepId: this.id,
          testResult,
        }),
      })
    )
    return testResult
  }
}

function execute(testStep: TestStep): messages.ITestStepFinished {
  const receivedMessages: messages.IEnvelope[] = []
  testStep.execute(
    message => receivedMessages.push(message),
    'some-testCaseStartedId'
  )
  return receivedMessages.pop().testStepFinished
}

describe('TestStep', () => {
  describe('#execute', () => {
    let supportCode: CucumberSupportCode


    beforeEach(() => {
      supportCode = new CucumberSupportCode()
    })

    it('emits a TestStepFinished with status UNDEFINED when there are no matching step definitions', () => {
      const testStep = new TestStep(supportCode, messages.Pickle.PickleStep.create({
        text: 'an undefined step',
      }))
      const testStepFinished = execute(testStep)

      assert.strictEqual(
        testStepFinished.testResult.status,
        messages.TestResult.Status.UNDEFINED
      )
      assert.strictEqual(testStepFinished.testStepId, testStep.id)
    })

    it('emits a TestStepFinished with status AMBIGUOUS when there are multiple matching step definitions', () => {
      supportCode.registerStepDefinition(
        new RegularExpression(/an ambiguous (.*)/, new ParameterTypeRegistry()),
        new SupportCodeExecutor(() => undefined)
      )
      supportCode.registerStepDefinition(
        new RegularExpression(/(.*) ambiguous step/, new ParameterTypeRegistry()),
        new SupportCodeExecutor(() => undefined)
      )

      const testStep = new TestStep(supportCode, messages.Pickle.PickleStep.create({
        text: 'an ambiguous step',
      }))
      const testStepFinished = execute(testStep)

      assert.strictEqual(
        testStepFinished.testResult.status,
        messages.TestResult.Status.AMBIGUOUS
      )
      assert.strictEqual(testStepFinished.testStepId, testStep.id)
    })

  })
})