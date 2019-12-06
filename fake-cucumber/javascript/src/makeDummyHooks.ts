import { messages } from 'cucumber-messages'
import { ICucumberSupportCode, SupportCodeExecutor } from './support-code'

export default function makeDummyStepDefinitions(supportCode: ICucumberSupportCode): messages.IEnvelope[] {
  return [
    supportCode.registerBeforeHook(
      '@before-passed',
      new SupportCodeExecutor(() => null)
    ),
    supportCode.registerBeforeHook(
      '@before-failed',
      new SupportCodeExecutor(() => {
        throw new Error('Something went wrong in before hook')
      })
    ),
    supportCode.registerAfterHook(
      '@after-passed',
      new SupportCodeExecutor(() => null)
    ),
    supportCode.registerAfterHook(
      '@after-failed',
      new SupportCodeExecutor(() => {
        throw new Error('Something went wrong in after hook')
      })
    ),
  ].map(hook => new messages.Envelope({ hook }))
}

