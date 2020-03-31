import { IdGenerator, messages } from '@cucumber/messages'
import { Query } from '@cucumber/gherkin'
import TestCase from './TestCase'
import IStepDefinition from './IStepDefinition'
import IHook from './IHook'
import ITestStep from './ITestStep'
import IClock from './IClock'
import { MakeErrorMessage } from './ErrorMessageGenerator'
import EmptyPickleTestStep from './EmptyPickleTestStep'
import { MakePickleTestStep, MakeHookTestStep } from './types'

export default function makeTestCase(
  pickle: messages.IPickle,
  stepDefinitions: ReadonlyArray<IStepDefinition>,
  beforeHooks: ReadonlyArray<IHook>,
  afterHooks: ReadonlyArray<IHook>,
  gherkinQuery: Query,
  newId: IdGenerator.NewId,
  clock: IClock,
  makeErrorMessage: MakeErrorMessage,
  makePickleTestStep: MakePickleTestStep,
  makeHookStep: MakeHookTestStep
): TestCase {
  if (pickle.steps.length === 0) {
    const id = newId()
    const undefinedStep = new EmptyPickleTestStep(
      id,
      undefined,
      true,
      [],
      [],
      clock,
      makeErrorMessage
    )
    return new TestCase(newId(), [undefinedStep], pickle.id, clock)
  }

  const beforeHookSteps = makeHookSteps(
    pickle,
    beforeHooks,
    false,
    gherkinQuery,
    newId,
    clock,
    makeErrorMessage,
    makeHookStep
  )
  const pickleTestSteps = pickle.steps.map((pickleStep) => {
    const sourceFrames = pickleStep.astNodeIds.map(
      (astNodeId) => `${pickle.uri}:${gherkinQuery.getLocation(astNodeId).line}`
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
    makeErrorMessage,
    makeHookStep
  )
  const testSteps: ITestStep[] = []
    .concat(beforeHookSteps)
    .concat(pickleTestSteps)
    .concat(afterHookSteps)

  return new TestCase(newId(), testSteps, pickle.id, clock)
}

function makeHookSteps(
  pickle: messages.IPickle,
  hooks: ReadonlyArray<IHook>,
  alwaysExecute: boolean,
  gherkinQuery: Query,
  newId: IdGenerator.NewId,
  clock: IClock,
  makeErrorMessage: MakeErrorMessage,
  makeHookStep: MakeHookTestStep
): ITestStep[] {
  return hooks
    .map((hook) =>
      makeHookStep(
        pickle,
        hook,
        alwaysExecute,
        gherkinQuery,
        newId,
        clock,
        makeErrorMessage
      )
    )
    .filter((testStep) => testStep !== undefined)
}
