import * as messages from '@cucumber/messages'
import TestStep from './TestStep'

export default class EmptyPickleTestStep extends TestStep {
  public toMessage(): messages.TestStep {
    return new messages.TestCase.TestStep({
      id: this.id,
    })
  }
}
