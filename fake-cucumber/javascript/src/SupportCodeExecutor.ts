import { Argument } from 'cucumber-expressions'

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
}
