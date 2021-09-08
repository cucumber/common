import { Expression, ExpressionFactory, ParameterType, ParameterTypeRegistry } from '@cucumber/cucumber-expressions'
import { Envelope, StepDefinitionPatternType } from '@cucumber/messages'
import { walkGherkinDocument } from '@cucumber/gherkin-utils'
import { buildStepDocuments, StepDocument } from '@cucumber/suggest'

export type CucumberInfo = {
  stepDocuments: readonly StepDocument[]
  expressions: readonly Expression[]
}

/**
 * Builds CucumberInfo from Cucumber Messages.
 */
export class CucumberInfoBuilder {
  private readonly parameterTypeRegistry = new ParameterTypeRegistry()
  private readonly expressionFactory = new ExpressionFactory(this.parameterTypeRegistry)

  private readonly expressions: Expression[] = []
  private stepTexts: string[] = []

  processEnvelope(envelope: Envelope): void {
    if (envelope.parameterType) {
      const { name, regularExpressions, useForSnippets, preferForRegularExpressionMatch } =
        envelope.parameterType
      this.parameterTypeRegistry.defineParameterType(
        new ParameterType(
          name,
          regularExpressions,
          Object,
          () => undefined,
          useForSnippets,
          preferForRegularExpressionMatch
        )
      )
    }
    if (envelope.stepDefinition) {
      const expr =
        envelope.stepDefinition.pattern.type === StepDefinitionPatternType.CUCUMBER_EXPRESSION
          ? envelope.stepDefinition.pattern.source
          : new RegExp(envelope.stepDefinition.pattern.source)
      const expression = this.expressionFactory.createExpression(expr)
      this.expressions.push(expression)
    }
    if (envelope.gherkinDocument) {
      const stepTexts = this.stepTexts
      this.stepTexts = walkGherkinDocument(envelope.gherkinDocument, this.stepTexts, {
        step(step, arr) {
          return arr.concat(step.text)
        },
      })
    }
  }

  build(): CucumberInfo {
    return {
      stepDocuments: buildStepDocuments(this.stepTexts, this.expressions),
      expressions: this.expressions,
    }
  }
}
