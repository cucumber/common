import ISupportCodeExecutor from './ISupportCodeExecutor'
import { messages } from '@cucumber/messages'

export default interface IStepDefinition {
  match(pickleStep: messages.Pickle.IPickleStep): ISupportCodeExecutor | null

  toMessage(): messages.IEnvelope
}
