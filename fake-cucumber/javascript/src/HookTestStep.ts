import * as messages from '@cucumber/messages'
import TestStep from './TestStep.js'

export default class HookTestStep extends TestStep {
  public toMessage(): messages.TestStep {
    return {
      id: this.id,
      hookId: this.sourceId,
    }
  }
}
