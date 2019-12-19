import TestCase from './TestCase'
import { MessageNotifier } from './types'
import { IdGenerator, messages } from 'cucumber-messages'
import makeTestCase from './makeTestCase'
import IStepDefinition from './IStepDefinition'
import IHook from './IHook'
import { GherkinQuery } from 'gherkin'

export default class TestPlan {
  private readonly testCases: TestCase[]

  constructor(
    pickles: messages.IPickle[],
    stepDefinitions: IStepDefinition[],
    beforeHooks: IHook[],
    afterHooks: IHook[],
    gherkinQuery: GherkinQuery,
    private readonly newId: IdGenerator.NewId
  ) {
    this.testCases = pickles.map(pickle =>
      makeTestCase(
        pickle,
        stepDefinitions,
        beforeHooks,
        afterHooks,
        gherkinQuery,
        newId
      )
    )
  }

  public async execute(notifier: MessageNotifier): Promise<void> {
    for (const testCase of this.testCases) {
      notifier(testCase.toMessage())
    }
    for (const testCase of this.testCases) {
      await testCase.execute(notifier, 0, this.newId())
    }
  }
}
