import {
  ExpressionFactory,
  ParameterType,
  ParameterTypeRegistry,
} from '@cucumber/cucumber-expressions'
import { IdGenerator, messages } from '@cucumber/messages'
import { AnyBody } from './types'
import ExpressionStepDefinition from './ExpressionStepDefinition'
import IStepDefinition from './IStepDefinition'
import IHook from './IHook'
import Hook from './Hook'
import IClock from './IClock'
import { MakeErrorMessage } from './ErrorMessageGenerator'

interface IParameterTypeDefinition {
  name: string
  regexp: RegExp | RegExp[] | string | string[]
  type?: any
  transformer?: (...args: string[]) => any
  preferForRegexpMatch?: boolean
  useForSnippets?: boolean
}

function defaultTransformer(...args: string[]) {
  return args
}

/**
 * This class provides an API for defining step definitions and hooks.
 */
export default class SupportCode {
  public readonly parameterTypes: Array<ParameterType<any>> = []
  public readonly stepDefinitions: IStepDefinition[] = []
  public readonly beforeHooks: IHook[] = []
  public readonly afterHooks: IHook[] = []

  private readonly parameterTypeRegistry = new ParameterTypeRegistry()
  private readonly expressionFactory = new ExpressionFactory(
    this.parameterTypeRegistry
  )
  public readonly undefinedParameterTypes: messages.IEnvelope[] = []

  constructor(
    public newId: IdGenerator.NewId,
    public clock: IClock,
    public makeErrorMessage: MakeErrorMessage
  ) {}

  public defineParameterType(
    parameterTypeDefinition: IParameterTypeDefinition
  ) {
    const parameterType = new ParameterType<any>(
      parameterTypeDefinition.name,
      parameterTypeDefinition.regexp,
      parameterTypeDefinition.type,
      parameterTypeDefinition.transformer || defaultTransformer,
      parameterTypeDefinition.useForSnippets,
      parameterTypeDefinition.preferForRegexpMatch
    )
    this.parameterTypeRegistry.defineParameterType(parameterType)
    this.parameterTypes.push(parameterType)
  }

  public registerStepDefinition(
    sourceReference: messages.ISourceReference,
    expression: string | RegExp,
    body: AnyBody
  ): void {
    try {
      const expr = this.expressionFactory.createExpression(expression)
      const stepDefinition = new ExpressionStepDefinition(
        this.newId(),
        expr,
        sourceReference,
        body
      )
      this.stepDefinitions.push(stepDefinition)
    } catch (e) {
      if (e.undefinedParameterTypeName) {
        this.undefinedParameterTypes.push(
          new messages.Envelope({
            undefinedParameterType: new messages.UndefinedParameterType({
              expression: expression.toString(),
              name: e.undefinedParameterTypeName,
            }),
          })
        )
      } else {
        throw e
      }
    }
  }

  public registerBeforeHook(
    sourceReference: messages.ISourceReference,
    tagExpressionOrBody: string | AnyBody,
    body?: AnyBody
  ) {
    this.beforeHooks.push(
      this.makeHook(sourceReference, tagExpressionOrBody, body)
    )
  }

  public registerAfterHook(
    sourceReference: messages.ISourceReference,
    tagExpressionOrBody: string | AnyBody,
    body?: AnyBody
  ) {
    this.afterHooks.push(
      this.makeHook(sourceReference, tagExpressionOrBody, body)
    )
  }

  private makeHook(
    sourceReference: messages.ISourceReference,
    tagExpressionOrBody: string | AnyBody,
    body?: AnyBody
  ) {
    const tagExpression =
      typeof tagExpressionOrBody === 'string' ? tagExpressionOrBody : null
    body = typeof tagExpressionOrBody !== 'string' ? tagExpressionOrBody : body
    return new Hook(this.newId(), tagExpression, sourceReference, body)
  }
}
