import { IStepDefinition, ISupportCodeExecutor } from '@cucumber/fake-cucumber'
import * as messages from '@cucumber/messages'
import { NilCodeExecutor } from './SupportCodeExecutor'

export default class PredictableStepDefinition implements IStepDefinition {
  constructor(
    public readonly id: string,
    private readonly stepId: string,
    private readonly location: string,
    public readonly status:
      | 'UNKNOWN'
      | 'PASSED'
      | 'SKIPPED'
      | 'PENDING'
      | 'UNDEFINED'
      | 'AMBIGUOUS'
      | 'FAILED',
    public readonly duration: number,
    public readonly errorMessage?: string
  ) {}

  match(pickleStep: messages.PickleStep): ISupportCodeExecutor | null {
    if (pickleStep.ast_node_ids.includes(this.stepId)) {
      return new NilCodeExecutor(this.id)
    }
    return null
  }

  toMessage(): messages.Envelope {
    const locationChunks = this.location.split(':')

    return {
      step_definition: {
        id: this.id,
        source_reference: {
          uri: locationChunks[0],
          location: {
            line: parseInt(locationChunks[1]),
          },
        },
      },
    }
  }
}
