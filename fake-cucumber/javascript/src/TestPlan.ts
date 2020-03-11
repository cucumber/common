import TestCase from './TestCase'
import { MessageNotifier } from './types'
import { messages, TimeConversion } from '@cucumber/messages'
import SupportCode from './SupportCode'
import { ParameterType } from '@cucumber/cucumber-expressions'

export default class TestPlan {
  constructor(
    pickles: ReadonlyArray<messages.IPickle>,
    private readonly testCases: TestCase[],
    private readonly supportCode: SupportCode
  ) {}

  public async execute(notifier: MessageNotifier): Promise<void> {
    for (const parameterType of this.supportCode.parameterTypes) {
      notifier(parameterTypeToMessage(parameterType))
    }
    for (const stepDefinition of this.supportCode.stepDefinitions) {
      notifier(stepDefinition.toMessage())
    }
    for (const undefinedParameterType of this.supportCode
      .undefinedParameterTypes) {
      notifier(undefinedParameterType)
    }
    for (const hook of this.supportCode.beforeHooks) {
      notifier(hook.toMessage())
    }
    for (const hook of this.supportCode.afterHooks) {
      notifier(hook.toMessage())
    }

    notifier(
      new messages.Envelope({
        testRunStarted: new messages.TestRunStarted({
          timestamp: TimeConversion.millisecondsSinceEpochToTimestamp(
            this.supportCode.clock.now()
          ),
        }),
      })
    )
    for (const testCase of this.testCases) {
      notifier(testCase.toMessage())
    }
    for (const testCase of this.testCases) {
      await testCase.execute(notifier, 0, this.supportCode.newId())
    }
    notifier(
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
