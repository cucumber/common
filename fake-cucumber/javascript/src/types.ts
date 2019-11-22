import { messages } from 'cucumber-messages'

export type MessageNotifier = (message: messages.IEnvelope) => void
