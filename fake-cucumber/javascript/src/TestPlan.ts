import TestCase from './TestCase'
import { MessageNotifier } from './types'
import { IdGenerator, messages, TimeConversion } from '@cucumber/messages'
import makeTestCase from './makeTestCase'
import IStepDefinition from './IStepDefinition'
import IHook from './IHook'
import { Query } from '@cucumber/gherkin'
import IClock from './IClock'
import { MakeErrorMessage } from './ErrorMessageGenerator'

export default class TestPlan {
  private readonly testCases: TestCase[]

  constructor(
    pickles: messages.IPickle[],
    stepDefinitions: IStepDefinition[],
    beforeHooks: IHook[],
    afterHooks: IHook[],
    gherkinQuery: Query,
    private readonly newId: IdGenerator.NewId,
    private readonly clock: IClock,
    private readonly makeErrorMessage: MakeErrorMessage
  ) {
    this.testCases = pickles.map(pickle =>
      makeTestCase(
        pickle,
        stepDefinitions,
        beforeHooks,
        afterHooks,
        gherkinQuery,
        newId,
        clock,
        makeErrorMessage
      )
    )
  }

  public async execute(notifier: MessageNotifier): Promise<void> {
    notifier(
      new messages.Envelope({
        testRunStarted: new messages.TestRunStarted({
          timestamp: TimeConversion.millisecondsSinceEpochToTimestamp(
            this.clock.now()
          ),
        }),
      })
    )
    for (const testCase of this.testCases) {
      notifier(testCase.toMessage())
    }
    for (const testCase of this.testCases) {
      await testCase.execute(notifier, 0, this.newId())
    }
    notifier(
      new messages.Envelope({
        testRunFinished: new messages.TestRunFinished({
          timestamp: TimeConversion.millisecondsSinceEpochToTimestamp(
            this.clock.now()
          ),
        }),
      })
    )
  }
}
