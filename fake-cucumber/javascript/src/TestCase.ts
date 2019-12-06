import ITestStep from './ITestStep'
import { MessageNotifier } from './types'
import { messages, TimeConversion } from 'cucumber-messages'
import uuidv4 from 'uuid/v4'
import { performance } from 'perf_hooks'
import IWorld from './IWorld'

const { millisecondsToDuration } = TimeConversion

class DefaultWorld implements IWorld {
  public testStepId: string

  constructor(
    public readonly attach: (data: any, contentType: string) => void
  ) {}
}

export default class TestCase {
  public readonly id: string = uuidv4()

  constructor(
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

    function attach(data: string, contentType: string) {
      if (!this.testStepId) {
        throw new Error(`this.testStepId is not set`)
      }
      const encoding = messages.Media.Encoding.UTF8 // TODO: Use Base64 is the data is a Buffer (objects will be JSONified)
      notifier(
        new messages.Envelope({
          attachment: new messages.Attachment({
            data,
            testCaseStartedId,
            testStepId: this.testStepId,
            media: new messages.Media({
              contentType,
              encoding,
            }),
          }),
        })
      )
    }

    const world = new DefaultWorld(attach)
    const testStepResults = this.testSteps.map(testStep => {
      if (executeNext) {
        const result = testStep.execute(world, notifier, testCaseStartedId)
        executeNext = result.status === messages.TestResult.Status.PASSED
        return result
      } else {
        return testStep.skip(notifier, testCaseStartedId)
      }
    })
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
