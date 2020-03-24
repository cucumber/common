import { ISupportCodeExecutor } from '@cucumber/fake-cucumber'
import { messages } from '@cucumber/messages'

class SupportCodeExecutor implements ISupportCodeExecutor {
  constructor(public readonly stepDefinitionId: string) {}

  execute() {
    // no-op
  }

  argsToMessages(): messages.IStepMatchArgument[] {
    return []
  }
}

export class PassedCodeExecutor extends SupportCodeExecutor {}

export class PendingCodeExecutor extends SupportCodeExecutor {
  execute() {
    return 'pending'
  }
}

export class CustomStackError extends Error {
  constructor(private readonly msg: string, public readonly stack: string) {
    super(msg)
  }
}

export class FailedCodeExecutor extends SupportCodeExecutor {
  constructor(
    public readonly stepDefinitionId: string,
    private readonly stacktrace: string
  ) {
    super(stepDefinitionId)
  }

  execute() {
    const stackLines: string[] = this.stacktrace.split('\n')
    const errorName = stackLines.shift()
    const stack = stackLines.join('\n')

    throw new CustomStackError(errorName, stack)
  }
}
