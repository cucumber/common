import { IStepDefinition, ISupportCodeExecutor } from '@cucumber/fake-cucumber'
import { messages } from '@cucumber/messages'
import { Argument } from '@cucumber/cucumber-expressions'
import { SupportCodeExecutor } from './SupportCodeExecutor'

class CustomStackError extends Error {
  constructor(private readonly msg: string, public readonly stack: string) {
    super(msg)
  }
}

export function makeStepDefinition(
  stepDefinitionId: string,
  stepId: string,
  status: string,
  errorMessage: string,
  location: string
): IStepDefinition {
  const locationChunks = location.split(':')

  switch (status) {
    case 'passed': {
      return new StepDefinition(
        stepDefinitionId,
        stepId,
        () => undefined,
        locationChunks[0],
        parseInt(locationChunks[1])
      )
    }
    case 'pending': {
      return new StepDefinition(
        stepDefinitionId,
        stepId,
        () => 'pending',
        locationChunks[0],
        parseInt(locationChunks[1])
      )
    }
    case 'failed': {
      const stackLines: string[] = errorMessage.split('\n')
      const errorName = stackLines.shift()
      const stack = stackLines.join('\n')

      return new StepDefinition(
        stepDefinitionId,
        stepId,
        () => {
          throw new CustomStackError(errorName, stack)
        },
        locationChunks[0],
        parseInt(locationChunks[1])
      )
    }
  }
  return null
}

export default class StepDefinition implements StepDefinition {
  constructor(
    private readonly id: string,
    private readonly stepId: string,
    private readonly body: (...args: any) => any,
    private readonly sourceFile: string,
    private readonly sourceLine: number
  ) {}

  match(pickleStep: messages.Pickle.IPickleStep): ISupportCodeExecutor | null {
    if (pickleStep.astNodeIds.includes(this.stepId)) {
      return new SupportCodeExecutor(this.id, this.body)
    }
    return null
  }

  getArguments(): Array<Argument<any>> {
    return []
  }

  toMessage(): messages.IEnvelope {
    return messages.Envelope.create({
      stepDefinition: messages.StepDefinition.create({
        id: this.id,
        sourceReference: messages.SourceReference.create({
          uri: this.sourceFile,
          location: messages.Location.create({
            line: this.sourceLine,
          }),
        }),
      }),
    })
  }
}
