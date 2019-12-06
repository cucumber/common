import assert from 'assert'
import { stubConstructor } from 'ts-sinon'

import { messages } from 'cucumber-messages'
import { CucumberSupportCode } from '../../src/support-code'

import HookTestStep from '../../src/test-case-builder/HookTestStep'

function execute(testStep: HookTestStep): messages.ITestStepFinished {
  const receivedMessages: messages.IEnvelope[] = []
  testStep.execute(
    message => receivedMessages.push(message),
    'some-testCaseStartedId'
  )
  return receivedMessages.pop().testStepFinished
}

describe('test-case-builder/HookTestStep', () => {
  describe('#execute', () => {
    it('emits a TestStepFinished with the result produced by CucumberSupportCode', () => {
      const testResult = new messages.TestResult({
        message: 'Everything is ok',
      })

      const supportCode = stubConstructor(CucumberSupportCode)
      supportCode.executeHook.returns(testResult)

      const testStep = new HookTestStep(supportCode, 'hook-id')
      const testStepFinished = execute(testStep)

      assert.deepStrictEqual(testStepFinished.testResult, testResult)
    })
  })
})
