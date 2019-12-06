import assert from 'assert'
import { stubConstructor } from 'ts-sinon'

import { messages } from 'cucumber-messages'
import { CucumberSupportCode } from '../../src/support-code'

import StepMatch from '../../src/support-code/StepMatch'
import PickleTestStep from '../../src/test-case-builder/PickleTestStep'

function execute(testStep: PickleTestStep): messages.ITestStepFinished {
  const receivedMessages: messages.IEnvelope[] = []
  testStep.execute(
    message => receivedMessages.push(message),
    'some-testCaseStartedId'
  )
  return receivedMessages.pop().testStepFinished
}

describe('test-case-builder/PickleTestStep', () => {
  describe('#execute', () => {
    it('emits a TestStepFinished with status UNDEFINED when there are no matching step definitions', () => {
      const supportCode = stubConstructor(CucumberSupportCode)
      supportCode.findMatchingStepDefinitions.returns([])

      const testStep = new PickleTestStep(
        supportCode,
        messages.Pickle.PickleStep.create()
      )
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

      const testStep = new PickleTestStep(
        supportCode,
        messages.Pickle.PickleStep.create()
      )
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
        status: messages.TestResult.Status.AMBIGUOUS,
        message: 'Everything is ok',
      })

      const supportCode = stubConstructor(CucumberSupportCode)
      supportCode.findMatchingStepDefinitions.returns([stepMatch])
      supportCode.executeStepDefinition.returns(testResult)

      const testStep = new PickleTestStep(
        supportCode,
        messages.Pickle.PickleStep.create()
      )
      const testStepFinished = execute(testStep)

      assert.deepStrictEqual(testStepFinished.testResult, testResult)
    })
  })
})
