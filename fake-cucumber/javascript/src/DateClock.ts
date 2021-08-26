import IClock from './IClock.js'

export default class DateClock implements IClock {
  public clockNow(): number {
    return Date.now()
  }
}
