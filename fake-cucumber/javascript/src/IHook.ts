import SupportCodeExecutor from './SupportCodeExecutor'
import { messages } from 'cucumber-messages'

export enum HookType {
  Before,
  After,
}

export interface IHook {
  id: string

  match(pickle: messages.IPickle, type: HookType): SupportCodeExecutor | null
  toMessage(): messages.IEnvelope
}
