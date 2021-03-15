import * as messages from '@cucumber/messages'

export default function createLocation(props: {
  line: number
  column?: number
}): messages.Location {
  return { ...props }
}
