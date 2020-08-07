import { performance } from 'perf_hooks'
import IStopwatch from './IStopwatch'

export default class PerfHooksStopwatch implements IStopwatch {
  public stopwatchNow(): number {
    return performance.now()
  }
}
