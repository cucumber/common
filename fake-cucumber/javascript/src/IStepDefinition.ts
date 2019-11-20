import SupportCodeExecutor from './SupportCodeExecutor'
import { Argument } from 'cucumber-expressions'
import { messages } from 'cucumber-messages'

export default interface IStepDefinition {
  match(pickleStep: messages.Pickle.IPickleStep): SupportCodeExecutor | null

  getArguments(text: string): Array<Argument<any>>

  toMessage(): messages.IEnvelope
}
