import * as messages from '@cucumber/messages'
import { Query } from '@cucumber/gherkin-utils'
import IClock from './IClock.js'
import HookTestStep from './HookTestStep.js'
import { MakeErrorMessage } from './ErrorMessageGenerator.js'
import IStopwatch from './IStopwatch.js'
import { IHook, ITestStep } from './types.js'

export default function makeHookTestStep(
  pickle: messages.Pickle,
  hook: IHook,
  alwaysExecute: boolean,
  gherkinQuery: Query,
  newId: messages.IdGenerator.NewId,
  clock: IClock,
  stopwatch: IStopwatch,
  makeErrorMessage: MakeErrorMessage
): ITestStep {
  const supportCodeExecutor = hook.match(pickle)
  if (supportCodeExecutor !== null) {
    const id = newId()

    const sourceFrames = (pickle.astNodeIds || []).map(
      (astNodeId) => `${pickle.uri}:${gherkinQuery.getLocation(astNodeId).line}`
    )
    return new HookTestStep(
      id,
      hook.id,
      alwaysExecute,
      [supportCodeExecutor],
      sourceFrames,
      clock,
      stopwatch,
      makeErrorMessage
    )
  }
}
