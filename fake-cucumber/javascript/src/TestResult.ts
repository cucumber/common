import { messages } from 'cucumber-messages'

export default class TestResult {
  public constructor(
    public readonly status: messages.TestResult.Status,
    private readonly message: string
  ) {}

  public toMessage(): messages.ITestResult {
    return new messages.TestResult({
      status: this.status,
      message: this.message,
      duration: new messages.Duration({
        seconds: 123,
        nanos: 456,
      })
    })
  }
}