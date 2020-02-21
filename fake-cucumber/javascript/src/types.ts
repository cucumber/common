import { Readable } from 'stream'
import { messages } from '@cucumber/messages'

export type MessageNotifier = (message: messages.IEnvelope) => void
export type AnyBody = (...args: any) => any
export type Attach = (
  data: string | Buffer | Readable,
  mediaType: string
) => void | Promise<void>
export type Log = (text: string) => void | Promise<void>
