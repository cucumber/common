import { performance } from 'perf_hooks'
import { messages, TimeConversion } from 'cucumber-messages'
import SupportCodeExecutor from './SupportCodeExecutor'
import { MessageNotifier } from './types'
import ITestStep from './ITestStep'
import IWorld from './IWorld'
import StackUtils from 'stack-utils'
import makeAttach from './makeAttach'

const { millisecondsToDuration } = TimeConversion

const stack = new StackUtils({
  cwd: process.cwd(),
  internals: StackUtils.nodeInternals(),
})

export default abstract class TestStep implements ITestStep {
  constructor(
    public readonly id: string,
    public readonly sourceId: string,
    public readonly alwaysExecute: boolean,
    protected readonly supportCodeExecutors: SupportCodeExecutor[],
    private readonly sourceFrames: string[]
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

    const start = performance.now()
    try {
      world.attach = makeAttach(this.id, testCaseStartedId, notifier)
      const result = await this.supportCodeExecutors[0].execute(world)
      const finish = performance.now()
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
      const finish = performance.now()

      const trace = stack
        .clean(error.stack)
        .trim()
        .split('\n')
        .concat(this.sourceFrames)
        .map(frame => `    at ${frame}`)
        .join('\n')

      const duration = millisecondsToDuration(finish - start)
      return this.emitTestStepFinished(
        testCaseStartedId,
        new messages.TestResult({
          duration,
          status: messages.TestResult.Status.FAILED,
          message: `${error.message}\n${trace}`,
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
