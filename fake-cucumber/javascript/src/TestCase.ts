import ITestStep from './ITestStep'
import { MessageNotifier } from './types'
import { messages, TimeConversion } from '@cucumber/messages'
import IWorld from './IWorld'
import IClock from './IClock'

const { millisecondsSinceEpochToTimestamp } = TimeConversion

export default class TestCase {
  constructor(
    public readonly id: string,
    private readonly testSteps: ITestStep[],
    private readonly pickleId: string,
    private readonly clock: IClock
  ) {
    testSteps.forEach(testStep => {
      if (!testStep) {
        throw new Error('undefined step')
      }
    })
  }

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
    notifier(
      new messages.Envelope({
        testCaseStarted: new messages.TestCaseStarted({
          attempt,
          testCaseId: this.id,
          id: testCaseStartedId,
          timestamp: millisecondsSinceEpochToTimestamp(this.clock.now()),
        }),
      })
    )

    const world: IWorld = {
      attach: () => {
        throw new Error('Attach is not ready')
      },
      log: () => {
        throw new Error('Log is not ready')
      },
    }

    let executeNext = true
    for (const testStep of this.testSteps) {
      let testStepResult: messages.ITestStepResult
      // TODO: Also ask testStep if it should always execute (true for After steps)
      if (executeNext || testStep.alwaysExecute) {
        testStepResult = await testStep.execute(
          world,
          notifier,
          testCaseStartedId
        )
        executeNext =
          testStepResult.status === messages.TestStepResult.Status.PASSED
      } else {
        testStepResult = testStep.skip(notifier, testCaseStartedId)
      }
    }

    notifier(
      new messages.Envelope({
        testCaseFinished: new messages.TestCaseFinished({
          testCaseStartedId,
          timestamp: millisecondsSinceEpochToTimestamp(this.clock.now()),
        }),
      })
    )
  }
}
