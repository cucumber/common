import ITestStep from './ITestStep'
import { MessageNotifier } from './types'
import { messages, TimeConversion } from 'cucumber-messages'
import { performance } from 'perf_hooks'
import IWorld from './IWorld'

const { millisecondsToDuration } = TimeConversion

export default class TestCase {
  constructor(
    public readonly id: string,
    private readonly testSteps: ITestStep[],
    private readonly pickleId: string
  ) {}

  public toMessage(): messages.IEnvelope {
    return new messages.Envelope({
      testCase: new messages.TestCase({
        id: this.id,
        pickleId: this.pickleId,
        testSteps: this.testSteps.map(step => step.toMessage()),
      }),
    })
  }

  public async execute(
    notifier: MessageNotifier,
    attempt: number,
    testCaseStartedId: string
  ): Promise<void> {
    let executeNext = true

    notifier(
      new messages.Envelope({
        testCaseStarted: new messages.TestCaseStarted({
          attempt,
          testCaseId: this.id,
          id: testCaseStartedId,
        }),
      })
    )

    const world: IWorld = {
      attach: () => {
        throw new Error('Attach is not ready')
      },
    }
    const testStepResults: messages.ITestResult[] = []

    const start = performance.now()
    for (const testStep of this.testSteps) {
      let testStepResult: messages.ITestResult
      // TODO: Also ask testStep if it should always execute (true for After steps)
      if (executeNext || testStep.alwaysExecute) {
        testStepResult = await testStep.execute(
          world,
          notifier,
          testCaseStartedId
        )
        executeNext =
          testStepResult.status === messages.TestResult.Status.PASSED
      } else {
        testStepResult = testStep.skip(notifier, testCaseStartedId)
      }
      testStepResults.push(testStepResult)
    }
    const finish = performance.now()
    const duration = millisecondsToDuration(finish - start)

    notifier(
      new messages.Envelope({
        testCaseFinished: new messages.TestCaseFinished({
          testCaseStartedId,
          testResult: this.computeTestResult(testStepResults, duration),
        }),
      })
    )
  }

  // TODO: Stateless function. Extract to separate file.
  private computeTestResult(
    testStepResults: messages.ITestResult[],
    duration: messages.IDuration
  ): messages.ITestResult {
    let status = messages.TestResult.Status.UNKNOWN
    let message: string = null

    if (testStepResults.length > 0) {
      const sortedResults = testStepResults.sort(
        (r1, r2) => r2.status - r1.status
      )
      status = sortedResults[0].status
      message = sortedResults[0].message
    }

    return new messages.TestResult({
      status,
      message,
      duration,
    })
  }
}
