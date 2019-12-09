import { messages } from 'cucumber-messages'
import { MessageNotifier } from './types'
import IWorld from './IWorld'

export default interface ITestStep {
  sourceId: string
  id: string

  toMessage(): messages.TestCase.ITestStep

  execute(
    world: IWorld,
    notifier: MessageNotifier,
    testCaseStartedId: string
  ): Promise<messages.ITestResult>

  skip(
    notifier: MessageNotifier,
    testCaseStartedId: string
  ): messages.ITestResult
}
