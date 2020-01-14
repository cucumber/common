import { messages, TimeConversion } from '@cucumber/messages'
import SupportCodeExecutor from './SupportCodeExecutor'
import { MessageNotifier } from './types'
import ITestStep from './ITestStep'
import IWorld from './IWorld'
import makeAttach from './makeAttach'
import IClock from './IClock'
import { MakeErrorMessage } from './ErrorMessageGenerator'

const {
  millisecondsToDuration,
  millisecondsSinceEpochToTimestamp,
} = TimeConversion

export default abstract class TestStep implements ITestStep {
  constructor(
    public readonly id: string,
    public readonly sourceId: string,
    public readonly alwaysExecute: boolean,
    protected readonly supportCodeExecutors: SupportCodeExecutor[],
    private readonly sourceFrames: string[],
    private readonly clock: IClock,
    private readonly makeErrorMessage: MakeErrorMessage
  ) {}

  public abstract toMessage(): messages.TestCase.ITestStep

  public async execute(
    world: IWorld,
    notifier: MessageNotifier,
    testCaseStartedId: string
  ): Promise<messages.ITestResult> {
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

    const start = this.clock.now()
    try {
      world.attach = makeAttach(this.id, testCaseStartedId, notifier)
      const result = await this.supportCodeExecutors[0].execute(world)
      const finish = this.clock.now()
      const duration = millisecondsToDuration(finish - start)
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
      const finish = this.clock.now()

      const message = this.makeErrorMessage(error, this.sourceFrames)
      const duration = millisecondsToDuration(finish - start)
      return this.emitTestStepFinished(
        testCaseStartedId,
        new messages.TestResult({
          duration,
          status: messages.TestResult.Status.FAILED,
          message,
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
        duration: millisecondsToDuration(0),
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
          timestamp: millisecondsSinceEpochToTimestamp(this.clock.now()),
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
          timestamp: millisecondsSinceEpochToTimestamp(this.clock.now()),
        }),
      })
    )
    return testResult
  }
}
