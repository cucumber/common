import { IStepDefinition, ISupportCodeExecutor } from '@cucumber/fake-cucumber'
import { messages } from '@cucumber/messages'
import { Argument } from '@cucumber/cucumber-expressions'
import {
  PassedCodeExecutor,
  PendingCodeExecutor,
  FailedCodeExecutor,
} from './SupportCodeExecutor'

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
        new PassedCodeExecutor(stepDefinitionId),
        locationChunks[0],
        parseInt(locationChunks[1])
      )
    }
    case 'pending': {
      return new StepDefinition(
        stepDefinitionId,
        stepId,
        new PendingCodeExecutor(stepDefinitionId),
        locationChunks[0],
        parseInt(locationChunks[1])
      )
    }
    case 'failed': {
      return new StepDefinition(
        stepDefinitionId,
        stepId,
        new FailedCodeExecutor(stepDefinitionId, errorMessage),
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
    private readonly executor: ISupportCodeExecutor,
    private readonly sourceFile: string,
    private readonly sourceLine: number
  ) {}

  match(pickleStep: messages.Pickle.IPickleStep): ISupportCodeExecutor | null {
    if (pickleStep.astNodeIds.includes(this.stepId)) {
      return this.executor
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
