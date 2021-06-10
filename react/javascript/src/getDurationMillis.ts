import * as messages from '@cucumber/messages'

export default function getDurationsMillis(
  testRunStarted: messages.TestRunStarted,
  testRunFinished: messages.TestRunFinished
): number {
  if (testRunStarted === undefined || testRunFinished === undefined) {
    return
  }

  return (
    messages.TimeConversion.timestampToMillisecondsSinceEpoch(testRunFinished.timestamp) -
    messages.TimeConversion.timestampToMillisecondsSinceEpoch(testRunStarted.timestamp)
  )
}
