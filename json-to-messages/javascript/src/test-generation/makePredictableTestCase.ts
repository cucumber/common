import * as messages from '@cucumber/messages'
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
  pickle: messages.Pickle,
  stepDefinitions: readonly IStepDefinition[],
  beforeHooks: readonly IHook[],
  afterHooks: readonly IHook[],
  gherkinQuery: GherkinQuery,
  newId: messages.IdGenerator.NewId,
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
