import { EnvelopeListener, ITestCase, ITestPlan } from './types'
import * as messages from '@cucumber/messages'
import SupportCode from './SupportCode'

export default class TestPlan implements ITestPlan {
  constructor(private readonly testCases: ITestCase[], private readonly supportCode: SupportCode) {}

  public async execute(listener: EnvelopeListener): Promise<void> {
    for (const parameterTypeMessage of this.supportCode.parameterTypeMessages) {
      listener(parameterTypeMessage)
    }
    for (const stepDefinition of this.supportCode.stepDefinitions) {
      listener(stepDefinition.toMessage())
    }
    for (const undefinedParameterType of this.supportCode.undefinedParameterTypeMessages) {
      listener(undefinedParameterType)
    }
    for (const hook of this.supportCode.beforeHooks) {
      listener(hook.toMessage())
    }
    for (const hook of this.supportCode.afterHooks) {
      listener(hook.toMessage())
    }

    listener({
      test_run_started: {
        timestamp: messages.TimeConversion.millisecondsSinceEpochToTimestamp(
          this.supportCode.clock.clockNow()
        ),
      },
    })
    for (const testCase of this.testCases) {
      listener(testCase.toMessage())
    }
    // TODO: By using Promise.all here we could execute in parallel
    for (const testCase of this.testCases) {
      await testCase.execute(listener, 0, this.supportCode.newId())
    }
    listener({
      test_run_finished: {
        timestamp: messages.TimeConversion.millisecondsSinceEpochToTimestamp(
          this.supportCode.clock.clockNow()
        ),
      },
    })
  }
}
