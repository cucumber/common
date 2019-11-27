import { messages } from 'cucumber-messages'

const MILLISECONDS_PER_SECOND = 1000
const NANOSECONDS_PER_MILLISECOND = 1000000

export default function durationBetween(
  startMilliseconds: number,
  finishMilliseconds: number
): messages.IDuration {
  const milliseconds = finishMilliseconds - startMilliseconds
  const seconds = Math.floor(milliseconds / MILLISECONDS_PER_SECOND)
  const nanos = Math.floor(
    Math.floor(milliseconds % MILLISECONDS_PER_SECOND) *
      NANOSECONDS_PER_MILLISECOND
  )
  return new messages.Duration({
    seconds,
    nanos,
  })
}
