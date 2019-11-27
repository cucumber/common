import { performance } from 'perf_hooks'
import { messages } from 'cucumber-messages'
import uuidv4 from 'uuid/v4'
import SupportCodeExecutor from './SupportCodeExecutor'
import { MessageNotifier } from './types'
import ITestStep from './ITestStep'
import durationBetween from './durationBetween'

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
  ): messages.ITestResult {
    this.emitTestStepStarted(testCaseStartedId, notifier)

    if (this.supportCodeExecutors.length === 0) {
      return this.emitTestStepFinished(
        testCaseStartedId,
        new messages.TestResult({
          status: messages.TestResult.Status.UNDEFINED,
        }),
        notifier
      )
    }

    if (this.supportCodeExecutors.length > 1) {
      return this.emitTestStepFinished(
        testCaseStartedId,
        new messages.TestResult({
          status: messages.TestResult.Status.AMBIGUOUS,
        }),
        notifier
      )
    }

    const start = performance.now()
    try {
      const result = this.supportCodeExecutors[0].execute()
      const finish = performance.now()
      const duration = durationBetween(start, finish)
      return this.emitTestStepFinished(
        testCaseStartedId,
        new messages.TestResult({
          duration,
          status:
            result === 'pending'
              ? messages.TestResult.Status.PENDING
              : messages.TestResult.Status.PASSED,
        }),
        notifier
      )
    } catch (error) {
      const finish = performance.now()
      const duration = durationBetween(start, finish)
      return this.emitTestStepFinished(
        testCaseStartedId,
        new messages.TestResult({
          duration,
          status: messages.TestResult.Status.FAILED,
          message: error.stack,
        }),
        notifier
      )
    }
  }

  public skip(
    notifier: MessageNotifier,
    testCaseStartedId: string
  ): messages.ITestResult {
    return this.emitTestStepFinished(
      testCaseStartedId,
      new messages.TestResult({
        duration: durationBetween(0, 0),
        status: messages.TestResult.Status.SKIPPED,
      }),
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
    testResult: messages.ITestResult,
    notifier: MessageNotifier
  ): messages.ITestResult {
    notifier(
      new messages.Envelope({
        testStepFinished: new messages.TestStepFinished({
          testCaseStartedId,
          testStepId: this.id,
          testResult,
        }),
      })
    )
    return testResult
  }
}
