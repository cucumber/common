import uuidv4 from 'uuid/v4'

import TestStep from './TestStep'
import { ICucumberSupportCode } from '../support-code'
import { messages, TimeConversion } from 'cucumber-messages'
import { MessageNotifier } from '../types'

const { millisecondsToDuration } = TimeConversion

export default class HookTestStep extends TestStep {
  public readonly id: string = uuidv4()

  constructor(
    private readonly supportCode: ICucumberSupportCode,
    private readonly hookId: string
  ) {
    super()
  }

  public toMessage(): messages.TestCase.ITestStep {
    const testStep = new messages.TestCase.TestStep({
      id: this.id,
      hookId: this.hookId,
    })
    testStep.pickleStepId = undefined
    return testStep
  }

  public execute(
    notifier: MessageNotifier,
    testCaseStartedId: string
  ): messages.ITestResult {
    this.emitTestStepStarted(testCaseStartedId, notifier)
    return this.emitTestStepFinished(
      testCaseStartedId,
      this.supportCode.executeHook(this.hookId),
      notifier
    )
  }
}
