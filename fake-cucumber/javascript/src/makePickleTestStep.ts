import { messages } from '@cucumber/messages'
import IStepDefinition from './IStepDefinition'
import PickleTestStep from './PickleTestStep'
import ITestStep from './ITestStep'
import IClock from './IClock'
import { MakeErrorMessage } from './ErrorMessageGenerator'
import IStopwatch from '../src/IStopwatch'

export default function makePickleTestStep(
  testStepId: string,
  pickleStep: messages.Pickle.IPickleStep,
  stepDefinitions: ReadonlyArray<IStepDefinition>,
  sourceFrames: ReadonlyArray<string>,
  clock: IClock,
  stopwatch: IStopwatch,
  makeErrorMessage: MakeErrorMessage
): ITestStep {
  const supportCodeExecutors = stepDefinitions
    .map((stepDefinition) => stepDefinition.match(pickleStep))
    .filter((supportCodeExecutor) => supportCodeExecutor !== null)
  return new PickleTestStep(
    testStepId,
    pickleStep.id,
    false,
    supportCodeExecutors,
    sourceFrames,
    clock,
    stopwatch,
    makeErrorMessage
  )
}
