import { messages } from './index'
import Long from 'long'

const MILLISECONDS_PER_SECOND = 1e3
const NANOSECONDS_PER_MILLISECOND = 1e6
const NANOSECONDS_PER_SECOND = 1e9

export function millisecondsSinceEpochToTimestamp(
  millisecondsSinceEpoch: number
): messages.ITimestamp {
  return new messages.Timestamp(toSecondsAndNanos(millisecondsSinceEpoch))
}

export function millisecondsToDuration(
  durationInMilliseconds: number
): messages.IDuration {
  return new messages.Duration(toSecondsAndNanos(durationInMilliseconds))
}

export function timestampToMillisecondsSinceEpoch(
  timestamp: messages.ITimestamp
): number {
  const { nanos, seconds } = timestamp
  return toMillis(seconds, nanos)
}

export function durationToMilliseconds(duration: messages.IDuration) {
  const { nanos, seconds } = duration
  return toMillis(seconds, nanos)
}

export function addDurations(durationA: messages.IDuration, durationB: messages.IDuration) {
  let seconds = new Long(0).add(durationA.seconds).add(durationB.seconds);
  let nanos = durationA.nanos + durationB.nanos;
  if (nanos >= NANOSECONDS_PER_SECOND) {
    seconds = seconds.add(1);
    nanos -= NANOSECONDS_PER_SECOND
  }
  return new messages.Duration({ seconds, nanos })
}

function toSecondsAndNanos(milliseconds: number) {
  const seconds = Math.floor(milliseconds / MILLISECONDS_PER_SECOND)
  const nanos = Math.floor(
    (milliseconds % MILLISECONDS_PER_SECOND) * NANOSECONDS_PER_MILLISECOND
  )
  return { seconds, nanos }
}

function toMillis(seconds: number | Long, nanos: number) {
  let secondMillis: number
  if (typeof seconds === 'number') {
    secondMillis = (seconds as number) * MILLISECONDS_PER_SECOND
  } else {
    secondMillis = (seconds as Long)
      .multiply(MILLISECONDS_PER_SECOND)
      .toNumber()
  }
  const nanoMillis = nanos / NANOSECONDS_PER_MILLISECOND
  return secondMillis + nanoMillis
}
