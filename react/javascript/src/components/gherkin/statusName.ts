import { messages } from '@cucumber/messages'

export default (
  status: messages.TestStepFinished.TestStepResult.Status
): string => {
  return {
    // Keep the same order as in messages.proto - for readability's sake
    [messages.TestStepFinished.TestStepResult.Status.PASSED]: 'passed',
    [messages.TestStepFinished.TestStepResult.Status.SKIPPED]: 'skipped',
    [messages.TestStepFinished.TestStepResult.Status.PENDING]: 'pending',
    [messages.TestStepFinished.TestStepResult.Status.UNDEFINED]: 'undefined',
    [messages.TestStepFinished.TestStepResult.Status.AMBIGUOUS]: 'ambiguous',
    [messages.TestStepFinished.TestStepResult.Status.FAILED]: 'failed',
    [messages.TestStepFinished.TestStepResult.Status.UNKNOWN]: 'unknown',
  }[status]
}
