import { performance } from 'perf_hooks'
import IClock from './IClock'

export default class PerfHooksClock implements IClock {
  public now(): number {
    return performance.now()
  }
}
