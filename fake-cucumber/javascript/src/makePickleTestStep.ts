import { messages } from 'cucumber-messages'
import IStepDefinition from './IStepDefinition'
import PickleTestStep from './PickleTestStep'
import ITestStep from './ITestStep'

export default function makePickleTestStep(
  pickleStep: messages.Pickle.IPickleStep,
  stepDefinitions: IStepDefinition[]
): ITestStep {
  const supportCodeExecutors = stepDefinitions
    .map(stepDefinition => stepDefinition.match(pickleStep))
    .filter(supportCodeExecutor => supportCodeExecutor !== null)
  return new PickleTestStep(pickleStep.id, supportCodeExecutors)
}
