import { messages } from 'cucumber-messages'
import { Readable } from 'stream'

export type MessageNotifier = (message: messages.IEnvelope) => void
export type AnyBody = (...args: any) => any
export type Attach = (
  data: string | Buffer | Readable,
  mediaType: string
) => void | Promise<void>
