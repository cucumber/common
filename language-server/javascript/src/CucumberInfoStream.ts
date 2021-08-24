import { Transform, TransformCallback } from 'stream'
import { buildStepDocuments, StepDocument } from '@cucumber/suggest'
import { Envelope, StepDefinitionPatternType } from '@cucumber/messages'
import { Expression, ExpressionFactory, ParameterType, ParameterTypeRegistry, } from '@cucumber/cucumber-expressions'
import { GherkinDocumentWalker } from '@cucumber/gherkin-utils'
import { CucumberInfo } from './makeCucumberInfo'

export class CucumberInfoStream extends Transform {
  private readonly parameterTypeRegistry = new ParameterTypeRegistry()
  private readonly expressionFactory = new ExpressionFactory(this.parameterTypeRegistry)

  private readonly expressions: Expression[] = []
  private readonly stepTexts: string[] = []

  constructor() {
    super({ objectMode: true })
  }

  _transform(envelope: Envelope, _: BufferEncoding, callback: TransformCallback) {
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
      const walker = new GherkinDocumentWalker(undefined, {
        handleStep(step) {
          stepTexts.push(step.text)
        },
      })
      walker.walkGherkinDocument(envelope.gherkinDocument)
    }
    callback()
  }

  _flush(callback: TransformCallback) {
    const cucumberInfo: CucumberInfo = {
      stepDocuments: buildStepDocuments(this.stepTexts, this.expressions),
      expressions: this.expressions
    }
    callback(null, cucumberInfo)
  }
}
