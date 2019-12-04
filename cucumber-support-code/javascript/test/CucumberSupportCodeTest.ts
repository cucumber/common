import assert from 'assert'
import { messages } from 'cucumber-messages'
import ISupportCodeExecutor from '../src/ISupportCodeExecutor'
import SupportCodeExecutor from '../src/SupportCodeExecutor'
import uuidv4 from 'uuid/v4'
import parseTagExpression from 'cucumber-tag-expressions'
import { isMainThread } from 'worker_threads'
import { isContext } from 'vm'

class Hook {
  public readonly id: string = uuidv4()

  constructor(
    private readonly tagExpression: string,
    private readonly executor: ISupportCodeExecutor
  ) {}

  public match(tags: string[]): boolean {
    const expression = parseTagExpression(this.tagExpression)
    return expression.evaluate(tags)
  }

  public execute(): any {
    return this.executor.execute()
  }
}

class CucumberSupportCode {
  private beforeHooks: Hook[] = []
  private hookById: { [key: string]: Hook; } = {}

  public registerBeforeHook(
    tagExpression: string,
    executor: ISupportCodeExecutor
  ): messages.ITestCaseHookDefinitionConfig {
    const hook = new Hook(tagExpression, executor)
    this.beforeHooks.push(hook)
    this.hookById[hook.id] = hook

    return new messages.TestCaseHookDefinitionConfig({
      id: hook.id,
      tagExpression: tagExpression
    })
  }

  public findBeforeHooks(tags: string[]): string[] {
    return this.beforeHooks
      .map(hook => hook.match(tags) ? hook.id : undefined)
      .filter(hookId => hookId !== undefined)
  }

  public executeHook(hookId: string): messages.ITestResult {
    const hook = this.hookById[hookId]
    if (hook === undefined) {
      throw new Error("Hook not found")
    }

    try {
      hook.execute()

      return new messages.TestResult({
        status: messages.TestResult.Status.PASSED,
      })
    } catch (error) {
      return new messages.TestResult({
        status: messages.TestResult.Status.FAILED,
        message: error.stack
      })
    }
  }
}

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