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
    listener: EnvelopeListener
  ): Promise<messages.TestStepResult> {
    this.emitTestStepStarted(testCaseStartedId, listener)

    const start = this.stopwatch.stopwatchNow()

    if (this.supportCodeExecutors.length === 0) {
      const duration = millisecondsToDuration(this.clock.clockNow() - start)

      return this.emitTestStepFinished(
        testCaseStartedId,
        {
          duration: duration,
          status: 'UNDEFINED',
        },
        listener
      )
    }

    if (this.supportCodeExecutors.length > 1) {
      const duration = millisecondsToDuration(this.clock.clockNow() - start)

      return this.emitTestStepFinished(
        testCaseStartedId,
        {
          duration: duration,
          status: 'AMBIGUOUS',
        },
        listener
      )
    }

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
          status: result === 'pending' ? 'PENDING' : 'PASSED',
        },
        listener
      )
    } catch (error) {
      const finish = this.clock.clockNow()

      const message = this.makeErrorMessage(error, this.sourceFrames)
      const duration = millisecondsToDuration(finish - start)
      return this.emitTestStepFinished(
        testCaseStartedId,
        {
          duration,
          status: 'FAILED',
          message,
        },
        listener
      )
    }
  }

  public skip(listener: EnvelopeListener, testCaseStartedId: string): messages.TestStepResult {
    this.emitTestStepStarted(testCaseStartedId, listener)
    return this.emitTestStepFinished(
      testCaseStartedId,
      {
        duration: millisecondsToDuration(0),
        status: 'SKIPPED',
      },
      listener
    )
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
        test_step_result: testStepResult,
        timestamp: millisecondsSinceEpochToTimestamp(this.clock.clockNow()),
      },
    })
    return testStepResult
  }
}
