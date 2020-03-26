import ISupportCodeExecutor from './ISupportCodeExecutor'
import { Argument } from '@cucumber/cucumber-expressions'
import { messages } from '@cucumber/messages'

export default interface IStepDefinition {
  match(pickleStep: messages.Pickle.IPickleStep): ISupportCodeExecutor | null

  getArguments(text: string): ReadonlyArray<Argument<any>>

  toMessage(): messages.IEnvelope
}
