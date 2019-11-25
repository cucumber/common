import { messages } from 'cucumber-messages'
import uuidv4 from 'uuid/v4'
import SupportCodeExecutor from './SupportCodeExecutor'
import { MessageNotifier } from './types'

export default class TestStep {
  public readonly id: string = uuidv4()

  constructor(
    private readonly pickleStepId: string,
    private readonly supportCodeExecutors: SupportCodeExecutor[]
  ) {}

  public toMessage(): messages.TestCase.ITestStep {
    return new messages.TestCase.TestStep({
      id: this.id,
      pickleStepId: this.pickleStepId,
      stepDefinitionId: this.supportCodeExecutors.map(
        supportCodeExecutor => supportCodeExecutor.stepDefinitionId
      ),
      stepMatchArguments:
        this.supportCodeExecutors.length !== 1
          ? null
          : this.supportCodeExecutors[0].argsToMessages(),
    })
  }

  public execute(
    notifier: MessageNotifier,
    testCaseStartedId: string
  ): messages.TestResult.Status {
    this.emitTestStepStarted(testCaseStartedId, notifier)

    if (this.supportCodeExecutors.length === 0) {
      return this.emitTestStepFinished(
        testCaseStartedId,
        messages.TestResult.Status.UNDEFINED,
        null,
        notifier
      )
    }

    if (this.supportCodeExecutors.length > 1) {
      return this.emitTestStepFinished(
        testCaseStartedId,
        messages.TestResult.Status.AMBIGUOUS,
        null,
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
        null,
        notifier
      )
    } catch (error) {
      return this.emitTestStepFinished(
        testCaseStartedId,
        messages.TestResult.Status.FAILED,
        error.message,
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
      null,
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
    message: string,
    notifier: MessageNotifier
  ): messages.TestResult.Status {
    notifier(
      new messages.Envelope({
        testStepFinished: new messages.TestStepFinished({
          testCaseStartedId,
          testStepId: this.id,
          testResult: new messages.TestResult({
            status,
            message,
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
