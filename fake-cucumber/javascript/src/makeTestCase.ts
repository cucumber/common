import { messages } from 'cucumber-messages'
import TestCase from './TestCase'
import IStepDefinition from './IStepDefinition'
import IHook, { HookType } from './IHook'
import makePickleTestStep from './makePickleTestStep'
import HookTestStep from './HookTestStep'
import ITestStep from './ITestStep'

function makeHookSteps(
  pickle: messages.IPickle,
  hooks: IHook[],
  hookType: HookType
): ITestStep[] {
  return hooks
    .map(hook => {
      const supportCodeExecutor = hook.match(pickle, hookType)
      const alwaysExecute = hookType === HookType.After
      if (supportCodeExecutor !== null) {
        return new HookTestStep(hook.id, alwaysExecute, [supportCodeExecutor])
      }
    })
    .filter(testStep => testStep !== undefined)
}

export default function makeTestCase(
  pickle: messages.IPickle,
  stepDefinitions: IStepDefinition[],
  hooks: IHook[]
): TestCase {
  const beforeHookSteps = makeHookSteps(pickle, hooks, HookType.Before)
  const afterHookSteps = makeHookSteps(pickle, hooks, HookType.After)

  const pickleTestSteps = pickle.steps.map(pickleStep =>
    makePickleTestStep(pickleStep, stepDefinitions)
  )
  const testSteps: ITestStep[] = []
    .concat(beforeHookSteps)
    .concat(pickleTestSteps)
    .concat(afterHookSteps)

  return new TestCase(testSteps, pickle.id)
}
