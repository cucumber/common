import { MessageNotifier } from '../../src/types'
import { messages, TimeConversion } from 'cucumber-messages'
import { ICucumberSupportCode } from '../../src/support-code'
import uuidv4 from 'uuid/v4'
import StepMatch from '../support-code/StepMatch'
import ITestStep from './ITestStep'

const { millisecondsToDuration } = TimeConversion

export default class TestStep implements ITestStep{
  public readonly id: string = uuidv4()
  private matches: StepMatch[]

  constructor(
    private readonly supportCode: ICucumberSupportCode,
    private readonly pickleStep: messages.Pickle.IPickleStep
  ) {
    this.matches = this.supportCode.findMatchingStepDefinitions(this.pickleStep)
  }

  public toMessage(): messages.TestCase.ITestStep {
    return new messages.TestCase.TestStep({
      id: this.id,
      pickleStepId: this.pickleStep.id,
      stepDefinitionIds: this.matches.map(
        match => match.stepDefinitionId
      ),
      stepMatchArguments:
        this.matches.length !== 1
          ? null
          : this.matches[0].args,
    })
  }

  public execute(
    notifier: MessageNotifier,
    testCaseStartedId: string
  ): messages.ITestResult {
    if (this.matches.length == 0) {
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

  public skip(
    notifier: MessageNotifier,
    testCaseStartedId: string
  ): messages.ITestResult {
    return this.emitTestStepFinished(
      testCaseStartedId,
      new messages.TestResult({
        duration: millisecondsToDuration(0),
        status: messages.TestResult.Status.SKIPPED,
      }),
      notifier
    )
  }

  protected emitTestStepFinished(
    testCaseStartedId: string,
    testResult: messages.ITestResult,
    notifier: MessageNotifier
  ): messages.ITestResult {
    notifier(
      new messages.Envelope({
        testStepFinished: new messages.TestStepFinished({
          testCaseStartedId,
          testStepId: this.id,
          testResult,
        }),
      })
    )
    return testResult
  }
}