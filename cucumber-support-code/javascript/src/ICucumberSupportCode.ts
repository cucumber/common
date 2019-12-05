import { messages } from 'cucumber-messages'
import { Expression } from 'cucumber-expressions'
import ISupportCodeExecutor from './ISupportCodeExecutor'
import IStepMatch from './IStepMatch'

export default interface ICucumberSupportCode {
  registerBeforeHook(
    tagExpression: string,
    executor: ISupportCodeExecutor
  ): messages.IHook

  registerAfterHook(
    tagExpression: string,
    executor: ISupportCodeExecutor
  ): messages.IHook

  registerStepDefinition(
    expression: Expression,
    executor: ISupportCodeExecutor
  ): messages.IStepDefinition

  findBeforeHooks(tags: string[]): string[]

  findAfterHooks(tags: string[]): string[]

  findMatchingStepDefinitions(step: messages.Pickle.IPickleStep): IStepMatch[]

  executeHook(hookId: string): messages.ITestResult

  // executeStepDefinition(
  //   stepId: string,
  //   stepArguments: messages.IStepMatchArgument[]
  // ): messages.ITestResult

  // executeTestStep(testStep: messages.TestCase.ITestStep): messages.ITestResult
}
