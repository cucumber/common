import assert from 'assert'
import { stubConstructor } from 'ts-sinon'

import { messages } from 'cucumber-messages'
import { CucumberSupportCode } from '../../src/support-code'

import StepMatch from '../../src/support-code/StepMatch'
import PickleTestStep from '../../src/test-case-builder/PickleTestStep'

describe('test-case-builder/PickleTestStep', () => {
  describe('#run', () => {
    it('returns a TestResult with status UNDEFINED when there are no matching step definitions', () => {
      const supportCode = stubConstructor(CucumberSupportCode)
      supportCode.findMatchingStepDefinitions.returns([])

      const testStep = new PickleTestStep(
        supportCode,
        messages.Pickle.PickleStep.create()
      )
      const testResult = testStep.run()

      assert.strictEqual(
        testResult.status,
        messages.TestResult.Status.UNDEFINED
      )
    })

    it('returns a TestResult with status AMBIGUOUS when there are multiple matching step definitions', () => {
      const supportCode = stubConstructor(CucumberSupportCode)
      supportCode.findMatchingStepDefinitions.returns([undefined, undefined])

      const testStep = new PickleTestStep(
        supportCode,
        messages.Pickle.PickleStep.create()
      )
      const testResult = testStep.run()

      assert.strictEqual(
        testResult.status,
        messages.TestResult.Status.AMBIGUOUS
      )
    })

    it('returns a TestResult with the result produced by CucumberSupportCode', () => {
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
      assert.deepStrictEqual(testStep.run(), testResult)
    })
  })
})
