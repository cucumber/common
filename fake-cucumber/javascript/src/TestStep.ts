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

  public execute(notifier: MessageNotifier): messages.TestResult.Status {
    if (this.supportCodeExecutors.length === 0) {
      return this.notifyAndReturn(
        messages.TestResult.Status.UNDEFINED,
        notifier
      )
    }

    if (this.supportCodeExecutors.length > 1) {
      return this.notifyAndReturn(
        messages.TestResult.Status.AMBIGUOUS,
        notifier
      )
    }

    try {
      const result = this.supportCodeExecutors[0].execute()
      return this.notifyAndReturn(
        result === 'pending'
          ? messages.TestResult.Status.PENDING
          : messages.TestResult.Status.PASSED,
        notifier
      )
    } catch (error) {
      return this.notifyAndReturn(messages.TestResult.Status.FAILED, notifier)
    }
  }

  public skip(notifier: MessageNotifier): messages.TestResult.Status {
    return this.notifyAndReturn(messages.TestResult.Status.SKIPPED, notifier)
  }

  protected notifyAndReturn(
    status: messages.TestResult.Status,
    notifier: MessageNotifier
  ): messages.TestResult.Status {
    notifier(
      new messages.Envelope({
        testStepFinished: new messages.TestStepFinished({
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
