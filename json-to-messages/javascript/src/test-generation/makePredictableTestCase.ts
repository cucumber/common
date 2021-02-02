import { messages, IdGenerator } from '@cucumber/messages'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import {
  makeTestCase,
  MakeErrorMessage,
  IHook,
  IClock,
  IStopwatch,
  ITestCase,
  IStepDefinition,
} from '@cucumber/fake-cucumber'

import makePredictableHookTestStep from './makePredictableHookTestStep'
import makePredictablePickleTestStep from './makePredictablePickleTestStep'

export default function makePredictableTestCase(
  pickle: messages.IPickle,
  stepDefinitions: ReadonlyArray<IStepDefinition>,
  beforeHooks: ReadonlyArray<IHook>,
  afterHooks: ReadonlyArray<IHook>,
  gherkinQuery: GherkinQuery,
  newId: IdGenerator.NewId,
  clock: IClock,
  stopwatch: IStopwatch,
  makeErrorMessage: MakeErrorMessage
): ITestCase {
  return makeTestCase(
    pickle,
    stepDefinitions,
    beforeHooks,
    afterHooks,
    gherkinQuery,
    newId,
    clock,
    stopwatch,
    makeErrorMessage,
    makePredictablePickleTestStep,
    makePredictableHookTestStep
  )
}
