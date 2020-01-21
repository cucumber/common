import { messages } from '@cucumber/messages'
import Status = messages.TestResult.Status

const statusName = (status: Status): string => {
  return {
    // Keep the same order as in messages.proto - for readability's sake
    [Status.PASSED]: 'passed',
    [Status.SKIPPED]: 'skipped',
    [Status.PENDING]: 'pending',
    [Status.UNDEFINED]: 'undefined',
    [Status.AMBIGUOUS]: 'ambiguous',
    [Status.FAILED]: 'failed',
    [Status.UNKNOWN]: 'unknown',
  }[status]
}

export default statusName
