import IClock from './IClock.js'

export default class IncrementClock implements IClock {
  private time = 0

  public clockNow(): number {
    return this.time++
  }
}
