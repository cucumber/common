import assert from 'assert'
import { messages } from 'cucumber-messages'
import TestCase from '../../src/test-case-builder/TestCase'
import {
  ICucumberSupportCode,
  CucumberSupportCode,
  SupportCodeExecutor,
} from '../../src/support-code'

import ITestStep from '../../src/test-case-builder/ITestStep'
import PickleTestStep from '../../src/test-case-builder/PickleTestStep'
import HookTestStep from '../../src/test-case-builder/HookTestStep'

function makeTestCase(
  pickle: messages.IPickle,
  supportCode: ICucumberSupportCode
): TestCase {
  const pickleTags = pickle.tags.map(tag => tag.name)

  const beforeHookSteps = supportCode
    .findBeforeHooks(pickleTags)
    .map(hookId => new HookTestStep(supportCode, hookId))

  const pickleSteps = pickle.steps.map(
    pickleStep => new PickleTestStep(supportCode, pickleStep)
  )

  const afterHookSteps = supportCode
    .findAfterHooks(pickleTags)
    .map(hookId => new HookTestStep(supportCode, hookId))

  const steps: ITestStep[] = []
    .concat(beforeHookSteps)
    .concat(pickleSteps)
    .concat(afterHookSteps)

  return new TestCase(steps, pickle.id)
}

describe('test-case-builder/makeTestCase', () => {
  let supportCode: ICucumberSupportCode

  beforeEach(() => {
    supportCode = new CucumberSupportCode()
  })

  it('transforms a Pickle to a TestCase', () => {
    const pickle = makePickleWithTwoSteps()
    const testCase = makeTestCase(pickle, supportCode)

    assert.deepStrictEqual(
      testCase.toMessage().testCase.testSteps.map(s => s.pickleStepId),
      ['step-1', 'step-2']
    )
  })

  context('when hooks are defined', () => {
    context('when a before hook matches', () => {
      it('adds a step before the scenario ones', () => {
        const hook = supportCode.registerBeforeHook(
          null,
          new SupportCodeExecutor(() => null)
        )
        const pickle = makePickleWithTwoSteps()
        const testCase = makeTestCase(pickle, supportCode)

        assert.deepStrictEqual(
          testCase.toMessage().testCase.testSteps.map(s => s.pickleStepId),
          [undefined, 'step-1', 'step-2']
        )
        assert.strictEqual(
          testCase.toMessage().testCase.testSteps[0].hookId,
          hook.id
        )
      })
    })
  })

  context('when an after hook matches', () => {
    it('adds a step after the scenario ones', () => {
      const hook = supportCode.registerAfterHook(
        null,
        new SupportCodeExecutor(() => null)
      )
      const pickle = makePickleWithTwoSteps()
      const testCase = makeTestCase(pickle, supportCode)

      assert.deepStrictEqual(
        testCase.toMessage().testCase.testSteps.map(s => s.pickleStepId),
        ['step-1', 'step-2', undefined]
      )
      assert.strictEqual(
        testCase.toMessage().testCase.testSteps[2].hookId,
        hook.id
      )
    })
  })

  function makePickleWithTwoSteps() {
    return new messages.Pickle({
      id: 'some-id',
      name: 'some name',
      steps: [
        new messages.Pickle.PickleStep({
          id: 'step-1',
          text: 'a passed step',
        }),
        new messages.Pickle.PickleStep({
          id: 'step-2',
          text: 'a failed step',
        }),
      ],
    })
  }
})
