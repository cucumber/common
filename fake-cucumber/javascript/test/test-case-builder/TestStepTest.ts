import assert from 'assert'
import { stubConstructor } from 'ts-sinon'

import { messages } from 'cucumber-messages'
import { CucumberSupportCode } from '../../src/support-code'

import StepMatch from '../../src/support-code/StepMatch'
import TestStep from '../../src/test-case-builder/TestStep'


function execute(testStep: TestStep): messages.ITestStepFinished {
  const receivedMessages: messages.IEnvelope[] = []
  testStep.execute(
    message => receivedMessages.push(message),
    'some-testCaseStartedId'
  )
  return receivedMessages.pop().testStepFinished
}

describe('test-case-builder/TestStep', () => {
  describe('#execute', () => {
    it('emits a TestStepFinished with status UNDEFINED when there are no matching step definitions', () => {
      const supportCode = stubConstructor(CucumberSupportCode)
      supportCode.findMatchingStepDefinitions.returns([])

      const testStep = new TestStep(supportCode, messages.Pickle.PickleStep.create())
      const testStepFinished = execute(testStep)

      assert.strictEqual(
        testStepFinished.testResult.status,
        messages.TestResult.Status.UNDEFINED
      )
      assert.strictEqual(testStepFinished.testStepId, testStep.id)
    })

    it('emits a TestStepFinished with status AMBIGUOUS when there are multiple matching step definitions', () => {
      const supportCode = stubConstructor(CucumberSupportCode)
      supportCode.findMatchingStepDefinitions.returns([undefined, undefined])

      const testStep = new TestStep(supportCode, messages.Pickle.PickleStep.create())
      const testStepFinished = execute(testStep)

      assert.strictEqual(
        testStepFinished.testResult.status,
        messages.TestResult.Status.AMBIGUOUS
      )
      assert.strictEqual(testStepFinished.testStepId, testStep.id)
    })

    it('emits a TestStepFinished with the result produced by CucumberSupportCode', () => {
      const stepMatch = new StepMatch('123', [])
      const testResult = new messages.TestResult({
        message: "Everything is ok"
      })

      const supportCode = stubConstructor(CucumberSupportCode)
      supportCode.findMatchingStepDefinitions.returns([stepMatch])
      supportCode.executeStepDefinition.returns(testResult)

      const testStep = new TestStep(supportCode, messages.Pickle.PickleStep.create())
      const testStepFinished = execute(testStep)

      assert.deepStrictEqual(testStepFinished.testResult, testResult)
    })
  })
})