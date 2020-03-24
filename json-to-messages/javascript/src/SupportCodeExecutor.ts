import { ISupportCodeExecutor, IWorld } from '@cucumber/fake-cucumber'
import { messages } from '@cucumber/messages'

export class SupportCodeExecutor implements ISupportCodeExecutor {
  constructor(
    public readonly stepDefinitionId: string,
    private readonly body: (...args: any) => any
  ) {}

  execute(thisObj: IWorld) {
    return this.body.call(thisObj)
  }

  argsToMessages(): messages.IStepMatchArgument[] {
    return []
  }
}
