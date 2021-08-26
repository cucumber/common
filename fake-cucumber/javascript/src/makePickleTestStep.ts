import * as messages from '@cucumber/messages'
import PickleTestStep from './PickleTestStep.js'
import IClock from './IClock.js'
import { MakeErrorMessage } from './ErrorMessageGenerator.js'
import IStopwatch from '../src/IStopwatch.js'
import { IStepDefinition, ITestStep } from './types.js'

export default function makePickleTestStep(
  testStepId: string,
  pickleStep: messages.PickleStep,
  stepDefinitions: readonly IStepDefinition[],
  sourceFrames: readonly string[],
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
