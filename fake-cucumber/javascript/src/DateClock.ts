import IClock from './IClock'

export default class DateClock implements IClock {
  public clockNow(): number {
    return Date.now()
  }
}
