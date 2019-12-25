import {
  CucumberExpression,
  ParameterType,
  ParameterTypeRegistry,
  RegularExpression,
} from 'cucumber-expressions'
import { IdGenerator, messages } from 'cucumber-messages'
import StackUtils from 'stack-utils'
import { AnyBody } from './types'
import ExpressionStepDefinition from './ExpressionStepDefinition'
import IStepDefinition from './IStepDefinition'
import IHook from './IHook'
import Hook from './Hook'

type RegisterStepDefinition = (
  expression: string | RegExp,
  body: AnyBody
) => void

type RegisterHook = (tagExpression: string, body: AnyBody) => void

interface IParameterTypeDefinition {
  name: string
  regexp: RegExp | RegExp[] | string | string[]
  type: any
  transformer?: (...args: string[]) => any
  preferForRegexpMatch?: boolean
  useForSnippets?: boolean
}

function defaultTransformer(...args: string[]) {
  return args
}

function getSourceReference(stackTrace: string): messages.ISourceReference {
  const stack = new StackUtils({
    cwd: process.cwd(),
    internals: StackUtils.nodeInternals(),
  })
  const trace = stack.clean(stackTrace)
  const callSite = stack.parseLine(trace.split('\n')[1])
  const { file: uri, line } = callSite
  return new messages.SourceReference({
    uri,
    location: new messages.Location({
      line,
    }),
  })
}

/**
 * This class provides an API for defining step definitions and hooks.
 */
export default class SupportCode {
  public readonly parameterTypes: Array<ParameterType<any>> = []
  public readonly stepDefinitions: IStepDefinition[] = []
  public readonly beforeHooks: IHook[] = []
  public readonly afterHooks: IHook[] = []
  public readonly Given = this.registerStepDefinition.bind(
    this
  ) as RegisterStepDefinition
  public readonly When = this.registerStepDefinition.bind(
    this
  ) as RegisterStepDefinition
  public readonly Then = this.registerStepDefinition.bind(
    this
  ) as RegisterStepDefinition
  public readonly Before = this.registerBeforeHook.bind(this) as RegisterHook
  public readonly After = this.registerAfterHook.bind(this) as RegisterHook
  private readonly parameterTypeRegistry = new ParameterTypeRegistry()

  constructor(public newId: IdGenerator.NewId) {}

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

  private registerStepDefinition(
    expression: string | RegExp,
    body: AnyBody
  ): void {
    const sourceReference = getSourceReference(new Error().stack)
    const expr =
      typeof expression === 'string'
        ? new CucumberExpression(expression, this.parameterTypeRegistry)
        : new RegularExpression(expression, this.parameterTypeRegistry)
    const stepDefinition = new ExpressionStepDefinition(
      this.newId(),
      expr,
      sourceReference,
      body
    )
    this.stepDefinitions.push(stepDefinition)
  }

  private registerBeforeHook(tagExpression: string, body: AnyBody) {
    const sourceReference = getSourceReference(new Error().stack)
    this.beforeHooks.push(
      new Hook(this.newId(), tagExpression, sourceReference, body)
    )
  }

  private registerAfterHook(tagExpression: string, body: AnyBody) {
    const sourceReference = getSourceReference(new Error().stack)

    this.afterHooks.push(
      new Hook(this.newId(), tagExpression, sourceReference, body)
    )
  }
}
