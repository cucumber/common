import { MessageNotifier } from '../types'
import { messages } from 'cucumber-messages'

export default interface ITestCase {
  id: string

  toMessage(): messages.IEnvelope
  execute(notifier: MessageNotifier, attempt: number): void
}
