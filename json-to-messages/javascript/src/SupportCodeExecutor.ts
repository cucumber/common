import { ISupportCodeExecutor } from '@cucumber/fake-cucumber'
import * as messages from '@cucumber/messages'

class SupportCodeExecutor implements ISupportCodeExecutor {
  constructor(public readonly stepDefinitionId: string) {}

  execute() {
    // no-op
  }

  argsToMessages(): messages.StepMatchArgument[] {
    return []
  }
}

export class NilCodeExecutor extends SupportCodeExecutor {}
