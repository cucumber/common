import SupportCodeExecutor from './SupportCodeExecutor'
import { CucumberExpression, Expression, RegularExpression } from '@cucumber/cucumber-expressions'
import * as messages from '@cucumber/messages'
import { AnyBody, IStepDefinition, ISupportCodeExecutor } from './types'

export default class ExpressionStepDefinition implements IStepDefinition {
  constructor(
    private readonly id: string,
    private readonly expression: Expression,
    private readonly sourceReference: messages.SourceReference,
    private readonly body: AnyBody
  ) {}

  public match(pickleStep: messages.PickleStep): ISupportCodeExecutor | null {
    const expressionArgs = this.expression.match(pickleStep.text)
    return expressionArgs === null
      ? null
      : new SupportCodeExecutor(
          this.id,
          this.body,
          expressionArgs,
          pickleStep.argument && pickleStep.argument.doc_string,
          pickleStep.argument && pickleStep.argument.data_table
        )
  }

  public toMessage(): messages.Envelope {
    return {
      step_definition: {
        id: this.id,
        pattern: {
          type: this.expressionType(),
          source: this.expression.source,
        },
        source_reference: this.sourceReference,
      },
    }
  }

  private expressionType(): 'CUCUMBER_EXPRESSION' | 'REGULAR_EXPRESSION' {
    if (this.expression instanceof CucumberExpression) {
      return 'CUCUMBER_EXPRESSION'
    } else if (this.expression instanceof RegularExpression) {
      return 'REGULAR_EXPRESSION'
    } else {
      throw new Error(`Unknown expression type: ${this.expression.constructor.name}`)
    }
  }
}
