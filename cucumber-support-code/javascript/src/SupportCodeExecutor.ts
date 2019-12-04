import ISupportCodeExecutor from './ISupportCodeExecutor'
import { AnyBody } from './types'

export default class SupportCodeExecutor implements ISupportCodeExecutor {
  constructor(
    private readonly body: AnyBody
  ) {}

  public execute(...args: any): any {
    const thisObj: any = null
    return this.body.apply(thisObj, args)
  }
}