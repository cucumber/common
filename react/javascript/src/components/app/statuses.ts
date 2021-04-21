import * as messages from '@cucumber/messages'

const statuses: readonly messages.TestStepResultStatus[] = [
  messages.TestStepResultStatus.AMBIGUOUS,
  messages.TestStepResultStatus.FAILED,
  messages.TestStepResultStatus.PASSED,
  messages.TestStepResultStatus.PENDING,
  messages.TestStepResultStatus.SKIPPED,
  messages.TestStepResultStatus.UNDEFINED,
  messages.TestStepResultStatus.UNKNOWN,
]
export default statuses
