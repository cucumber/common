import * as messages from '@cucumber/messages'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'

import { ITestStep } from '@cucumber/fake-cucumber'
import { PredictableHookTestStep } from '../PredictableTestSteps'
import PredictableHook from '../PredictableHook'

export default function makePredictableHookTestStep(
  pickle: messages.Pickle,
  hook: PredictableHook,
  alwaysExecute: boolean,
  _: GherkinQuery,
  newId: messages.IdGenerator.NewId
): ITestStep | undefined {
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
