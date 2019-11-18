import Color from 'color'
import { messages } from 'cucumber-messages'
import Status = messages.TestResult.Status

const statusColor = (status: Status): Color => {
  return {
    // Keep the same order as in messages.proto - for readability's sake
    [Status.PASSED]: Color('lime').lighten(0.9),
    [Status.SKIPPED]: Color('cyan').lighten(0.9),
    [Status.PENDING]: Color('yellow').lighten(0.9),
    [Status.UNDEFINED]: Color('orange').lighten(0.9),
    [Status.AMBIGUOUS]: Color('rebeccapurple').lighten(0.9),
    [Status.FAILED]: Color('red').lighten(0.9),
    [Status.UNKNOWN]: Color('gray').lighten(0.9),
  }[status]
}

export default statusColor
