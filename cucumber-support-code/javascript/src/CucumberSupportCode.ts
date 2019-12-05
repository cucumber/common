import { messages } from 'cucumber-messages'
import ISupportCodeExecutor from './ISupportCodeExecutor'
import Hook from './Hook'
import ICucumberSupportCode from './ICucumberSupportCode'

export default class CucumberSupportCode implements ICucumberSupportCode {
  private beforeHooks: Hook[] = []
  private afterHooks: Hook[] = []
  private hookById: { [key: string]: Hook } = {}

  public registerBeforeHook(
    tagExpression: string,
    executor: ISupportCodeExecutor
  ): messages.IHook {
    return this.registerHook(this.beforeHooks, tagExpression, executor)
  }

  public registerAfterHook(
    tagExpression: string,
    executor: ISupportCodeExecutor
  ): messages.IHook {
    return this.registerHook(this.afterHooks, tagExpression, executor)
  }

  private registerHook(
    storage: Hook[],
    tagExpression: string,
    executor: ISupportCodeExecutor
  ): messages.IHook {
    const hook = new Hook(tagExpression, executor)
    storage.push(hook)
    this.hookById[hook.id] = hook

    return new messages.Hook({
      id: hook.id,
      tagExpression,
    })
  }

  public findBeforeHooks(tags: string[]): string[] {
    return this.findHooks(tags, this.beforeHooks)
  }

  public findAfterHooks(tags: string[]): string[] {
    return this.findHooks(tags, this.afterHooks)
  }

  private findHooks(tags: string[], hooks: Hook[]): string[] {
    return hooks
      .map(hook => (hook.match(tags) ? hook.id : undefined))
      .filter(hookId => hookId !== undefined)
  }

  public executeHook(hookId: string): messages.ITestResult {
    const hook = this.hookById[hookId]
    if (hook === undefined) {
      throw new Error('Hook not found')
    }

    try {
      hook.execute()

      return new messages.TestResult({
        status: messages.TestResult.Status.PASSED,
      })
    } catch (error) {
      return new messages.TestResult({
        status: messages.TestResult.Status.FAILED,
        message: error.stack,
      })
    }
  }
}
