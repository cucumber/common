import * as messages from '@cucumber/messages'

export const allStatuses = [
  messages.TestStepResultStatus.PASSED,
  messages.TestStepResultStatus.SKIPPED,
  messages.TestStepResultStatus.PENDING,
  messages.TestStepResultStatus.UNDEFINED,
  messages.TestStepResultStatus.AMBIGUOUS,
  messages.TestStepResultStatus.FAILED,
  messages.TestStepResultStatus.UNKNOWN,
]

export default (status: messages.TestStepResultStatus): string => {
  return status.toLowerCase()
}
