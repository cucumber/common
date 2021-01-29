import { messages } from '@cucumber/messages'

const statusNames: Map<messages.TestStepFinished.TestStepResult.Status, string> = new Map([
  [messages.TestStepFinished.TestStepResult.Status.PASSED,  'passed'],
  [messages.TestStepFinished.TestStepResult.Status.SKIPPED, 'skipped'],
  [messages.TestStepFinished.TestStepResult.Status.PENDING, 'pending'],
  [messages.TestStepFinished.TestStepResult.Status.UNDEFINED, 'undefined'],
  [messages.TestStepFinished.TestStepResult.Status.AMBIGUOUS, 'ambiguous'],
  [messages.TestStepFinished.TestStepResult.Status.FAILED, 'failed'],
  [messages.TestStepFinished.TestStepResult.Status.UNKNOWN, 'unknown'],
])

export const allStatuses = [...statusNames.keys()]

export default (
  status: messages.TestStepFinished.TestStepResult.Status
): string => {
  return statusNames.get(status)
}
