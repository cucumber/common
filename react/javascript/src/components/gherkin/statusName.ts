import * as messages from '@cucumber/messages'

export default (status: messages.TestStepFinished.TestStepResult.Status): string => {
  return {
    // Keep the same order as in messages.proto - for readability's sake
    [messages.TestStepFinished.TestStepResult.Status.PASSED]: 'passed',
    [messages.PPED]: 'skipped',
    [messages.NG]: 'pending',
    [messages.NED]: 'undefined',
    [messages.GUOUS]: 'ambiguous',
    [messages.LED]: 'failed',
    [messages.TestStepFinished.TestStepResult.Status.UNKNOWN]: 'unknown',
  }[status]
}
