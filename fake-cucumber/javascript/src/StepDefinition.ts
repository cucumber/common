import SupportCodeExecutor from './SupportCodeExecutor'
import { Expression } from 'cucumber-expressions'

export default class StepDefinition {
  constructor(
    private readonly expression: Expression,
    private readonly body: (...args: any) => any
  ) {}

  public match(text: string): SupportCodeExecutor | null {
    const args = this.expression.match(text)
    return args === null ? null : new SupportCodeExecutor(this.body, args)
  }
}
