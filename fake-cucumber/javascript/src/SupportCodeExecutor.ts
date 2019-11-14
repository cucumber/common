import { messages } from 'cucumber-messages'
import { Argument } from 'cucumber-expressions'

export default class SupportCodeExecutor {
  constructor(
    private readonly body: (...args: any) => any,
    private readonly args: Array<Argument<any>>
  ) {}

  public execute(): messages.TestResult.Status {
    const thisObj: any = null
    return this.body.apply(
      thisObj,
      this.args.map(arg => arg.getValue(thisObj))
    )
  }
}
