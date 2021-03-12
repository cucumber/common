import * as messages from '@cucumber/messages'
import { Query } from '@cucumber/gherkin-utils'
import IClock from './IClock'
import HookTestStep from './HookTestStep'
import { MakeErrorMessage } from './ErrorMessageGenerator'
import IStopwatch from './IStopwatch'
import { IHook, ITestStep } from './types'

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

    const sourceFrames = pickle.ast_node_ids.map(
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
