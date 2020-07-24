import { messages, TimeConversion } from '@cucumber/messages'

export default function getDurationsMillis(
  testRunStarted: messages.ITestRunStarted,
  testRunFinished: messages.ITestRunFinished,
  precision = 2
): number {
  if (testRunStarted === undefined || testRunFinished === undefined) {
    return
  }

  const millis =
    TimeConversion.timestampToMillisecondsSinceEpoch(
      testRunFinished.timestamp
    ) -
    TimeConversion.timestampToMillisecondsSinceEpoch(testRunStarted.timestamp)

  const precised = millis.toFixed(precision).split('.')
  if (precision === 0 || precised[1].match(/^0*$/)) {
    return parseInt(precised[0])
  }

  return parseFloat(precised.join('.'))
}
