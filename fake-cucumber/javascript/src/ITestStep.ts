import { messages } from 'cucumber-messages'
import { MessageNotifier } from './types'

export default interface ITestStep {
  sourceId: string
  id: string

  toMessage(): messages.TestCase.ITestStep

  execute(
    notifier: MessageNotifier,
    testCaseStartedId: string
  ): messages.TestResult.Status

  skip(
    notifier: MessageNotifier,
    testCaseStartedId: string
  ): messages.TestResult.Status
}
