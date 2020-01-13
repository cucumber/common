import assert from 'assert'
import { IdGenerator, messages } from 'cucumber-messages'
import makeTestCase from '../src/makeTestCase'
import ExpressionStepDefinition from '../src/ExpressionStepDefinition'
import Hook from '../src/Hook'
import { CucumberExpression, ParameterTypeRegistry } from 'cucumber-expressions'
import { GherkinQuery } from 'gherkin'
import IncrementClock from '../src/IncrementClock'

describe('makeTestCase', () => {
  it('transforms a Pickle to a TestCase', () => {
    const pickle = makePickleWithTwoSteps()
    const stepDefinitions = makeStepDefinitions()
    const testCase = makeTestCase(
      pickle,
      stepDefinitions,
      [],
      [],
      new GherkinQuery(),
      IdGenerator.incrementing(),
      new IncrementClock()
    )

    assert.deepStrictEqual(
      testCase.toMessage().testCase.testSteps.map(s => s.pickleStepId),
      ['step-1', 'step-2']
    )
  })

  context('when hooks are defined', () => {
    context('when a before hook matches', () => {
      it('adds a step before the scenario ones', () => {
        const beforeHooks = [new Hook('hook-id', null, null, () => null)]
        const pickle = makePickleWithTwoSteps()
        const stepDefinitions = makeStepDefinitions()
        const testCase = makeTestCase(
          pickle,
          stepDefinitions,
          beforeHooks,
          [],
          new GherkinQuery(),
          IdGenerator.incrementing(),
          new IncrementClock()
        )

        assert.deepStrictEqual(
          testCase.toMessage().testCase.testSteps.map(s => s.pickleStepId),
          [undefined, 'step-1', 'step-2']
        )
        assert.strictEqual(
          testCase.toMessage().testCase.testSteps[0].hookId,
          beforeHooks[0].toMessage().hook.id
        )
      })
    })
  })

  context('when an after hook matches', () => {
    it('adds a step after the scenario ones', () => {
      const afterHooks = [new Hook('hook-id', null, null, () => null)]
      const pickle = makePickleWithTwoSteps()
      const stepDefinitions = makeStepDefinitions()
      const testCase = makeTestCase(
        pickle,
        stepDefinitions,
        [],
        afterHooks,
        new GherkinQuery(),
        IdGenerator.incrementing(),
        new IncrementClock()
      )

      assert.deepStrictEqual(
        testCase.toMessage().testCase.testSteps.map(s => s.pickleStepId),
        ['step-1', 'step-2', undefined]
      )
      assert.strictEqual(
        testCase.toMessage().testCase.testSteps[2].hookId,
        afterHooks[0].toMessage().hook.id
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

  function makeStepDefinitions() {
    const parameterTypeRegistry = new ParameterTypeRegistry()
    return [
      new ExpressionStepDefinition(
        'hook-id',
        new CucumberExpression('a passed {word}', parameterTypeRegistry),
        null,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (thing: string) => undefined
      ),
      new ExpressionStepDefinition(
        'hook-id',
        new CucumberExpression('a failed {word}', parameterTypeRegistry),
        null,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (thing: string) => undefined
      ),
    ]
  }
})
