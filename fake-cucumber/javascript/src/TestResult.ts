import { messages } from 'cucumber-messages'
import Duration from './Duration'

export default class TestResult {
  public constructor(
    public readonly status: messages.TestResult.Status,
    public readonly durationNanos?: number,
    public readonly message?: string
  ) {}

  public toMessage(): messages.ITestResult {
    const duration = new Duration(this.durationNanos || 0)

    return new messages.TestResult({
      status: this.status,
      message: this.message,
      duration: duration.toMessage(),
    })
  }
}
