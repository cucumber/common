import assert, { AssertionError } from 'assert'
import { messages } from 'cucumber-messages'
import {
  Expression,
  CucumberExpression,
  ParameterTypeRegistry,
  RegularExpression,
  Argument,
  Group,
} from 'cucumber-expressions'

import CucumberSupportCode from '../src/CucumberSupportCode'
import SupportCodeExecutor from '../src/SupportCodeExecutor'

describe('CucumberSupportCode', () => {
  const uuidRegexp = /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/
  let supportCode: CucumberSupportCode
  let undefinedExecutor: SupportCodeExecutor

  beforeEach(() => {
    supportCode = new CucumberSupportCode()
    undefinedExecutor = new SupportCodeExecutor(() => undefined)
  })

  describe('#registerBeforeHook', () => {
    let message: messages.IHook

    beforeEach(() => {
      message = supportCode.registerBeforeHook('@foo', undefinedExecutor)
    })

    it('returns a Hook message with the Hook id', () => {
      assert.ok(message.id.match( uuidRegexp))
    })

    it('returns a Hook message with the Hook expression', () => {
      assert.strictEqual(message.tagExpression, '@foo')
    })
  })

  describe('#registerAfterHook', () => {
    let message: messages.IHook

    beforeEach(() => {
      message = supportCode.registerAfterHook('@bar', undefinedExecutor)
    })

    it('returns a Hook message with the Hook id', () => {
      assert.ok(message.id.match( uuidRegexp))
    })

    it('returns a Hook message with the Hook expression', () => {
      assert.strictEqual(message.tagExpression, '@bar')
    })
  })

  describe('#findBeforeHooks', () => {
    context('when there is no registered Hooks', () => {
      it('returns an empty array if no hooks are registered', () => {
        assert.deepStrictEqual(supportCode.findBeforeHooks(['@foo']), [])
      })
    })

    context('when before Hooks are registered', () => {
      let fooHookId: string
      let barHookId: string

      beforeEach(() => {
        fooHookId  = supportCode.registerBeforeHook(
          '@foo', undefinedExecutor
        ).id

        barHookId = supportCode.registerBeforeHook(
          '@bar',
          undefinedExecutor
        ).id
      })

      it('returns the IDs of matching before hooks', () => {
        assert.deepStrictEqual(supportCode.findBeforeHooks(['@foo']), [fooHookId])
        assert.deepStrictEqual(supportCode.findBeforeHooks(['@bar']), [barHookId])
      })

      it('can returns multiple IDs', () => {
        assert.deepStrictEqual(supportCode.findBeforeHooks(['@foo', '@bar']),[fooHookId, barHookId])
      })
    })

    context('when afterHooks are registered', () => {
      it("does not return their ID even if there's a match", () => {
        supportCode.registerAfterHook('@foo', undefinedExecutor).id
        assert.deepStrictEqual(supportCode.findBeforeHooks(['@foo']), [])
      })
    })
  })

  describe('#findAfterHooks', () => {
    context('when there is no registered Hooks', () => {
      it('returns an empty array if no hooks are registered', () => {
        assert.deepStrictEqual(supportCode.findAfterHooks(['@foo']), [])
      })
    })

    context('when after Hooks are registered', () => {
      let fooHookId: string
      let barHookId: string

      beforeEach(() => {
        fooHookId  = supportCode.registerAfterHook(
          '@foo', undefinedExecutor
        ).id

        barHookId = supportCode.registerAfterHook(
          '@bar',
          undefinedExecutor
        ).id
      })

      it('returns the IDs of matching before hooks', () => {
        assert.deepStrictEqual(supportCode.findAfterHooks(['@foo']), [fooHookId])
        assert.deepStrictEqual(supportCode.findAfterHooks(['@bar']), [barHookId])
      })

      it('can returns multiple IDs', () => {
        assert.deepStrictEqual(supportCode.findAfterHooks(['@foo', '@bar']),[fooHookId, barHookId])
      })
    })

    context('when beforeHooks are registered', () => {
      it("does not return their ID even if there's a match", () => {
        supportCode.registerBeforeHook('@foo', undefinedExecutor).id
        assert.deepStrictEqual(supportCode.findAfterHooks(['@foo']), [])
      })
    })
  })

  context('#executeHook', () => {
    it('raises an exception if the hook in unknown', () => {
      assert.throws(
        () => supportCode.executeHook('123'),
        Error,
        'Hook not found'
      )
    })

    context('when the supportCodeExecutor does not throw an exception', () => {
      it('returns a message with status Passed', () => {
        const hookId = supportCode.registerBeforeHook('', undefinedExecutor).id

        assert.strictEqual(
          supportCode.executeHook(hookId).status,
          messages.TestResult.Status.PASSED
        )
      })
    })

    context('when the supportCodeExecutor throws an exception', () => {
      it('returns a message with status Failed', () => {
        const executor = new SupportCodeExecutor(() => {
          throw new Error('Something went wrong')
        })
        const hookId = supportCode.registerBeforeHook('', executor).id

        assert.strictEqual(
          supportCode.executeHook(hookId).status,
          messages.TestResult.Status.FAILED
        )
      })

      it('returns a message with the stacktrace', () => {
        const executor = new SupportCodeExecutor(() => {
          throw new Error('Something went wrong')
        })
        const hookId = supportCode.registerBeforeHook('', executor).id

        assert.ok(
          supportCode
            .executeHook(hookId)
            .message.includes('Something went wrong')
        )
      })
    })
  })

  context('#registerStepDefinition', () => {
    it('returns a StepDefinition message', () => {
      const message = supportCode.registerStepDefinition(
        new CucumberExpression('a {word} step', new ParameterTypeRegistry()),
        undefinedExecutor
      )

      assert.ok(
        message.id.match(
          uuidRegexp
        )
      )
      assert.strictEqual(message.pattern.source, 'a {word} step')
    })

    it('has the correct step definition type', () => {
      const message = supportCode.registerStepDefinition(
        new CucumberExpression('a {word} step', new ParameterTypeRegistry()),
        undefinedExecutor
      )

      assert.strictEqual(
        message.pattern.type,
        messages.StepDefinitionPatternType.CUCUMBER_EXPRESSION
      )
    })

    it('has the correct step definition type', () => {
      const message = supportCode.registerStepDefinition(
        new RegularExpression(/a (.*) step/, new ParameterTypeRegistry()),
        undefinedExecutor
      )

      assert.strictEqual(
        message.pattern.type,
        messages.StepDefinitionPatternType.REGULAR_EXPRESSION
      )
    })
  })

  context('#findMatchingStepDefinitions', () => {
    it('returns an empty list if no steps have been registered', () => {
      const pickleStep = new messages.Pickle.PickleStep({
        text: 'a passed step',
      })

      assert.deepStrictEqual(
        supportCode.findMatchingStepDefinitions(pickleStep),
        []
      )
    })

    it('returns a match with the matching step definition id', () => {
      const stepDefinitionId = supportCode.registerStepDefinition(
        new CucumberExpression('a passed step', new ParameterTypeRegistry()),
        undefinedExecutor
      ).id
      const pickleStep = new messages.Pickle.PickleStep({
        text: 'a passed step',
      })

      const matches = supportCode.findMatchingStepDefinitions(pickleStep)
      assert.deepStrictEqual(matches[0].stepDefinitionId, stepDefinitionId)
    })

    it('returns a match with the arguments', () => {
      const stepDefinitionId = supportCode.registerStepDefinition(
        new CucumberExpression('a {word} {word}', new ParameterTypeRegistry()),
        undefinedExecutor
      ).id
      const pickleStep = new messages.Pickle.PickleStep({
        text: 'a passed step',
      })

      const matches = supportCode.findMatchingStepDefinitions(pickleStep)
      assert.deepStrictEqual(
        matches[0].args.map(arg => arg.group.value),
        ['passed', 'step']
      )
    })

    it('does not return non-matching step definition ids', () => {
      const stepDefinitionId = supportCode.registerStepDefinition(
        new CucumberExpression('a passed step', new ParameterTypeRegistry()),
        undefinedExecutor
      ).id
      const pickleStep = new messages.Pickle.PickleStep({
        text: 'a failed step',
      })

      assert.deepStrictEqual(
        supportCode.findMatchingStepDefinitions(pickleStep),
        []
      )
    })
  })

  context('#executeStepDefinition', () => {
    it('raises an exception when the step definition is unknown', () => {
      assert.throws(() => supportCode.executeStepDefinition('123', []), Error)
    })

    context('when the supportCodeExecutor does not throw an exception', () => {
      it('returns a message with status Passed', () => {
        const stepDefinitionId = supportCode.registerStepDefinition(
          new CucumberExpression('', new ParameterTypeRegistry()),
          undefinedExecutor
        ).id

        assert.strictEqual(
          supportCode.executeStepDefinition(stepDefinitionId, []).status,
          messages.TestResult.Status.PASSED
        )
      })

      it('returns a status PENDING if the support code returns the string "peinding"', () => {
        const stepDefinitionId = supportCode.registerStepDefinition(
          new CucumberExpression('', new ParameterTypeRegistry()),
          new SupportCodeExecutor(() => 'pending')
        ).id

        assert.strictEqual(
          supportCode.executeStepDefinition(stepDefinitionId, []).status,
          messages.TestResult.Status.PENDING
        )
      })
    })

    context('when the supportCodeExecutor throws an exception', () => {
      it('returns a message with status Failed', () => {
        const stepDefinitionId = supportCode.registerStepDefinition(
          new CucumberExpression('', new ParameterTypeRegistry()),
          new SupportCodeExecutor(() => {
            throw new Error('Something went wrong')
          })
        ).id

        assert.strictEqual(
          supportCode.executeStepDefinition(stepDefinitionId, []).status,
          messages.TestResult.Status.FAILED
        )
      })

      it('returns a message with the stack trace', () => {
        const stepDefinitionId = supportCode.registerStepDefinition(
          new CucumberExpression('', new ParameterTypeRegistry()),
          new SupportCodeExecutor(() => {
            throw new Error('No, this will: not work')
          })
        ).id

        assert.ok(
          supportCode
            .executeStepDefinition(stepDefinitionId, [])
            .message.includes('No, this will: not work')
        )
      })
    })

    it('correctly pass the arguments to the executor', () => {
      const stepDefinitionId = supportCode.registerStepDefinition(
        new CucumberExpression('', new ParameterTypeRegistry()),
        new SupportCodeExecutor((a, b) => {
          if (parseInt(a, 10) > parseInt(b, 10)) {
            throw new Error(`Expected ${a} lesser than ${b}`)
          }
        })
      ).id

      assert.strictEqual(
        supportCode.executeStepDefinition(stepDefinitionId, [
          new Argument(new Group('10', 0, 0, null), null),
          new Argument(new Group('12', 0, 0, null), null),
        ]).status,
        messages.TestResult.Status.PASSED
      )

      assert.strictEqual(
        supportCode.executeStepDefinition(stepDefinitionId, [
          new Argument(new Group('12', 0, 0, null), null),
          new Argument(new Group('10', 0, 0, null), null),
        ]).status,
        messages.TestResult.Status.FAILED
      )

      assert.ok(
        supportCode
          .executeStepDefinition(stepDefinitionId, [
            new Argument(new Group('12', 0, 0, null), null),
            new Argument(new Group('10', 0, 0, null), null),
          ])
          .message.includes('Expected 12 lesser than 10')
      )
    })
  })
})
