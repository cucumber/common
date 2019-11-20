import TestCase from './TestCase'
import { MessageNotifier } from './types'
import StepDefinition from './StepDefinition'
import { messages } from 'cucumber-messages'
import makeTestCase from './makeTestCase'

export default class TestPlan {
  private readonly testCases: TestCase[]

  constructor(pickles: messages.IPickle[], stepDefinitions: StepDefinition[]) {
    this.testCases = pickles.map(pickle =>
      makeTestCase(pickle, stepDefinitions)
    )
  }

  public execute(notifier: MessageNotifier) {
    for (const testCase of this.testCases) {
      testCase.execute(notifier, 0)
    }
  }
}
