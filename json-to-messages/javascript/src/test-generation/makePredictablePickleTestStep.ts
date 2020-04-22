import { messages } from '@cucumber/messages'
import { ITestStep } from '@cucumber/fake-cucumber'
import { PredictablePickleTestStep } from '../PredictableTestSteps'
import PredictableStepDefinition from '../PredictableStepDefinition'

export default function makePredictablePickleTestStep(
  testStepId: string,
  pickleStep: messages.Pickle.IPickleStep,
  stepDefinitions: ReadonlyArray<PredictableStepDefinition>
): ITestStep {
  const matching = stepDefinitions.filter((stepDefinition) =>
    stepDefinition.match(pickleStep)
  )

  if (matching.length > 0) {
    return new PredictablePickleTestStep(
      testStepId,
      pickleStep.id,
      false,
      matching[0].id,
      matching[0].status,
      matching[0].duration,
      matching[0].errorMessage
    )
  } else {
    return new PredictablePickleTestStep(
      testStepId,
      pickleStep.id,
      false,
      null,
      messages.TestStepFinished.TestStepResult.Status.UNDEFINED,
      0,
      null
    )
  }
}
