import { messages, TimeConversion } from '@cucumber/messages'
import ISupportCodeExecutor from './ISupportCodeExecutor'
import { EnvelopeListener } from './types'
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
    protected readonly supportCodeExecutors: ReadonlyArray<
      ISupportCodeExecutor
    >,
    private readonly sourceFrames: ReadonlyArray<string>,
    private readonly clock: IClock,
    private readonly makeErrorMessage: MakeErrorMessage
  ) {}

  public abstract toMessage(): messages.TestCase.ITestStep

  public async execute(
    world: IWorld,
    testCaseStartedId: string,
    listener: EnvelopeListener
  ): Promise<messages.TestStepFinished.ITestStepResult> {
    this.emitTestStepStarted(testCaseStartedId, listener)

    const start = this.clock.now()

    if (this.supportCodeExecutors.length === 0) {
      const duration = millisecondsToDuration(this.clock.now() - start)

      return this.emitTestStepFinished(
        testCaseStartedId,
        new messages.TestStepFinished.TestStepResult({
          duration: duration,
          status: messages.TestStepFinished.TestStepResult.Status.UNDEFINED,
        }),
        listener
      )
    }

    if (this.supportCodeExecutors.length > 1) {
      const duration = millisecondsToDuration(this.clock.now() - start)

      return this.emitTestStepFinished(
        testCaseStartedId,
        new messages.TestStepFinished.TestStepResult({
          duration: duration,
          status: messages.TestStepFinished.TestStepResult.Status.AMBIGUOUS,
        }),
        listener
      )
    }

    try {
      world.attach = makeAttach(this.id, testCaseStartedId, listener)
      world.log = (text: string) => {
        world.attach(text, 'text/x.cucumber.log+plain')
      }

      const result = await this.supportCodeExecutors[0].execute(world)
      const finish = this.clock.now()
      const duration = millisecondsToDuration(finish - start)
      return this.emitTestStepFinished(
        testCaseStartedId,
        new messages.TestStepFinished.TestStepResult({
          duration,
          status:
            result === 'pending'
              ? messages.TestStepFinished.TestStepResult.Status.PENDING
              : messages.TestStepFinished.TestStepResult.Status.PASSED,
        }),
        listener
      )
    } catch (error) {
      const finish = this.clock.now()

      const message = this.makeErrorMessage(error, this.sourceFrames)
      const duration = millisecondsToDuration(finish - start)
      return this.emitTestStepFinished(
        testCaseStartedId,
        new messages.TestStepFinished.TestStepResult({
          duration,
          status: messages.TestStepFinished.TestStepResult.Status.FAILED,
          message,
        }),
        listener
      )
    }
  }

  public skip(
    listener: EnvelopeListener,
    testCaseStartedId: string
  ): messages.TestStepFinished.ITestStepResult {
    this.emitTestStepStarted(testCaseStartedId, listener)
    return this.emitTestStepFinished(
      testCaseStartedId,
      new messages.TestStepFinished.TestStepResult({
        duration: millisecondsToDuration(0),
        status: messages.TestStepFinished.TestStepResult.Status.SKIPPED,
      }),
      listener
    )
  }

  protected emitTestStepStarted(
    testCaseStartedId: string,
    listener: EnvelopeListener
  ) {
    listener(
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
    testStepResult: messages.TestStepFinished.ITestStepResult,
    listener: EnvelopeListener
  ): messages.TestStepFinished.ITestStepResult {
    listener(
      new messages.Envelope({
        testStepFinished: new messages.TestStepFinished({
          testCaseStartedId,
          testStepId: this.id,
          testStepResult,
          timestamp: millisecondsSinceEpochToTimestamp(this.clock.now()),
        }),
      })
    )
    return testStepResult
  }
}
