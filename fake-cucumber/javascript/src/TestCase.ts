import TestStep from './TestStep'
import { MessageNotifier } from './types'
import { messages } from 'cucumber-messages'
import uuidv4 from 'uuid/v4'
import { performance } from 'perf_hooks'
import durationBetween from './durationBetween'

export default class TestCase {
  public readonly id: string = uuidv4()

  constructor(
    private readonly testSteps: TestStep[],
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

  public execute(notifier: MessageNotifier, attempt: number) {
    let executeNext = true
    const testCaseStartedId = uuidv4()

    notifier(
      new messages.Envelope({
        testCaseStarted: new messages.TestCaseStarted({
          attempt,
          testCaseId: this.id,
          id: testCaseStartedId,
        }),
      })
    )

    const start = performance.now()
    const testStepResults = this.testSteps.map(testStep => {
      if (executeNext) {
        const result = testStep.execute(notifier, testCaseStartedId)
        executeNext = result.status === messages.TestResult.Status.PASSED
        return result
      } else {
        return testStep.skip(notifier, testCaseStartedId)
      }
    })
    const finish = performance.now()
    const duration = durationBetween(start, finish)

    notifier(
      new messages.Envelope({
        testCaseFinished: new messages.TestCaseFinished({
          testCaseStartedId,
          testResult: this.computeTestResult(testStepResults, duration),
        }),
      })
    )
  }

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
