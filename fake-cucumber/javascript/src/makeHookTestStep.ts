import { messages, IdGenerator } from '@cucumber/messages'
import IHook from './IHook'
import { Query } from '@cucumber/gherkin'
import IClock from './IClock'
import ITestStep from './ITestStep'
import HookTestStep from './HookTestStep'
import { MakeErrorMessage } from './ErrorMessageGenerator'
import { StartStopwatch } from './types'

export default function makeHookTestStep(
  pickle: messages.IPickle,
  hook: IHook,
  alwaysExecute: boolean,
  gherkinQuery: Query,
  newId: IdGenerator.NewId,
  clock: IClock,
  startStopwatch: StartStopwatch,
  makeErrorMessage: MakeErrorMessage
): ITestStep {
  const supportCodeExecutor = hook.match(pickle)
  if (supportCodeExecutor !== null) {
    const id = newId()

    const sourceFrames = pickle.astNodeIds.map(
      (astNodeId) => `${pickle.uri}:${gherkinQuery.getLocation(astNodeId).line}`
    )
    return new HookTestStep(
      id,
      hook.id,
      alwaysExecute,
      [supportCodeExecutor],
      sourceFrames,
      clock,
      startStopwatch,
      makeErrorMessage
    )
  }
}
