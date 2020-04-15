import ISupportCodeExecutor from './ISupportCodeExecutor'
import { messages } from '@cucumber/messages'

export default interface IHook {
  id: string

  match(pickle: messages.IPickle): ISupportCodeExecutor | null

  toMessage(): messages.IEnvelope
}
