import { messages, IdGenerator } from 'cucumber-messages'
import TestCase from './TestCase'
import IStepDefinition from './IStepDefinition'
import IHook, { HookType } from './IHook'
import makePickleTestStep from './makePickleTestStep'
import HookTestStep from './HookTestStep'
import ITestStep from './ITestStep'

function makeHookSteps(
  pickle: messages.IPickle,
  hooks: IHook[],
  hookType: HookType,
  newId: IdGenerator.NewId
): ITestStep[] {
  return hooks
    .map(hook => {
      const supportCodeExecutor = hook.match(pickle, hookType)
      const alwaysExecute = hookType === HookType.After
      if (supportCodeExecutor !== null) {
        const id = newId()
        return new HookTestStep(id, hook.id, alwaysExecute, [
          supportCodeExecutor,
        ])
      }
    })
    .filter(testStep => testStep !== undefined)
}

export default function makeTestCase(
  pickle: messages.IPickle,
  stepDefinitions: IStepDefinition[],
  hooks: IHook[],
  newId: IdGenerator.NewId
): TestCase {
  const beforeHookSteps = makeHookSteps(pickle, hooks, HookType.Before, newId)
  const afterHookSteps = makeHookSteps(pickle, hooks, HookType.After, newId)

  const pickleTestSteps = pickle.steps.map(pickleStep =>
    makePickleTestStep(newId(), pickleStep, stepDefinitions)
  )
  const testSteps: ITestStep[] = []
    .concat(beforeHookSteps)
    .concat(pickleTestSteps)
    .concat(afterHookSteps)

  return new TestCase(newId(), testSteps, pickle.id)
}
