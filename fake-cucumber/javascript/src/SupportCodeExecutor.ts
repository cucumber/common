import { Argument } from 'cucumber-expressions'
import { messages } from 'cucumber-messages'

export default class SupportCodeExecutor {
  constructor(
    public readonly stepDefinitionId: string,
    private readonly body: (...args: any) => any,
    private readonly args: Array<Argument<any>>
  ) {}

  public execute(): any {
    const thisObj: any = null
    return this.body.apply(
      thisObj,
      this.args.map(arg => arg.getValue(thisObj))
    )
  }

  public argsToMessages(): messages.IStepMatchArgument[] {
    return this.args.map(arg => {
      return new messages.StepMatchArgument({
        // TODO: add recursive transformation.
        group: arg.group,
        parameterTypeName: arg.parameterType.name,
      })
    })
  }
}
