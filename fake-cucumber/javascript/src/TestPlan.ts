import { MessageNotifier } from './types'
import { messages } from 'cucumber-messages'
import ITestCase from './test-case-builder/ITestCase'
import makeTestCase from './test-case-builder/makeTestCase'
import { ICucumberSupportCode } from './support-code'

export default class TestPlan {
  private readonly testCases: ITestCase[]

  constructor(
    pickles: messages.IPickle[],
    supportCode: ICucumberSupportCode
  ) {
    this.testCases = pickles.map(pickle =>
      makeTestCase(pickle, supportCode)
    )
  }

  public execute(notifier: MessageNotifier) {
    for (const testCase of this.testCases) {
      notifier(testCase.toMessage())
    }
    for (const testCase of this.testCases) {
      testCase.execute(notifier, 0)
    }
  }
}
