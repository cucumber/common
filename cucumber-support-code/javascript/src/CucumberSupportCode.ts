import { messages } from 'cucumber-messages'
import ISupportCodeExecutor from './ISupportCodeExecutor'
import Hook from './Hook'

export default class CucumberSupportCode {
  private beforeHooks: Hook[] = []
  private hookById: { [key: string]: Hook } = {}

  public registerBeforeHook(
    tagExpression: string,
    executor: ISupportCodeExecutor
  ): messages.ITestCaseHookDefinitionConfig {
    const hook = new Hook(tagExpression, executor)
    this.beforeHooks.push(hook)
    this.hookById[hook.id] = hook

    return new messages.TestCaseHookDefinitionConfig({
      id: hook.id,
      tagExpression,
    })
  }

  public findBeforeHooks(tags: string[]): string[] {
    return this.beforeHooks
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
