import { EnvelopeListener } from './types'
import { messages, TimeConversion } from '@cucumber/messages'
import SupportCode from './SupportCode'
import ITestPlan from './ITestPlan'
import ITestCase from './ITestCase'

export default class TestPlan implements ITestPlan {
  constructor(
    private readonly testCases: ITestCase[],
    private readonly supportCode: SupportCode
  ) {}

  public async execute(listener: EnvelopeListener): Promise<void> {
    for (const parameterTypeMessage of this.supportCode.parameterTypeMessages) {
      listener(parameterTypeMessage)
    }
    for (const stepDefinition of this.supportCode.stepDefinitions) {
      listener(stepDefinition.toMessage())
    }
    for (const undefinedParameterType of this.supportCode
      .undefinedParameterTypeMessages) {
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
