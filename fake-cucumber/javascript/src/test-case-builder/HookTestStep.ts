import uuidv4 from 'uuid/v4'
import TestStep from './TestStep'
import { ICucumberSupportCode } from '../support-code'
import { messages } from 'cucumber-messages'

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

  public run(): messages.ITestResult {
    return this.supportCode.executeHook(this.hookId)
  }
}
