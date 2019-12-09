import {
  CucumberExpression,
  ParameterTypeRegistry,
  RegularExpression,
} from 'cucumber-expressions'
import { AnyBody } from './types'
import ExpressionStepDefinition from './ExpressionStepDefinition'
import IStepDefinition from './IStepDefinition'
import IHook, { HookType } from './IHook'
import Hook from './Hook'

type RegisterStepDefinition = (
  expression: string | RegExp,
  body: AnyBody
) => void

type RegisterHook = (tagExpression: string, body: AnyBody) => void

export default class SupportCode {
  private readonly parameterTypeRegistry = new ParameterTypeRegistry()
  public readonly stepDefinitions: IStepDefinition[] = []
  public readonly hooks: IHook[] = []

  private registerStepDefinition(
    expression: string | RegExp,
    body: AnyBody
  ): void {
    const expr =
      typeof expression === 'string'
        ? new CucumberExpression(expression, this.parameterTypeRegistry)
        : new RegularExpression(expression, this.parameterTypeRegistry)
    const stepDefinition = new ExpressionStepDefinition(expr, body)
    this.stepDefinitions.push(stepDefinition)
  }

  private registerBeforeHook(tagExpression: string, body: AnyBody) {
    this.hooks.push(new Hook(HookType.Before, tagExpression, body))
  }

  private registerAfterHook(tagExpression: string, body: AnyBody) {
    this.hooks.push(new Hook(HookType.After, tagExpression, body))
  }

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
}
