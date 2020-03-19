import TestCase from './TestCase'
import { EnvelopeListener } from './types'
import { messages, TimeConversion } from '@cucumber/messages'
import SupportCode from './SupportCode'
import { ParameterType } from '@cucumber/cucumber-expressions'

export default class TestPlan {
  constructor(
    private readonly testCases: TestCase[],
    private readonly supportCode: SupportCode
  ) {}

  public async execute(listener: EnvelopeListener): Promise<void> {
    for (const parameterType of this.supportCode.parameterTypes) {
      listener(parameterTypeToMessage(parameterType))
    }
    for (const stepDefinition of this.supportCode.stepDefinitions) {
      listener(stepDefinition.toMessage())
    }
    for (const undefinedParameterType of this.supportCode
      .undefinedParameterTypes) {
      listener(undefinedParameterType)
    }
    for (const hook of this.supportCode.beforeHooks) {
      listener(hook.toMessage())
    }
    for (const hook of this.supportCode.afterHooks) {
      listener(hook.toMessage())
    }

    listener(
      new messages.Envelope({
        testRunStarted: new messages.TestRunStarted({
          timestamp: TimeConversion.millisecondsSinceEpochToTimestamp(
            this.supportCode.clock.now()
          ),
        }),
      })
    )
    for (const testCase of this.testCases) {
      listener(testCase.toMessage())
    }
    // TODO: By using Promise.all here we could execute in parallel
    for (const testCase of this.testCases) {
      await testCase.execute(listener, 0, this.supportCode.newId())
    }
    listener(
      new messages.Envelope({
        testRunFinished: new messages.TestRunFinished({
          timestamp: TimeConversion.millisecondsSinceEpochToTimestamp(
            this.supportCode.clock.now()
          ),
        }),
      })
    )
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
