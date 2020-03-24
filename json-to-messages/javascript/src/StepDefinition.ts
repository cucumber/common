import { IStepDefinition } from '@cucumber/fake-cucumber'
import { messages } from '@cucumber/messages'
import { Argument } from '@cucumber/cucumber-expressions'

import SupportCodeExecutor from '@cucumber/fake-cucumber/dist/src/SupportCodeExecutor'
import { AnyBody } from '@cucumber/fake-cucumber/dist/src/types'

class CustomStackError extends Error {
  constructor(
    private readonly msg: string,
    public readonly stack: string
  ) {
    super(msg)
  }
}

export function makeStepDefinition(
  stepId: string,
  status: string,
  errorMessage: string
): IStepDefinition {
  switch(status) {
    case 'passed': {
      return new StepDefinition(stepId, () => {})
    }
    case 'pending': {
      return new StepDefinition(stepId, () => 'pending')
    }
    case 'failed': {
      const stackLines: string[] = errorMessage.split('\n')
      const errorName = stackLines.shift()
      const stack = stackLines.join('\n')

      return new StepDefinition(stepId, () => {
        throw new CustomStackError(errorName, stack)
      })
    }
    case 'undefined': {
      return null
    }
  }
}

export default class StepDefinition implements StepDefinition {
  constructor(
    private readonly stepId: string,
    private readonly body: AnyBody
  ) {}

  match(pickleStep: messages.Pickle.IPickleStep): SupportCodeExecutor | null {
    if (pickleStep.astNodeIds.includes(this.stepId)) {
      return new SupportCodeExecutor('plop', this.body, [], null, null)
    }
    return null
  }

  getArguments(): Array<Argument<any>> {
    return []
  }

  toMessage(): messages.IEnvelope {
    return messages.Envelope.create()
  }
}
