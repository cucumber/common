import TestCase from './TestCase'
import { MessageNotifier } from './types'

export default class TestPlan {
  constructor(private readonly testCases: TestCase[]) {}

  public execute(notifier: MessageNotifier) {
    for (const testCase of this.testCases) {
      testCase.execute(notifier, 0)
    }
  }
}
