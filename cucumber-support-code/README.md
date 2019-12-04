# Cucumber Support Code

Library handling support code (Hooks & Step definitions) for Cucumber.

It provides the following entry points:

| method                                                                                                                 | description                                  |
| ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `registerBeforeHook(tagExpression: string, executor: ISupportCodeExecutor): messages.ITestCaseHookDefinitionConfig[]`  | register a before Hook                       |
| `registerAfterHook(tagExpression: string, executor: ISupportCodeExecutor): messages.ITestCaseHookDefinitionConfig[]`   |  register an after Hook                      |
| `registerStepDefinition(expression: Expression, executor: ISupportCodeExecutor): messages.IStepDefinitionConfig[]`     | register a step definition                   |
| `findBeforeHooks(tags: string): []string`                                                                              | returns the IDs of the before hooks applying |
| `findAfterHooks(tags: string): []string`                                                                               | returns the IDs of the after hooks applying  |
| `findMatchingStepDefinitions(step: IPickleStep): []IStepMatch`                                                         | returns matching steps and matches           |
| `executeHook(hookId: string): ITestResult`                                                                             | executes a Hook                              |
| `executeTestStep(testStep: ITestStep): ITestResult`                                                                    | | `executeStepDefinition(stepId: string, arguments: IStepMatchArgument, stepArgument: IPickleStepArgument): ITestResult` | executes a StepDefinition                    |
| `executeTestStep(testStep: ITestStep): ITestResult`                                                                    | executes a TestStep (note: the TestStep object has a reference to the StepDefinition and the match arguments or a reference to the Hook)                       |


Extra data:

```
interface IStepMatch {
  stepDefinitionId: string
  arguments: []IStepMatchArgument
}
```
