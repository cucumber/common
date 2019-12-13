import { IdGenerator, messages } from 'cucumber-messages'
import TestCase from './TestCase'
import IStepDefinition from './IStepDefinition'
import IHook from './IHook'
import makePickleTestStep from './makePickleTestStep'
import HookTestStep from './HookTestStep'
import ITestStep from './ITestStep'

export default function makeTestCase(
  pickle: messages.IPickle,
  stepDefinitions: IStepDefinition[],
  beforeHooks: IHook[],
  afterHooks: IHook[],
  newId: IdGenerator.NewId
): TestCase {
  const beforeHookSteps = makeHookSteps(pickle, beforeHooks, false, newId)
  const pickleTestSteps = pickle.steps.map(pickleStep =>
    makePickleTestStep(newId(), pickleStep, stepDefinitions)
  )
  const afterHookSteps = makeHookSteps(pickle, afterHooks, true, newId)
  const testSteps: ITestStep[] = []
    .concat(beforeHookSteps)
    .concat(pickleTestSteps)
    .concat(afterHookSteps)

  return new TestCase(newId(), testSteps, pickle.id)
}

function makeHookSteps(
  pickle: messages.IPickle,
  hooks: IHook[],
  alwaysExecute: boolean,
  newId: IdGenerator.NewId
): ITestStep[] {
  return hooks
    .map(hook => {
      const supportCodeExecutor = hook.match(pickle)
      if (supportCodeExecutor !== null) {
        const id = newId()
        return new HookTestStep(id, hook.id, alwaysExecute, [
          supportCodeExecutor,
        ])
      }
    })
    .filter(testStep => testStep !== undefined)
}
