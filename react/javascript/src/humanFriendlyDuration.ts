interface IHumanFriendlyDuration {
  millis?: number
  seconds?: number
  minutes?: number
  hours?: number
  days?: number
}

function splitFields(
  duration: IHumanFriendlyDuration,
  readField: string,
  nextField: string,
  ratio: number
) {
  const value: number = duration[readField as keyof IHumanFriendlyDuration]

  if (value >= ratio) {
    duration[nextField as keyof IHumanFriendlyDuration] = Math.trunc(
      value / ratio
    )
    duration[readField as keyof IHumanFriendlyDuration] = value % ratio
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
  return splitFields(duration, 'seconds', 'minutes', 60)
}

function millisToSeconds(
  duration: IHumanFriendlyDuration
): IHumanFriendlyDuration {
  return splitFields(duration, 'millis', 'seconds', 1000)
}

export default function humanFriendlyDuration(
  millis: number
): IHumanFriendlyDuration {
  const duration = hoursToDays(
    minutesToHours(secondsToMinutes(millisToSeconds({ millis: millis })))
  )
  duration.millis = parseFloat(duration.millis.toFixed(2))
  return duration
}
