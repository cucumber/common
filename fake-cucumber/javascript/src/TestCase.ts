import TestStep from './TestStep'
import { MessageNotifier } from './types'
import { messages } from 'cucumber-messages'
import uuidv4 from 'uuid/v4'

export default class TestCase {
  public readonly id: string = uuidv4()

  constructor(
    private readonly testSteps: TestStep[],
    private readonly pickleId: string
  ) {}

  public execute(notifier: MessageNotifier) {
    let executeNext = true
    const attempt = 0
    const testCaseStartedId = uuidv4()

    notifier(
      new messages.Envelope({
        testCase: new messages.TestCase({
          pickleId: this.pickleId,
          id: this.id,
          testSteps: this.testSteps.map(step => step.toMessage()),
        }),
      })
    )

    notifier(
      new messages.Envelope({
        testCaseStarted: new messages.TestCaseStarted({
          attempt,
          testCaseId: this.id,
          id: testCaseStartedId,
        }),
      })
    )

    const testStepStatuses = this.testSteps.map(testStep => {
      if (executeNext) {
        const status = testStep.execute(notifier)
        executeNext = status === messages.TestResult.Status.PASSED
        return status
      } else {
        return testStep.skip(notifier)
      }
    })

    const testStatus =
      testStepStatuses.sort()[testStepStatuses.length - 1] ||
      messages.TestResult.Status.UNKNOWN

    notifier(
      new messages.Envelope({
        testCaseFinished: new messages.TestCaseFinished({
          testCaseStartedId,
          testResult: {
            status: testStatus,
            message:
              testStatus === messages.TestResult.Status.FAILED
                ? `Some error message\n\tfake_file:2\n\tfake_file:7\n`
                : null,
            duration: new messages.Duration({
              seconds: 987654,
              nanos: 321,
            }),
          },
        }),
      })
    )
  }
}
