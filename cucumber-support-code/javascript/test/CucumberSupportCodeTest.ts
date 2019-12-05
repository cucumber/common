import assert, { AssertionError } from 'assert'
import { messages } from 'cucumber-messages'
import {
  Expression,
  CucumberExpression,
  ParameterTypeRegistry,
  RegularExpression,
  Argument,
} from 'cucumber-expressions'

import CucumberSupportCode from '../src/CucumberSupportCode'
import SupportCodeExecutor from '../src/SupportCodeExecutor'

describe('CucumberSupportCode', () => {
  describe('#registerBeforeHook', () => {
    it('returns a Hook message', () => {
      const supportCode = new CucumberSupportCode()
      const executor = new SupportCodeExecutor(() => undefined)
      const message = supportCode.registerBeforeHook('@foo', executor)

      assert.ok(
        message.id.match(
          /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/
        )
      )
      assert.strictEqual(message.tagExpression, '@foo')
    })
  })

  describe('#registerAfterHook', () => {
    it('returns a Hook message', () => {
      const supportCode = new CucumberSupportCode()
      const executor = new SupportCodeExecutor(() => undefined)
      const message = supportCode.registerAfterHook('@bar', executor)

      assert.ok(
        message.id.match(
          /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/
        )
      )
      assert.strictEqual(message.tagExpression, '@bar')
    })
  })

  describe('#findBeforeHooks', () => {
    it('returns an empty array if no hooks are registered', () => {
      const supportCode = new CucumberSupportCode()

      assert.deepStrictEqual(supportCode.findBeforeHooks(['@foo']), [])
    })

    it('returns the IDs of matching before hooks', () => {
      const supportCode = new CucumberSupportCode()
      const executor = new SupportCodeExecutor(() => undefined)
      const hookId = supportCode.registerBeforeHook('@foo', executor).id

      assert.deepStrictEqual(supportCode.findBeforeHooks(['@foo']), [hookId])
    })

    it('does not return IDs of non matching before hooks', () => {
      const supportCode = new CucumberSupportCode()
      const executor = new SupportCodeExecutor(() => undefined)
      const fooHookId = supportCode.registerBeforeHook('@foo', executor).id
      const notFooHookId = supportCode.registerBeforeHook('not @foo', executor)
        .id

      assert.deepStrictEqual(supportCode.findBeforeHooks(['@bar']), [
        notFooHookId,
      ])
    })

    it('does not match after hooks', () => {
      const supportCode = new CucumberSupportCode()
      const executor = new SupportCodeExecutor(() => undefined)
      const hookId = supportCode.registerAfterHook('@foo', executor).id

      assert.deepStrictEqual(supportCode.findBeforeHooks(['@foo']), [])
    })
  })

  describe('#findAfterHooks', () => {
    it('returns an empty array if no hooks are registered', () => {
      const supportCode = new CucumberSupportCode()

      assert.deepStrictEqual(supportCode.findAfterHooks(['@foo']), [])
    })

    it('returns the IDs of matching after hooks', () => {
      const supportCode = new CucumberSupportCode()
      const executor = new SupportCodeExecutor(() => undefined)
      const hookId = supportCode.registerAfterHook('@foo', executor).id

      assert.deepStrictEqual(supportCode.findAfterHooks(['@foo']), [hookId])
    })

    it('does not return IDs of non matching after hooks', () => {
      const supportCode = new CucumberSupportCode()
      const executor = new SupportCodeExecutor(() => undefined)
      const fooHookId = supportCode.registerAfterHook('@foo', executor).id
      const notFooHookId = supportCode.registerAfterHook('not @foo', executor)
        .id

      assert.deepStrictEqual(supportCode.findAfterHooks(['@bar']), [
        notFooHookId,
      ])
    })

    it('does not match before hooks', () => {
      const supportCode = new CucumberSupportCode()
      const executor = new SupportCodeExecutor(() => undefined)
      const hookId = supportCode.registerBeforeHook('@foo', executor).id

      assert.deepStrictEqual(supportCode.findAfterHooks(['@foo']), [])
    })
  })

  context('#executeHook', () => {
    it('raises an exception if the hook in unknown', () => {
      const supportCode = new CucumberSupportCode()

      assert.throws(
        () => supportCode.executeHook('123'),
        Error,
        'Hook not found'
      )
    })

    context('when the supportCodeExecutor does not throw an exception', () => {
      it('returns a message with status Passed', () => {
        const supportCode = new CucumberSupportCode()
        const executor = new SupportCodeExecutor(() => undefined)
        const hookId = supportCode.registerBeforeHook('', executor).id

        assert.strictEqual(
          supportCode.executeHook(hookId).status,
          messages.TestResult.Status.PASSED
        )
      })
    })

    context('when the supportCodeExecutor throws an exception', () => {
      it('returns a message with status Failed', () => {
        const supportCode = new CucumberSupportCode()
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
        const supportCode = new CucumberSupportCode()
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
      const supportCode = new CucumberSupportCode()
      const message = supportCode.registerStepDefinition(
        new CucumberExpression('a {word} step', new ParameterTypeRegistry()),
        new SupportCodeExecutor(() => undefined)
      )

      assert.ok(
        message.id.match(
          /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/
        )
      )
      assert.strictEqual(message.pattern.source, 'a {word} step')
    })

    it('has the correct step definition type', () => {
      const supportCode = new CucumberSupportCode()
      const message = supportCode.registerStepDefinition(
        new CucumberExpression('a {word} step', new ParameterTypeRegistry()),
        new SupportCodeExecutor(() => undefined)
      )

      assert.strictEqual(
        message.pattern.type,
        messages.StepDefinitionPatternType.CUCUMBER_EXPRESSION
      )
    })

    it('has the correct step definition type', () => {
      const supportCode = new CucumberSupportCode()
      const message = supportCode.registerStepDefinition(
        new RegularExpression(/a (.*) step/, new ParameterTypeRegistry()),
        new SupportCodeExecutor(() => undefined)
      )

      assert.strictEqual(
        message.pattern.type,
        messages.StepDefinitionPatternType.REGULAR_EXPRESSION
      )
    })
  })

  context('#findMatchingStepDefinitions', () => {
    it('returns an empty list if no steps have been registered', () => {
      const supportCode = new CucumberSupportCode()
      const pickleStep = new messages.Pickle.PickleStep({
        text: 'a passed step',
      })

      assert.deepStrictEqual(
        supportCode.findMatchingStepDefinitions(pickleStep),
        []
      )
    })
  })

  it('returns a match with the matching step definition id', () => {
    const supportCode = new CucumberSupportCode()
    const stepDefinitionId = supportCode.registerStepDefinition(
      new CucumberExpression('a passed step', new ParameterTypeRegistry()),
      new SupportCodeExecutor(() => undefined)
    ).id
    const pickleStep = new messages.Pickle.PickleStep({
      text: 'a passed step',
    })

    const matches = supportCode.findMatchingStepDefinitions(pickleStep)
    assert.deepStrictEqual(matches[0].stepDefinitionId, stepDefinitionId)
  })

  it('returns a match with the arguments', () => {
    const supportCode = new CucumberSupportCode()
    const stepDefinitionId = supportCode.registerStepDefinition(
      new CucumberExpression('a {word} {word}', new ParameterTypeRegistry()),
      new SupportCodeExecutor(() => undefined)
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
    const supportCode = new CucumberSupportCode()
    const stepDefinitionId = supportCode.registerStepDefinition(
      new CucumberExpression('a passed step', new ParameterTypeRegistry()),
      new SupportCodeExecutor(() => undefined)
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
