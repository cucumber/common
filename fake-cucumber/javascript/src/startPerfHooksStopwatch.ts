import { performance } from 'perf_hooks'
import { StartStopwatch } from './types'

const startPerfHooksStopwatch: StartStopwatch = () => {
  const start = performance.now()
  let stopped = false
  return () => {
    if (stopped) throw new Error('Already stopped')
    stopped = true
    return performance.now() - start
  }
}

export default startPerfHooksStopwatch
