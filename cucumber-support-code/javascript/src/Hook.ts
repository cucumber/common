import uuidv4 from 'uuid/v4'
import parseTagExpression from 'cucumber-tag-expressions'
import ISupportCodeExecutor from '../src/ISupportCodeExecutor'
import SupportCodeExecutor from '../src/SupportCodeExecutor'

export default class Hook {
  public readonly id: string = uuidv4()

  constructor(
    private readonly tagExpression: string,
    private readonly executor: ISupportCodeExecutor
  ) {}

  public match(tags: string[]): boolean {
    const expression = parseTagExpression(this.tagExpression)
    return expression.evaluate(tags)
  }

  public execute(): any {
    return this.executor.execute()
  }
}
