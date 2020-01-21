import Color from 'color'
import { messages } from '@cucumber/messages'
import Status = messages.TestResult.Status

const statusColor = (status: Status): Color => {
  return {
    // Keep the same order as in messages.proto - for readability's sake
    [Status.PASSED]: Color('#2CB14A'),
    [Status.SKIPPED]: Color('#00A0CC'),
    [Status.PENDING]: Color('#FFAD33'),
    [Status.UNDEFINED]: Color('#FFAD33'),
    [Status.AMBIGUOUS]: Color('#F4EBFD'),
    [Status.FAILED]: Color('#BB0000'),
    [Status.UNKNOWN]: Color('#B6BECB'),
  }[status]
}

export default statusColor
