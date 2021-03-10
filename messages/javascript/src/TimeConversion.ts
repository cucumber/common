import * as messages from './messages'

const MILLISECONDS_PER_SECOND = 1e3
const NANOSECONDS_PER_MILLISECOND = 1e6
const NANOSECONDS_PER_SECOND = 1e9

export function millisecondsSinceEpochToTimestamp(
  millisecondsSinceEpoch: number
): messages.Timestamp {
  return toSecondsAndNanos(millisecondsSinceEpoch)
}

export function millisecondsToDuration(
  durationInMilliseconds: number
): messages.Duration {
  return toSecondsAndNanos(durationInMilliseconds)
}

export function timestampToMillisecondsSinceEpoch(
  timestamp: messages.Timestamp
): number {
  const { seconds, nanos } = timestamp
  return toMillis(seconds, nanos)
}

export function durationToMilliseconds(duration: messages.Duration) {
  const { seconds, nanos } = duration
  return toMillis(seconds, nanos)
}

export function addDurations(
  durationA: messages.Duration,
  durationB: messages.Duration
): messages.Duration {
  let seconds = durationA.seconds + durationB.seconds
  let nanos = durationA.nanos + durationB.nanos
  if (nanos >= NANOSECONDS_PER_SECOND) {
    seconds += 1
    nanos -= NANOSECONDS_PER_SECOND
  }
  return { seconds, nanos }
}

function toSecondsAndNanos(milliseconds: number) {
  const seconds = Math.floor(milliseconds / MILLISECONDS_PER_SECOND)
  const nanos = Math.floor((milliseconds % MILLISECONDS_PER_SECOND) * NANOSECONDS_PER_MILLISECOND)
  return { seconds, nanos }
}

function toMillis(seconds: number, nanos: number): number {
  const secondMillis = seconds * MILLISECONDS_PER_SECOND
  const nanoMillis = nanos / NANOSECONDS_PER_MILLISECOND
  return secondMillis + nanoMillis
}
