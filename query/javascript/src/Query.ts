import { messages, TimeConversion } from '@cucumber/messages'
import { ArrayMultimap } from '@teppeis/multimaps'

export default class Query {
  private readonly testStepResultByPickleId = new ArrayMultimap<
    string,
    messages.ITestStepResult
  >()
  private readonly testStepResultsByPickleStepId = new ArrayMultimap<
    string,
    messages.ITestStepResult
  >()
  private readonly testStepById = new Map<string, messages.TestCase.ITestStep>()
  private readonly testCaseByPickleId = new Map<string, messages.ITestCase>()
  private readonly pickleIdByTestStepId = new Map<string, string>()
  private readonly pickleStepIdByTestStepId = new Map<string, string>()
  private readonly testStepResultsbyTestStepId = new ArrayMultimap<
    string,
    messages.ITestStepResult
  >()

  private readonly attachmentsByPickleStepId = new ArrayMultimap<
    string,
    messages.IAttachment
  >()

  private readonly stepMatchArgumentsListsByPickleStepId = new Map<
    string,
    messages.TestCase.TestStep.IStepMatchArgumentsList[]
  >()

  public update(envelope: messages.IEnvelope) {
    if (envelope.testCase) {
      this.testCaseByPickleId.set(envelope.testCase.pickleId, envelope.testCase)
      for (const testStep of envelope.testCase.testSteps) {
        this.testStepById.set(testStep.id, testStep)
        this.pickleIdByTestStepId.set(testStep.id, envelope.testCase.pickleId)
        this.pickleStepIdByTestStepId.set(testStep.id, testStep.pickleStepId)
        this.stepMatchArgumentsListsByPickleStepId.set(
          testStep.pickleStepId,
          testStep.stepMatchArgumentsLists
        )
      }
    }

    if (envelope.testStepFinished) {
      const pickleId = this.pickleIdByTestStepId.get(
        envelope.testStepFinished.testStepId
      )
      this.testStepResultByPickleId.put(
        pickleId,
        envelope.testStepFinished.testStepResult
      )

      const testStep = this.testStepById.get(
        envelope.testStepFinished.testStepId
      )
      this.testStepResultsByPickleStepId.put(
        testStep.pickleStepId,
        envelope.testStepFinished.testStepResult
      )
      this.testStepResultsbyTestStepId.put(
        testStep.id,
        envelope.testStepFinished.testStepResult
      )
    }

    if (envelope.attachment) {
      const pickleStepId = this.pickleStepIdByTestStepId.get(
        envelope.attachment.testStepId
      )
      this.attachmentsByPickleStepId.put(pickleStepId, envelope.attachment)
    }
  }

  /**
   * Gets all the results for multiple pickle steps
   * @param pickleStepIds
   */
  public getPickleStepTestStepResults(
    pickleStepIds: ReadonlyArray<string>
  ): ReadonlyArray<messages.ITestStepResult> {
    if (pickleStepIds.length === 0) {
      return [
        new messages.TestStepResult({
          status: messages.TestStepResult.Status.UNKNOWN,
          duration: TimeConversion.millisecondsToDuration(0),
        }),
      ]
    }
    return pickleStepIds.reduce(
      (testStepResults: messages.ITestStepResult[], pickleId) => {
        return testStepResults.concat(
          this.testStepResultsByPickleStepId.get(pickleId)
        )
      },
      []
    )
  }

  /**
   * Gets all the results for multiple pickles
   * @param pickleIds
   */
  public getPickleTestStepResults(
    pickleIds: ReadonlyArray<string>
  ): ReadonlyArray<messages.ITestStepResult> {
    if (pickleIds.length === 0) {
      return [
        new messages.TestStepResult({
          status: messages.TestStepResult.Status.UNKNOWN,
          duration: TimeConversion.millisecondsToDuration(0),
        }),
      ]
    }
    return pickleIds.reduce(
      (testStepResults: messages.ITestStepResult[], pickleId) => {
        return testStepResults.concat(
          this.testStepResultByPickleId.get(pickleId)
        )
      },
      []
    )
  }

  /**
   * Gets the worst result
   * @param testStepResults
   */
  public getWorstTestStepResult(
    testStepResults: ReadonlyArray<messages.ITestStepResult>
  ): messages.ITestStepResult {
    return (
      testStepResults.slice().sort((r1, r2) => r2.status - r1.status)[0] ||
      new messages.TestStepResult({
        status: messages.TestStepResult.Status.UNKNOWN,
        duration: TimeConversion.millisecondsToDuration(0),
      })
    )
  }

  /**
   * Gets all the attachments for multiple pickle steps
   * @param pickleStepIds
   */
  public getPickleStepAttachments(
    pickleStepIds: ReadonlyArray<string>
  ): ReadonlyArray<messages.IAttachment> {
    return pickleStepIds.reduce(
      (attachments: messages.IAttachment[], pickleStepId) => {
        return attachments.concat(
          this.attachmentsByPickleStepId.get(pickleStepId)
        )
      },
      []
    )
  }

  /**
   * Get StepMatchArguments for a pickle step
   * @param pickleStepId
   */
  public getStepMatchArgumentsLists(
    pickleStepId: string
  ):
    | ReadonlyArray<messages.TestCase.TestStep.IStepMatchArgumentsList>
    | undefined {
    return this.stepMatchArgumentsListsByPickleStepId.get(pickleStepId)
  }

  public getBeforeHookSteps(
    pickleId: string
  ): ReadonlyArray<messages.TestCase.ITestStep> {
    const testCase = this.testCaseByPickleId.get(pickleId)

    // const hookSteps = testCase.testSteps.filter((step) => step.hookId)
    const hookSteps: messages.TestCase.ITestStep[] = []
    let pickleStepFound = false

    for (const step of testCase.testSteps) {
      if (!step.hookId) {
        pickleStepFound = true
      }
      if (step.hookId && !pickleStepFound) {
        hookSteps.push(step)
      }
    }

    return hookSteps
  }

  public getAfterHookSteps(
    pickleId: string
  ): ReadonlyArray<messages.TestCase.ITestStep> {
    const testCase = this.testCaseByPickleId.get(pickleId)

    const hookSteps: messages.TestCase.ITestStep[] = []
    let pickleStepFound = false

    for (const step of testCase.testSteps) {
      if (!step.hookId) {
        pickleStepFound = true
      }
      if (step.hookId && pickleStepFound) {
        hookSteps.push(step)
      }
    }

    return hookSteps
  }

  public getTestStepResults(testStepId: string): messages.ITestStepResult[] {
    const testStepResults = this.testStepResultsbyTestStepId.get(testStepId)

    return testStepResults
  }
}
