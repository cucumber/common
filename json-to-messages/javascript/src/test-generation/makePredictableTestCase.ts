import { messages, IdGenerator } from '@cucumber/messages'
import { Query as GherkinQuery } from '@cucumber/gherkin'
import {
  makeTestCase,
  MakeErrorMessage,
  IHook,
  IClock,
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
    makeErrorMessage,
    makePredictablePickleTestStep,
    makePredictableHookTestStep
  )
}
