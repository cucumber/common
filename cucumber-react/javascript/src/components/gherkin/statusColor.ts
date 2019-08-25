import Color from 'color'
import { messages } from 'cucumber-messages'
import Status = messages.TestResult.Status

const statusColor = (status: Status): string => {
  return {
    // Keep the same order as in messages.proto - for readability's sake
    [Status.PASSED]: Color('lime')
      .lighten(0.9)
      .hex(),
    [Status.SKIPPED]: Color('cyan')
      .lighten(0.9)
      .hex(),
    [Status.PENDING]: Color('yellow')
      .lighten(0.9)
      .hex(),
    [Status.UNDEFINED]: Color('orange')
      .lighten(0.9)
      .hex(),
    [Status.AMBIGUOUS]: Color('rebeccapurple')
      .lighten(0.9)
      .hex(),
    [Status.FAILED]: Color('red')
      .lighten(0.9)
      .hex(),
    [Status.UNKNOWN]: Color('gray')
      .lighten(0.9)
      .hex(),
  }[status]
}

export default statusColor
