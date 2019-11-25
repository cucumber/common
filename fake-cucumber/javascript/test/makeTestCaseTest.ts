import assert from 'assert'
import { messages } from 'cucumber-messages'
import makeTestCase from '../src/makeTestCase'
import ExpressionStepDefinition from '../src/ExpressionStepDefinition'
import { HookType } from '../src/IHook'
import ScenarioNameHook from '../src/ScenarioNameHook'

import { CucumberExpression, ParameterTypeRegistry } from 'cucumber-expressions'

describe('makeTestCase', () => {
  it('transforms a Pickle to a TestCase', () => {
    const pickle = makePickle('some scenario')
    const stepDefinitions = makeStepDefinitions()
    const testCase = makeTestCase(pickle, stepDefinitions, [])

    assert.deepStrictEqual(
      testCase.toMessage().testCase.testSteps.map(s => s.pickleStepId),
      ['step-1', 'step-2']
    )
  })

  context('when hooks are defined', () => {
    context('when a before hook matches', () => {
      it('adds a step before the scenario ones', () => {
        const hooks = [
          new ScenarioNameHook(
            HookType.Before,
            /passed before hook/,
            () => null
          ),
        ]
        const pickle = makePickle('some scenario with a passed before hook')
        const stepDefinitions = makeStepDefinitions()
        const testCase = makeTestCase(pickle, stepDefinitions, hooks)

        assert.deepStrictEqual(
          testCase.toMessage().testCase.testSteps.map(s => s.pickleStepId),
          ['', 'step-1', 'step-2']
        )
        assert.strictEqual(
          testCase.toMessage().testCase.testSteps[0].hookId,
          hooks[0].toMessage().testCaseHookDefinitionConfig.id
        )
      })
    })
  })
  context('when an after hook matches', () => {
    it('adds a step after the scenario ones', () => {
      const hooks = [
        new ScenarioNameHook(HookType.After, /passed after hook/, () => null),
      ]
      const pickle = makePickle('some scenario with a passed after hook')
      const stepDefinitions = makeStepDefinitions()
      const testCase = makeTestCase(pickle, stepDefinitions, hooks)

      assert.deepStrictEqual(
        testCase.toMessage().testCase.testSteps.map(s => s.pickleStepId),
        ['step-1', 'step-2', '']
      )
      assert.strictEqual(
        testCase.toMessage().testCase.testSteps[2].hookId,
        hooks[0].toMessage().testCaseHookDefinitionConfig.id
      )
    })
  })

  function makePickle(name: string) {
    return new messages.Pickle({
      id: 'some-id',
      name,
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

  function makeStepDefinitions() {
    const parameterTypeRegistry = new ParameterTypeRegistry()
    return [
      new ExpressionStepDefinition(
        new CucumberExpression('a passed {word}', parameterTypeRegistry),
        (thing: string) => undefined
      ),
      new ExpressionStepDefinition(
        new CucumberExpression('a failed {word}', parameterTypeRegistry),
        (thing: string) => undefined
      ),
    ]
  }
})
