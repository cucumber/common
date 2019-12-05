import assert from 'assert'
import { messages } from 'cucumber-messages'

import CucumberSupportCode from '../src/CucumberSupportCode'
import SupportCodeExecutor from '../src/SupportCodeExecutor'

describe('CucumberSupportCode', () => {
  describe('#registerBeforeHook', () => {
    it('emits a TestCaseHookDefinitionConfig message', () => {
      const supportCode = new CucumberSupportCode()
      const executor = new SupportCodeExecutor(() => undefined)
      const message = supportCode.registerBeforeHook("@foo", executor)

      assert.ok(message.id.match(/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/))
      assert.strictEqual(message.tagExpression, "@foo")
    })
  })

  describe('#findBeforeHooks', () => {
    it('returns an empty array if no hooks are registered', () => {
      const supportCode = new CucumberSupportCode()

      assert.deepStrictEqual(supportCode.findBeforeHooks(["@foo"]), [])
    })

    it('returns the IDs of matching hooks', () => {
      const supportCode = new CucumberSupportCode()
      const executor = new SupportCodeExecutor(() => undefined)
      const hookId = supportCode.registerBeforeHook("@foo", executor).id

      assert.deepStrictEqual(supportCode.findBeforeHooks(["@foo"]), [hookId])
    })

    it('does not return IDs of non matching hooks', () => {
      const supportCode = new CucumberSupportCode()
      const executor = new SupportCodeExecutor(() => undefined)
      const fooHookId = supportCode.registerBeforeHook("@foo", executor).id
      const notFooHookId = supportCode.registerBeforeHook("not @foo", executor).id

      assert.deepStrictEqual(supportCode.findBeforeHooks(["@bar"]), [notFooHookId])
    })
  })

  context('#executeHook', () => {
    it('raises an exception if the hook in unknown', () => {
      const supportCode = new CucumberSupportCode()

      assert.throws(() => supportCode.executeHook('123'), Error, "Hook not found")
    })

    context('when the supportCodeExecutor does not throw an exception', () => {
      it('returns a message with status Passed', () => {
        const supportCode = new CucumberSupportCode()
        const executor = new SupportCodeExecutor(() => undefined)
        const hookId = supportCode.registerBeforeHook("", executor).id

        assert.strictEqual(supportCode.executeHook(hookId).status, messages.TestResult.Status.PASSED)
      })
    })

    context('when the supportCodeExecutor throws an exception', () => {
      it('returns a message with status Failed', () => {
        const supportCode = new CucumberSupportCode()
        const executor = new SupportCodeExecutor(() => { throw new Error("Something went wrong") })
        const hookId = supportCode.registerBeforeHook("", executor).id

        assert.strictEqual(supportCode.executeHook(hookId).status, messages.TestResult.Status.FAILED)
      })

      it('returns a message with the stacktrace', () => {
        const supportCode = new CucumberSupportCode()
        const executor = new SupportCodeExecutor(() => { throw new Error("Something went wrong") })
        const hookId = supportCode.registerBeforeHook("", executor).id

        assert.ok(supportCode.executeHook(hookId).message.includes("Something went wrong"))
      })
    })
  })
})