import SupportCodeExecutor from './SupportCodeExecutor'
import { messages } from 'cucumber-messages'

export default interface IHook {
  id: string

  match(pickle: messages.IPickle): SupportCodeExecutor | null

  toMessage(): messages.IEnvelope
}
