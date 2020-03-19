import { messages, TimeConversion } from '@cucumber/messages'
import SupportCodeExecutor from './SupportCodeExecutor'
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
    protected readonly supportCodeExecutors: SupportCodeExecutor[],
    private readonly sourceFrames: string[],
    private readonly clock: IClock,
    private readonly makeErrorMessage: MakeErrorMessage
  ) {}

  public abstract toMessage(): messages.TestCase.ITestStep

  public async execute(
    world: IWorld,
    testCaseStartedId: string,
    listener: EnvelopeListener
  ): Promise<messages.ITestStepResult> {
    this.emitTestStepStarted(testCaseStartedId, listener)

    const start = this.clock.now()

    if (this.supportCodeExecutors.length === 0) {
      const duration = millisecondsToDuration(this.clock.now() - start)

      return this.emitTestStepFinished(
        testCaseStartedId,
        new messages.TestStepResult({
          duration: duration,
          status: messages.TestStepResult.Status.UNDEFINED,
        }),
        listener
      )
    }

    if (this.supportCodeExecutors.length > 1) {
      const duration = millisecondsToDuration(this.clock.now() - start)

      return this.emitTestStepFinished(
        testCaseStartedId,
        new messages.TestStepResult({
          duration: duration,
          status: messages.TestStepResult.Status.AMBIGUOUS,
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
        new messages.TestStepResult({
          duration,
          status:
            result === 'pending'
              ? messages.TestStepResult.Status.PENDING
              : messages.TestStepResult.Status.PASSED,
        }),
        listener
      )
    } catch (error) {
      const finish = this.clock.now()

      const message = this.makeErrorMessage(error, this.sourceFrames)
      const duration = millisecondsToDuration(finish - start)
      return this.emitTestStepFinished(
        testCaseStartedId,
        new messages.TestStepResult({
          duration,
          status: messages.TestStepResult.Status.FAILED,
          message,
        }),
        listener
      )
    }
  }

  public skip(
    listener: EnvelopeListener,
    testCaseStartedId: string
  ): messages.ITestStepResult {
    this.emitTestStepStarted(testCaseStartedId, listener)
    return this.emitTestStepFinished(
      testCaseStartedId,
      new messages.TestStepResult({
        duration: millisecondsToDuration(0),
        status: messages.TestStepResult.Status.SKIPPED,
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
    testStepResult: messages.ITestStepResult,
    listener: EnvelopeListener
  ): messages.ITestStepResult {
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
