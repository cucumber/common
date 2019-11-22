import { messages } from 'cucumber-messages'
import IStepDefinition from './IStepDefinition'
import TestStep from './TestStep'

export default function makePickleTestStep(
  pickleStep: messages.Pickle.IPickleStep,
  stepDefinitions: IStepDefinition[]
): TestStep {
  const supportCodeExecutors = stepDefinitions
    .map(stepDefinition => stepDefinition.match(pickleStep))
    .filter(supportCodeExecutor => supportCodeExecutor !== null)
  return new TestStep(pickleStep.id, supportCodeExecutors)
}
