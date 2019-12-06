import assert from 'assert'
import { stubConstructor } from 'ts-sinon'

import { messages } from 'cucumber-messages'
import { CucumberSupportCode } from '../../src/support-code'

import HookTestStep from '../../src/test-case-builder/HookTestStep'

describe('test-case-builder/HookTestStep', () => {
  describe('#run', () => {
    it('return the result produced by CucumberSupportCode', () => {
      const testResult = new messages.TestResult({
        status: messages.TestResult.Status.AMBIGUOUS,
        message: 'Everything is ok',
      })

      const supportCode = stubConstructor(CucumberSupportCode)
      supportCode.executeHook.returns(testResult)

      const testStep = new HookTestStep(supportCode, 'hook-id')
      assert.deepStrictEqual(testStep.run(), testResult)
    })
  })
})
