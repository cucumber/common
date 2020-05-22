import { messages, IdGenerator } from '@cucumber/messages'
import { Query as GherkinQuery } from '@cucumber/gherkin'

import { ITestStep } from '@cucumber/fake-cucumber'
import { PredictableHookTestStep } from '../PredictableTestSteps'
import PredictableHook from '../PredictableHook'

export default function makePredictableHookTestStep(
  pickle: messages.IPickle,
  hook: PredictableHook,
  alwaysExecute: boolean,
  _: GherkinQuery,
  newId: IdGenerator.NewId
): ITestStep {
  if (hook.match(pickle)) {
    return new PredictableHookTestStep(
      newId(),
      hook.id,
      alwaysExecute,
      hook.status,
      hook.duration,
      hook.errorMessage
    )
  }
}
