import { MessageNotifier } from '../types'
import { messages, TimeConversion } from 'cucumber-messages'
import { ICucumberSupportCode } from '../support-code'
import StepMatch from '../support-code/StepMatch'
import TestStep from './TestStep'

const { millisecondsToDuration } = TimeConversion

export default class PickleTestStep extends TestStep {
  private matches: StepMatch[]

  constructor(
    private readonly supportCode: ICucumberSupportCode,
    private readonly pickleStep: messages.Pickle.IPickleStep
  ) {
    super()
    this.matches = this.supportCode.findMatchingStepDefinitions(this.pickleStep)
  }

  public toMessage(): messages.TestCase.ITestStep {
    return new messages.TestCase.TestStep({
      id: this.id,
      pickleStepId: this.pickleStep.id,
      stepDefinitionIds: this.matches.map(match => match.stepDefinitionId),
      stepMatchArguments:
        this.matches.length !== 1 ? null : this.matches[0].args,
    })
  }

  public execute(
    notifier: MessageNotifier,
    testCaseStartedId: string
  ): messages.ITestResult {
    this.emitTestStepStarted(testCaseStartedId, notifier)

    if (this.matches.length === 0) {
      return this.emitTestStepFinished(
        testCaseStartedId,
        new messages.TestResult({
          duration: millisecondsToDuration(0),
          status: messages.TestResult.Status.UNDEFINED,
        }),
        notifier
      )
    }

    if (this.matches.length > 1) {
      return this.emitTestStepFinished(
        testCaseStartedId,
        new messages.TestResult({
          duration: millisecondsToDuration(0),
          status: messages.TestResult.Status.AMBIGUOUS,
        }),
        notifier
      )
    }

    const match = this.matches[0]
    return this.emitTestStepFinished(
      testCaseStartedId,
      this.supportCode.executeStepDefinition(
        match.stepDefinitionId,
        match.args
      ),
      notifier
    )
  }
}
