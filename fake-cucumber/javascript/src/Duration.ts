import { messages } from 'cucumber-messages'

export default class Duration {
  constructor(private readonly nanos: number) {}

  public toMessage(): messages.IDuration {
    const factor = 1000000000
    const seconds = Math.floor(this.nanos / factor)
    const nanos = this.nanos % 1000000000

    return new messages.Duration({ seconds, nanos })
  }
}
