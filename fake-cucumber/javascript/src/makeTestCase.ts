import { IdGenerator, messages } from 'cucumber-messages'
import { GherkinQuery } from 'gherkin'
import TestCase from './TestCase'
import IStepDefinition from './IStepDefinition'
import IHook from './IHook'
import makePickleTestStep from './makePickleTestStep'
import HookTestStep from './HookTestStep'
import ITestStep from './ITestStep'
import IClock from './IClock'
import { MakeErrorMessage } from './ErrorMessageGenerator'

export default function makeTestCase(
  pickle: messages.IPickle,
  stepDefinitions: IStepDefinition[],
  beforeHooks: IHook[],
  afterHooks: IHook[],
  gherkinQuery: GherkinQuery,
  newId: IdGenerator.NewId,
  clock: IClock,
  makeErrorMessage: MakeErrorMessage
): TestCase {
  const beforeHookSteps = makeHookSteps(
    pickle,
    beforeHooks,
    false,
    gherkinQuery,
    newId,
    clock,
    makeErrorMessage
  )
  const pickleTestSteps = pickle.steps.map(pickleStep => {
    const sourceFrames = pickleStep.astNodeIds.map(
      astNodeId => `${pickle.uri}:${gherkinQuery.getLocation(astNodeId).line}`
    )
    return makePickleTestStep(
      newId(),
      pickleStep,
      stepDefinitions,
      sourceFrames,
      clock,
      makeErrorMessage
    )
  })
  const afterHookSteps = makeHookSteps(
    pickle,
    afterHooks,
    true,
    gherkinQuery,
    newId,
    clock,
    makeErrorMessage
  )
  const testSteps: ITestStep[] = []
    .concat(beforeHookSteps)
    .concat(pickleTestSteps)
    .concat(afterHookSteps)

  return new TestCase(newId(), testSteps, pickle.id, clock)
}

function makeHookSteps(
  pickle: messages.IPickle,
  hooks: IHook[],
  alwaysExecute: boolean,
  gherkinQuery: GherkinQuery,
  newId: IdGenerator.NewId,
  clock: IClock,
  makeErrorMessage: MakeErrorMessage
): ITestStep[] {
  return hooks
    .map(hook => {
      const supportCodeExecutor = hook.match(pickle)
      if (supportCodeExecutor !== null) {
        const id = newId()

        const sourceFrames = pickle.astNodeIds.map(
          astNodeId =>
            `${pickle.uri}:${gherkinQuery.getLocation(astNodeId).line}`
        )
        return new HookTestStep(
          id,
          hook.id,
          alwaysExecute,
          [supportCodeExecutor],
          sourceFrames,
          clock,
          makeErrorMessage
        )
      }
    })
    .filter(testStep => testStep !== undefined)
}
