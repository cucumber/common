import { messages, TimeConversion } from '@cucumber/messages'

export default function getDurationsMillis(
  testRunStarted: messages.ITestRunStarted,
  testRunFinished: messages.ITestRunFinished
): number {
  if (testRunStarted === undefined || testRunFinished === undefined) {
    return
  }

  return (
    TimeConversion.timestampToMillisecondsSinceEpoch(
      testRunFinished.timestamp
    ) -
    TimeConversion.timestampToMillisecondsSinceEpoch(testRunStarted.timestamp)
  )
}
