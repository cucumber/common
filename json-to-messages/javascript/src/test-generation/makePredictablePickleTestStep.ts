import { messages } from '@cucumber/messages'
import { ITestStep } from '@cucumber/fake-cucumber'
import { PredictablePickleTestStep } from '../PredictableTestSteps'
import PredictableStepDefinition from '../PredictableStepDefinition'

export default function makePredictablePickleTestStep(
  testStepId: string,
  pickleStep: messages.Pickle.IPickleStep,
  stepDefinitions: ReadonlyArray<PredictableStepDefinition>
): ITestStep {
  return new PredictablePickleTestStep(
    testStepId,
    pickleStep.id,
    false,
    stepDefinitions[0].id,
    stepDefinitions[0].status,
    stepDefinitions[0].duration,
    stepDefinitions[0].errorMessage
  )
}
