import * as messages from '@cucumber/messages'
import { EnvelopeListener, ISupportCodeExecutor, ITestStep, IWorld } from './types'
import makeAttach from './makeAttach'
import IClock from './IClock'
import IStopwatch from './IStopwatch'
import { MakeErrorMessage } from './ErrorMessageGenerator'

const { millisecondsToDuration, millisecondsSinceEpochToTimestamp } = messages.TimeConversion

export default abstract class TestStep implements ITestStep {
  constructor(
    public readonly id: string,
    public readonly sourceId: string,
    public readonly alwaysExecute: boolean,
    protected readonly supportCodeExecutors: readonly ISupportCodeExecutor[],
    private readonly sourceFrames: readonly string[],
    private readonly clock: IClock,
    private readonly stopwatch: IStopwatch,
    private readonly makeErrorMessage: MakeErrorMessage
  ) {}

  public abstract toMessage(): messages.TestStep

  public async execute(
    world: IWorld,
    testCaseStartedId: string,
    listener: EnvelopeListener,
    previousPassed: boolean,
    retryable: boolean = false
  ): Promise<messages.TestStepResult> {
    this.emitTestStepStarted(testCaseStartedId, listener)

    if (this.supportCodeExecutors.length === 0) {
      return this.emitTestStepFinished(
        testCaseStartedId,
        {
          duration: millisecondsToDuration(0),
          status: messages.TestStepResultStatus.UNDEFINED,
          willBeRetried: false,
        },
        listener
      )
    }

    if (this.supportCodeExecutors.length > 1) {
      return this.emitTestStepFinished(
        testCaseStartedId,
        {
          duration: millisecondsToDuration(0),
          status: messages.TestStepResultStatus.AMBIGUOUS,
          willBeRetried: false,
        },
        listener
      )
    }

    if (!previousPassed && !this.alwaysExecute) {
      return this.emitTestStepFinished(
        testCaseStartedId,
        {
          duration: millisecondsToDuration(0),
          status: messages.TestStepResultStatus.SKIPPED,
          willBeRetried: false,
        },
        listener
      )
    }

    const start = this.stopwatch.stopwatchNow()
    try {
      world.attach = makeAttach(this.id, testCaseStartedId, listener)
      world.log = (text: string) => {
        world.attach(text, 'text/x.cucumber.log+plain')
      }

      const result = await this.supportCodeExecutors[0].execute(world)
      const finish = this.stopwatch.stopwatchNow()
      const duration = millisecondsToDuration(finish - start)
      return this.emitTestStepFinished(
        testCaseStartedId,
        {
          duration,
          status:
            result === 'pending'
              ? messages.TestStepResultStatus.PENDING
              : messages.TestStepResultStatus.PASSED,
          willBeRetried: false,
        },
        listener
      )
    } catch (error) {
      const finish = this.stopwatch.stopwatchNow()

      const message = this.makeErrorMessage(error, this.sourceFrames)
      const duration = millisecondsToDuration(finish - start)
      return this.emitTestStepFinished(
        testCaseStartedId,
        {
          duration,
          status: messages.TestStepResultStatus.FAILED,
          willBeRetried: retryable,
          message,
        },
        listener
      )
    }
  }

  protected emitTestStepStarted(testCaseStartedId: string, listener: EnvelopeListener) {
    listener({
      testStepStarted: {
        testCaseStartedId: testCaseStartedId,
        testStepId: this.id,
        timestamp: millisecondsSinceEpochToTimestamp(this.clock.clockNow()),
      },
    })
  }

  protected emitTestStepFinished(
    testCaseStartedId: string,
    testStepResult: messages.TestStepResult,
    listener: EnvelopeListener
  ): messages.TestStepResult {
    listener({
      testStepFinished: {
        testCaseStartedId: testCaseStartedId,
        testStepId: this.id,
        testStepResult: testStepResult,
        timestamp: millisecondsSinceEpochToTimestamp(this.clock.clockNow()),
      },
    })
    return testStepResult
  }
}
