import { messages } from 'cucumber-messages'
import IStepDefinition from './IStepDefinition'
import PickleTestStep from './PickleTestStep'
import ITestStep from './ITestStep'
import IClock from './IClock'
import { MakeErrorMessage } from './ErrorMessageGenerator'

export default function makePickleTestStep(
  testStepId: string,
  pickleStep: messages.Pickle.IPickleStep,
  stepDefinitions: IStepDefinition[],
  sourceFrames: string[],
  clock: IClock,
  makeErrorMessage: MakeErrorMessage
): ITestStep {
  const supportCodeExecutors = stepDefinitions
    .map(stepDefinition => stepDefinition.match(pickleStep))
    .filter(supportCodeExecutor => supportCodeExecutor !== null)
  return new PickleTestStep(
    testStepId,
    pickleStep.id,
    false,
    supportCodeExecutors,
    sourceFrames,
    clock,
    makeErrorMessage
  )
}
