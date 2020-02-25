import { StrictArrayMultimap, StrictMap } from '@cucumber/gherkin'
import { messages, TimeConversion } from '@cucumber/messages'

export default class Query {
  private readonly testCaseStartedIdsByPickleId = new StrictArrayMultimap<
    string,
    string
  >()

  private readonly testStepResultsByPickleId = new StrictArrayMultimap<
    string,
    messages.ITestStepResult
  >()
  private readonly testStepResultsByPickleStepId = new StrictArrayMultimap<
    string,
    messages.ITestStepResult
  >()

  private readonly testStepResultsByTestCaseStartedIdPickleStepId = new StrictMap<
    string,
    StrictArrayMultimap<string, messages.ITestStepResult>
  >()

  private readonly testStepById = new StrictMap<
    string,
    messages.TestCase.ITestStep
  >()

  private readonly pickleIdByTestCaseId = new StrictMap<string, string>()
  private readonly pickleIdByTestStepId = new StrictMap<string, string>()
  private readonly pickleStepIdByTestStepId = new StrictMap<string, string>()

  private readonly attachmentsByPickleStepId = new StrictArrayMultimap<
    string,
    messages.IAttachment
  >()

  private readonly stepMatchArgumentsListsByPickleStepId = new StrictMap<
    string,
    messages.TestCase.TestStep.IStepMatchArgumentsList[]
  >()

  public update(envelope: messages.IEnvelope) {
    if (envelope.testCase) {
      this.pickleIdByTestCaseId.set(
        envelope.testCase.id,
        envelope.testCase.pickleId
      )
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

    if (envelope.testCaseStarted) {
      this.testStepResultsByTestCaseStartedIdPickleStepId.set(
        envelope.testCaseStarted.id,
        new StrictArrayMultimap<string, messages.ITestStepResult>()
      )
      const pickleId = this.pickleIdByTestCaseId.get(
        envelope.testCaseStarted.testCaseId
      )
      this.testCaseStartedIdsByPickleId.put(
        pickleId,
        envelope.testCaseStarted.id
      )
    }

    if (envelope.testStepFinished) {
      const pickleId = this.pickleIdByTestStepId.get(
        envelope.testStepFinished.testStepId
      )
      const testStepResultsByPickleId = this.testStepResultsByTestCaseStartedIdPickleStepId.get(
        envelope.testStepFinished.testCaseStartedId
      )
      console.log(
        `testCaseStartedId=${envelope.testStepFinished.testCaseStartedId}, pickleId=${pickleId}`
      )
      testStepResultsByPickleId.put(
        pickleId,
        envelope.testStepFinished.testStepResult
      )

      this.testStepResultsByPickleId.put(
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
   * @param testCaseStartedId
   * @param pickleStepIds
   */
  public getPickleStepTestStepResults(
    testCaseStartedId: string,
    pickleStepIds: string[]
  ): messages.ITestStepResult[] {
    if (pickleStepIds.length === 0) {
      return [
        new messages.TestStepResult({
          status: messages.TestStepResult.Status.SKIPPED,
          duration: TimeConversion.millisecondsToDuration(0),
        }),
      ]
    }
    const testStepResultsByPickleStepId = this.testStepResultsByTestCaseStartedIdPickleStepId.get(
      testCaseStartedId
    )

    return pickleStepIds.reduce(
      (testStepResults: messages.ITestStepResult[], pickleId) => {
        return testStepResults.concat(
          testStepResultsByPickleStepId.get(pickleId)
        )
      },
      []
    )
  }

  /**
   * Gets all the results for multiple pickle steps
   * @param pickleStepIds
   */
  public getPickleStepTestStepResultsOld(
    pickleStepIds: string[]
  ): messages.ITestStepResult[] {
    if (pickleStepIds.length === 0) {
      return [
        new messages.TestStepResult({
          status: messages.TestStepResult.Status.SKIPPED,
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
    pickleIds: string[]
  ): messages.ITestStepResult[] {
    if (pickleIds.length === 0) {
      return [
        new messages.TestStepResult({
          status: messages.TestStepResult.Status.UNDEFINED,
          duration: TimeConversion.millisecondsToDuration(0),
        }),
      ]
    }
    return pickleIds.reduce(
      (testStepResults: messages.ITestStepResult[], pickleId) => {
        return testStepResults.concat(
          this.testStepResultsByPickleId.get(pickleId)
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
    testStepResults: messages.ITestStepResult[]
  ): messages.ITestStepResult {
    return (
      testStepResults.sort((r1, r2) => r2.status - r1.status)[0] ||
      new messages.TestStepResult({
        status: messages.TestStepResult.Status.SKIPPED,
        duration: TimeConversion.millisecondsToDuration(0),
      })
    )
  }

  /**
   * Gets all the attachments for multiple pickle steps
   * @param pickleStepIds
   */
  public getPickleStepAttachments(
    pickleStepIds: string[]
  ): messages.IAttachment[] {
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
  ): messages.TestCase.TestStep.IStepMatchArgumentsList[] {
    return this.stepMatchArgumentsListsByPickleStepId.get(pickleStepId)
  }

  public getTestCaseStartedIds(pickleId: string): string[] {
    return this.testCaseStartedIdsByPickleId.get(pickleId)
  }
}
