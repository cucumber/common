import { messages } from '@cucumber/messages'

export type MessageNotifier = (message: messages.IEnvelope) => void
export type AnyBody = (...args: any) => any
export type Attach = (data: any, mediaType: string) => void | Promise<void>
