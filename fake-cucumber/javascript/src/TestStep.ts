import { messages } from 'cucumber-messages'
import uuidv4 from 'uuid/v4'
import SupportCodeExecutor from './SupportCodeExecutor'
import { MessageNotifier } from './types'
import ITestStep from './ITestStep'

export default abstract class TestStep implements ITestStep {
  public readonly id: string = uuidv4()

  constructor(
    public readonly sourceId: string,
    protected readonly supportCodeExecutors: SupportCodeExecutor[]
  ) {}

  public abstract toMessage(): messages.TestCase.ITestStep

  public execute(
    notifier: MessageNotifier,
    testCaseStartedId: string
  ): messages.TestResult.Status {
    this.emitTestStepStarted(testCaseStartedId, notifier)

    if (this.supportCodeExecutors.length === 0) {
      return this.emitTestStepFinished(
        testCaseStartedId,
        messages.TestResult.Status.UNDEFINED,
        notifier
      )
    }

    if (this.supportCodeExecutors.length > 1) {
      return this.emitTestStepFinished(
        testCaseStartedId,
        messages.TestResult.Status.AMBIGUOUS,
        notifier
      )
    }

    try {
      const result = this.supportCodeExecutors[0].execute()
      return this.emitTestStepFinished(
        testCaseStartedId,
        result === 'pending'
          ? messages.TestResult.Status.PENDING
          : messages.TestResult.Status.PASSED,
        notifier
      )
    } catch (error) {
      return this.emitTestStepFinished(
        testCaseStartedId,
        messages.TestResult.Status.FAILED,
        notifier
      )
    }
  }

  public skip(
    notifier: MessageNotifier,
    testCaseStartedId: string
  ): messages.TestResult.Status {
    return this.emitTestStepFinished(
      testCaseStartedId,
      messages.TestResult.Status.SKIPPED,
      notifier
    )
  }

  protected emitTestStepStarted(
    testCaseStartedId: string,
    notifier: MessageNotifier
  ) {
    notifier(
      new messages.Envelope({
        testStepStarted: new messages.TestStepStarted({
          testCaseStartedId,
          testStepId: this.id,
        }),
      })
    )
  }

  protected emitTestStepFinished(
    testCaseStartedId: string,
    status: messages.TestResult.Status,
    notifier: MessageNotifier
  ): messages.TestResult.Status {
    notifier(
      new messages.Envelope({
        testStepFinished: new messages.TestStepFinished({
          testCaseStartedId,
          testStepId: this.id,
          testResult: new messages.TestResult({
            status,
            duration: new messages.Duration({
              seconds: 123,
              nanos: 456,
            }),
          }),
        }),
      })
    )
    return status
  }
}
