import IClock from './IClock'

export default class IncrementClock implements IClock {
  private time = 0

  public now(): number {
    return this.time++
  }
}
