import * as messages from '@cucumber/messages'

export default (status: messages.TestStepResultStatus): string => {
  return status.toLowerCase()
}
