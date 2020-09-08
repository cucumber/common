import { StartStopwatch } from './types'

let time = 1000000

const startIncrementStopwatch: StartStopwatch = () => {
  return () => {
    return time++
  }
}

export default startIncrementStopwatch
