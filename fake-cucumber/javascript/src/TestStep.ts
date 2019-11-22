import { messages } from 'cucumber-messages'
import uuidv4 from 'uuid/v4'
import SupportCodeExecutor from './SupportCodeExecutor'
import TestResult from './TestResult'
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
  ): TestResult {
    this.emitTestStepStarted(testCaseStartedId, notifier)

    if (this.supportCodeExecutors.length === 0) {
      return this.emitTestStepFinished(
        testCaseStartedId,
        new TestResult(messages.TestResult.Status.UNDEFINED, undefined),
        notifier
      )
    }

    if (this.supportCodeExecutors.length > 1) {
      return this.emitTestStepFinished(
        testCaseStartedId,
        new TestResult(messages.TestResult.Status.AMBIGUOUS, undefined),
        notifier
      )
    }

    try {
      const result = this.supportCodeExecutors[0].execute()
      return this.emitTestStepFinished(
        testCaseStartedId,
        new TestResult(
          result === 'pending'
            ? messages.TestResult.Status.PENDING
            : messages.TestResult.Status.PASSED,
          undefined
        ),
        notifier
      )
    } catch (error) {
      return this.emitTestStepFinished(
        testCaseStartedId,
        new TestResult(
          messages.TestResult.Status.FAILED,
          [error.message, error.stack].join('\n')
        ),
        notifier
      )
    }
  }

  public skip(
    notifier: MessageNotifier,
    testCaseStartedId: string
  ): TestResult {
    return this.emitTestStepFinished(
      testCaseStartedId,
      new TestResult(messages.TestResult.Status.SKIPPED, undefined),
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
    result: TestResult,
    notifier: MessageNotifier
  ): TestResult {
    notifier(
      new messages.Envelope({
        testStepFinished: new messages.TestStepFinished({
          testCaseStartedId,
          testStepId: this.id,
          testResult: result.toMessage(),
        }),
      })
    )
    return result
  }
}
