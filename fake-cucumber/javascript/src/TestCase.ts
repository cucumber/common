import TestStep from './TestStep'
import { MessageNotifier } from './types'

export default class TestCase {
  constructor(private readonly testSteps: TestStep[]) {}

  public execute(notifier: MessageNotifier) {
    for (const testStep of this.testSteps) {
      testStep.execute(notifier)
    }
  }
}
