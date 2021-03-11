import * as messages from '@cucumber/messages'

export default function createLocation(props: {
  line?: number
  column?: number
}): messages.Location {
  const location: messages.Location = { ...props }
  if (location.line === 0) {
    location.line = undefined
  }
  if (location.column === 0) {
    location.column = undefined
  }

  return location
}
