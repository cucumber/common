import { messages } from 'cucumber-messages'

export default class Duration {
  constructor(
    private readonly seconds: number,
    private readonly nanos: number
  ) {}

  public toMessage(): messages.IDuration {
    return new messages.Duration({
      seconds: this.seconds,
      nanos: this.nanos,
    })
  }
}
