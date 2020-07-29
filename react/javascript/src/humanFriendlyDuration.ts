interface IHumanFriendlyDuration {
  millis?: number
  seconds?: number
  minutes?: number
  hours?: number
  days?: number
}

function preciseNumber(value: number, precision: number): number {
  if (precision > 0) {
    return parseFloat(value.toFixed(precision))
  }

  return parseInt(value.toFixed(precision))
}

function splitFields(
  duration: IHumanFriendlyDuration,
  readField: string,
  nextField: string,
  ratio: number,
  precision = 0
) {
  const value: number = duration[readField as keyof IHumanFriendlyDuration]

  if (value >= ratio) {
    duration[nextField as keyof IHumanFriendlyDuration] = Math.trunc(
      value / ratio
    )
    duration[readField as keyof IHumanFriendlyDuration] = preciseNumber(
      value % ratio,
      precision
    )
  }

  return duration
}

function hoursToDays(duration: IHumanFriendlyDuration): IHumanFriendlyDuration {
  return splitFields(duration, 'hours', 'days', 24)
}

function minutesToHours(
  duration: IHumanFriendlyDuration
): IHumanFriendlyDuration {
  return splitFields(duration, 'minutes', 'hours', 60)
}

function secondsToMinutes(
  duration: IHumanFriendlyDuration
): IHumanFriendlyDuration {
  return splitFields(duration, 'seconds', 'minutes', 60, 3)
}

export default function humanFriendlyDuration(
  millis: number
): IHumanFriendlyDuration {
  if (millis < 1000) {
    return { millis: preciseNumber(millis, 2) }
  }

  return hoursToDays(
    minutesToHours(
      secondsToMinutes({
        seconds: preciseNumber(millis / 1000, 3),
      })
    )
  )
}
