import { IdGenerator, messages } from '@cucumber/messages'
import { MessageNotifier } from './types'
import TestPlan from './TestPlan'
import IStepDefinition from './IStepDefinition'
import IHook from './IHook'
import { GherkinQuery } from '@cucumber/gherkin'
import { ParameterType } from '@cucumber/expressions'
import IClock from './IClock'
import { MakeErrorMessage } from './ErrorMessageGenerator'

export default class Cucumber {
  constructor(
    // * Source (sent through)
    // * GherkinDocument (sent through)
    // * Pickle (used)
    private readonly gherkinMessages: messages.IEnvelope[],
    private readonly parameterTypes: Array<ParameterType<any>>,
    private readonly stepDefinitions: IStepDefinition[],
    private readonly beforeHooks: IHook[],
    private readonly afterHooks: IHook[],
    private readonly gherkinQuery: GherkinQuery,
    private readonly newId: IdGenerator.NewId,
    private readonly clock: IClock,
    private readonly makeErrorMessage: MakeErrorMessage
  ) {}

  public async execute(notifier: MessageNotifier): Promise<void> {
    for (const gherkinMessage of this.gherkinMessages) {
      notifier(gherkinMessage)
    }
    for (const parameterType of this.parameterTypes) {
      notifier(parameterTypeToMessage(parameterType))
    }
    for (const stepDefinition of this.stepDefinitions) {
      notifier(stepDefinition.toMessage())
    }
    for (const hook of [].concat(this.beforeHooks, this.afterHooks)) {
      notifier(hook.toMessage())
    }
    const pickles = this.gherkinMessages
      .filter(m => m.pickle)
      .map(m => m.pickle)
    const testPlan = new TestPlan(
      pickles,
      this.stepDefinitions,
      this.beforeHooks,
      this.afterHooks,
      this.gherkinQuery,
      this.newId,
      this.clock,
      this.makeErrorMessage
    )
    await testPlan.execute(notifier)
  }
}

function parameterTypeToMessage(
  parameterType: ParameterType<any>
): messages.IEnvelope {
  return new messages.Envelope({
    parameterType: new messages.ParameterType({
      name: parameterType.name,
      regularExpressions: parameterType.regexpStrings,
      preferForRegularExpressionMatch: parameterType.preferForRegexpMatch,
      useForSnippets: parameterType.useForSnippets,
    }),
  })
}
