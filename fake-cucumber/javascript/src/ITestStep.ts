import { messages } from '@cucumber/messages'
import { MessageNotifier } from './types'
import IWorld from './IWorld'

export default interface ITestStep {
  alwaysExecute: boolean
  sourceId: string
  id: string

  toMessage(): messages.TestCase.ITestStep

  execute(
    world: IWorld,
    notifier: MessageNotifier,
    testCaseStartedId: string
  ): Promise<messages.ITestStepResult>

  skip(
    notifier: MessageNotifier,
    testCaseStartedId: string
  ): messages.ITestStepResult
}
