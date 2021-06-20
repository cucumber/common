import {
  ExpressionFactory,
  ParameterType,
  ParameterTypeRegistry,
} from '@cucumber/cucumber-expressions'
import * as messages from '@cucumber/messages'
import { IHook, AnyBody, IStepDefinition } from './types'
import ExpressionStepDefinition from './ExpressionStepDefinition'
import Hook from './Hook'
import IClock from './IClock'
import { MakeErrorMessage, withFullStackTrace } from './ErrorMessageGenerator'
import IParameterTypeDefinition from './IParameterTypeDefinition'
import PerfHooksStopwatch from './PerfHooksStopwatch'
import IStopwatch from './IStopwatch'
import DateClock from './DateClock'

function defaultTransformer(...args: string[]) {
  return args
}

/**
 * This class provides an API for defining step definitions and hooks.
 */
export default class SupportCode {
  public readonly parameterTypes: Array<ParameterType<any>> = []
  public readonly parameterTypeMessages: Array<messages.Envelope> = []
  public readonly stepDefinitions: IStepDefinition[] = []
  public readonly beforeHooks: IHook[] = []
  public readonly afterHooks: IHook[] = []

  private readonly parameterTypeRegistry = new ParameterTypeRegistry()
  private readonly expressionFactory = new ExpressionFactory(this.parameterTypeRegistry)
  public readonly undefinedParameterTypeMessages: messages.Envelope[] = []

  constructor(
    public readonly newId: messages.IdGenerator.NewId = messages.IdGenerator.uuid(),
    public readonly clock: IClock = new DateClock(),
    public readonly stopwatch: IStopwatch = new PerfHooksStopwatch(),
    public readonly makeErrorMessage: MakeErrorMessage = withFullStackTrace()
  ) {}

  public defineParameterType(parameterTypeDefinition: IParameterTypeDefinition) {
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
    this.parameterTypeMessages.push({
      parameterType: {
        id: this.newId(),
        name: parameterType.name,
        regularExpressions: parameterType.regexpStrings.slice(),
        preferForRegularExpressionMatch: parameterType.preferForRegexpMatch,
        useForSnippets: parameterType.useForSnippets,
      },
    })
  }

  public defineStepDefinition(
    sourceReference: messages.SourceReference,
    expression: string | RegExp,
    body: AnyBody
  ): void {
    try {
      const expr = this.expressionFactory.createExpression(expression)
      const stepDefinition = new ExpressionStepDefinition(this.newId(), expr, sourceReference, body)
      this.registerStepDefinition(stepDefinition)
    } catch (e) {
      if (e.undefinedParameterTypeName) {
        this.undefinedParameterTypeMessages.push({
          undefinedParameterType: {
            expression: expression.toString(),
            name: e.undefinedParameterTypeName,
          },
        })
      } else {
        throw e
      }
    }
  }

  public registerStepDefinition(stepDefinition: IStepDefinition) {
    this.stepDefinitions.push(stepDefinition)
  }

  public defineBeforeHook(
    sourceReference: messages.SourceReference,
    tagExpressionOrBody: string | AnyBody,
    body?: AnyBody
  ) {
    this.registerBeforeHook(this.makeHook(sourceReference, tagExpressionOrBody, body))
  }

  public registerBeforeHook(hook: IHook) {
    this.beforeHooks.push(hook)
  }

  public defineAfterHook(
    sourceReference: messages.SourceReference,
    tagExpressionOrBody: string | AnyBody,
    body?: AnyBody
  ) {
    this.registerAfterHook(this.makeHook(sourceReference, tagExpressionOrBody, body))
  }

  public registerAfterHook(hook: IHook) {
    this.afterHooks.push(hook)
  }

  private makeHook(
    sourceReference: messages.SourceReference,
    tagExpressionOrBody: string | AnyBody,
    body?: AnyBody
  ) {
    const tagExpression = typeof tagExpressionOrBody === 'string' ? tagExpressionOrBody : null
    body = typeof tagExpressionOrBody !== 'string' ? tagExpressionOrBody : body
    return new Hook(this.newId(), tagExpression, sourceReference, body)
  }
}
