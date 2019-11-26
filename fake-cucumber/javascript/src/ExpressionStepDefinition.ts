import SupportCodeExecutor from './SupportCodeExecutor'
import {
  Argument,
  CucumberExpression,
  Expression,
  RegularExpression,
} from 'cucumber-expressions'
import { messages } from 'cucumber-messages'
import uuidv4 from 'uuid/v4'
import IStepDefinition from './IStepDefinition'

export default class ExpressionStepDefinition implements IStepDefinition {
  private readonly id = uuidv4()

  constructor(
    private readonly expression: Expression,
    private readonly body: (...args: any) => any
  ) {}

  public match(
    pickleStep: messages.Pickle.IPickleStep
  ): SupportCodeExecutor | null {
    const expressionArgs = this.getArguments(pickleStep.text)
    return expressionArgs === null
      ? null
      : new SupportCodeExecutor(
          this.id,
          this.body,
          expressionArgs,
          pickleStep.argument && pickleStep.argument.docString,
          pickleStep.argument && pickleStep.argument.dataTable
        )
  }

  public getArguments(text: string): Array<Argument<any>> {
    return this.expression.match(text)
  }

  public toMessage(): messages.IEnvelope {
    return new messages.Envelope({
      stepDefinitionConfig: new messages.StepDefinitionConfig({
        id: this.id,
        pattern: new messages.StepDefinitionPattern({
          type: this.expressionType(),
          source: this.expression.source,
        }),
        location: new messages.SourceReference({
          location: new messages.Location({
            column: 3,
            line: 10,
          }),
          uri: 'some/javascript/file.js',
        }),
      }),
    })
  }

  private expressionType(): messages.StepDefinitionPatternType {
    if (this.expression instanceof CucumberExpression) {
      return messages.StepDefinitionPatternType.CUCUMBER_EXPRESSION
    } else if (this.expression instanceof RegularExpression) {
      return messages.StepDefinitionPatternType.REGULAR_EXPRESSION
    } else {
      throw new Error(
        `Unknown expression type: ${this.expression.constructor.name}`
      )
    }
  }
}
