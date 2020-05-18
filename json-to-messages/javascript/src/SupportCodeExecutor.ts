import { ISupportCodeExecutor } from '@cucumber/fake-cucumber'
import { messages } from '@cucumber/messages'

class SupportCodeExecutor implements ISupportCodeExecutor {
  constructor(public readonly stepDefinitionId: string) {}

  execute() {
    // no-op
  }

  argsToMessages(): messages.TestCase.TestStep.StepMatchArgumentsList.IStepMatchArgument[] {
    return []
  }
}

export class NilCodeExecutor extends SupportCodeExecutor {}
