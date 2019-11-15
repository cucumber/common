import SupportCodeExecutor from './SupportCodeExecutor'
import { Expression, CucumberExpression, RegularExpression, Argument } from 'cucumber-expressions'
import { messages } from 'cucumber-messages'
import uuidv4 from 'uuid/v4'

export default class StepDefinition {
  public readonly id = uuidv4()

  constructor(
    private readonly expression: Expression,
    private readonly body: (...args: any) => any
  ) {}

  public match(text: string): SupportCodeExecutor | null {
    const args = this.getArguments(text)
    return args === null ? null : new SupportCodeExecutor(this.body, args)
  }

  public getArguments(text: string): Array<Argument<any>> {
    return this.expression.match(text)
  }

  public toMessage(): messages.StepDefinitionConfig {
    return new messages.StepDefinitionConfig({
      id: this.id,
      pattern: new messages.StepDefinitionPattern({
        type: this.expressionType(),
        source: this.expression.source
      }),
      location: new messages.SourceReference({
        location: new messages.Location({
          column: 3,
          line: 10
        }),
        uri: "some/javascript/file.js"
      })
    })
  }

  private expressionType(): messages.StepDefinitionPatternType {
    if (this.expression instanceof CucumberExpression) {
      return messages.StepDefinitionPatternType.CUCUMBER_EXPRESSION
    } else if (this.expression instanceof RegularExpression) {
      return messages.StepDefinitionPatternType.REGULAR_EXPRESSION
    } else {
      throw new Error(`Unknown expression type: ${this.expression.constructor.name}`)
    }
  }
}
