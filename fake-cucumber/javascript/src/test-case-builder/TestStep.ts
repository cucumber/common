import uuidv4 from 'uuid/v4'
import ITestStep from './ITestStep'
import { MessageNotifier } from '../types'
import { messages, TimeConversion } from 'cucumber-messages'
const { millisecondsToDuration } = TimeConversion

export default abstract class TestStep implements ITestStep {
  public readonly id: string = uuidv4()

  public abstract toMessage(): messages.TestCase.ITestStep
  public abstract execute(
    notifier: MessageNotifier,
    testCaseStartedId: string
  ): messages.ITestResult

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
