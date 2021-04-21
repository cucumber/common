import * as messages from '@cucumber/messages'

const statuses: readonly messages.TestStepResultStatus[] = [
  'AMBIGUOUS',
  'FAILED',
  'PASSED',
  'PENDING',
  'SKIPPED',
  'UNDEFINED',
  'UNKNOWN',
]
export default statuses
