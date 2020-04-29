import { messages } from '@cucumber/messages'
import { EnvelopeListener } from './types'

export default interface ITestCase {
  toMessage(): messages.IEnvelope
  execute(
    listener: EnvelopeListener,
    attempt: number,
    testCaseStartedId: string
  ): Promise<void>
}
