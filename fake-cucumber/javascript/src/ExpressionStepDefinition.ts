import SupportCodeExecutor from './SupportCodeExecutor'
import {
  Argument,
  CucumberExpression,
  Expression,
  RegularExpression,
} from '@cucumber/expressions'
import { messages } from '@cucumber/messages'
import IStepDefinition from './IStepDefinition'
import { AnyBody } from './types'

export default class ExpressionStepDefinition implements IStepDefinition {
  constructor(
    private readonly id: string,
    private readonly expression: Expression,
    private readonly sourceReference: messages.ISourceReference,
    private readonly body: AnyBody
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
      stepDefinition: new messages.StepDefinition({
        id: this.id,
        pattern: new messages.StepDefinitionPattern({
          type: this.expressionType(),
          source: this.expression.source,
        }),
        sourceReference: this.sourceReference,
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
