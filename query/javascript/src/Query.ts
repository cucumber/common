import { messages, TimeConversion } from '@cucumber/messages'
import { ArrayMultimap } from '@teppeis/multimaps'

export default class Query {
  private readonly testStepResultByPickleId = new ArrayMultimap<
    string,
    messages.TestStepFinished.ITestStepResult
  >()
  private readonly testStepResultsByPickleStepId = new ArrayMultimap<
    string,
    messages.TestStepFinished.ITestStepResult
  >()
  private readonly testStepById = new Map<string, messages.TestCase.ITestStep>()
  private readonly testCaseByPickleId = new Map<string, messages.ITestCase>()
  private readonly pickleIdByTestStepId = new Map<string, string>()
  private readonly pickleStepIdByTestStepId = new Map<string, string>()
  private readonly testStepResultsbyTestStepId = new ArrayMultimap<
    string,
    messages.TestStepFinished.ITestStepResult
  >()
  private readonly testStepIdsByPickleStepId = new ArrayMultimap<string, string>()
  private readonly hooksById = new Map<string, messages.IHook>()

  private readonly attachmentsByTestStepId = new ArrayMultimap<string, messages.IAttachment>()

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
        this.testStepIdsByPickleStepId.put(testStep.pickleStepId, testStep.id)
        this.stepMatchArgumentsListsByPickleStepId.set(
          testStep.pickleStepId,
          testStep.stepMatchArgumentsLists
        )
      }
    }

    if (envelope.testStepFinished) {
      const pickleId = this.pickleIdByTestStepId.get(envelope.testStepFinished.testStepId)
      this.testStepResultByPickleId.put(pickleId, envelope.testStepFinished.testStepResult)

      const testStep = this.testStepById.get(envelope.testStepFinished.testStepId)
      this.testStepResultsByPickleStepId.put(
        testStep.pickleStepId,
        envelope.testStepFinished.testStepResult
      )
      this.testStepResultsbyTestStepId.put(testStep.id, envelope.testStepFinished.testStepResult)
    }

    if (envelope.hook) {
      this.hooksById.set(envelope.hook.id, envelope.hook)
    }

    if (envelope.attachment) {
      this.attachmentsByTestStepId.put(envelope.attachment.testStepId, envelope.attachment)
    }
  }

  /**
   * Gets all the results for multiple pickle steps
   * @param pickleStepIds
   */
  public getPickleStepTestStepResults(
    pickleStepIds: ReadonlyArray<string>
  ): ReadonlyArray<messages.TestStepFinished.ITestStepResult> {
    if (pickleStepIds.length === 0) {
      return [
        new messages.TestStepFinished.TestStepResult({
          status: messages.TestStepFinished.TestStepResult.Status.UNKNOWN,
          duration: TimeConversion.millisecondsToDuration(0),
        }),
      ]
    }
    return pickleStepIds.reduce(
      (testStepResults: messages.TestStepFinished.ITestStepResult[], pickleId) => {
        return testStepResults.concat(this.testStepResultsByPickleStepId.get(pickleId))
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
  ): ReadonlyArray<messages.TestStepFinished.ITestStepResult> {
    if (pickleIds.length === 0) {
      return [
        new messages.TestStepFinished.TestStepResult({
          status: messages.TestStepFinished.TestStepResult.Status.UNKNOWN,
          duration: TimeConversion.millisecondsToDuration(0),
        }),
      ]
    }
    return pickleIds.reduce(
      (testStepResults: messages.TestStepFinished.ITestStepResult[], pickleId) => {
        return testStepResults.concat(this.testStepResultByPickleId.get(pickleId))
      },
      []
    )
  }

  /**
   * Gets the worst result
   * @param testStepResults
   */
  public getWorstTestStepResult(
    testStepResults: ReadonlyArray<messages.TestStepFinished.ITestStepResult>
  ): messages.TestStepFinished.ITestStepResult {
    return (
      testStepResults.slice().sort((r1, r2) => r2.status - r1.status)[0] ||
      new messages.TestStepFinished.TestStepResult({
        status: messages.TestStepFinished.TestStepResult.Status.UNKNOWN,
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
    return this.getTestStepsAttachments(
      pickleStepIds.reduce((testStepIds: string[], pickleStepId: string) => {
        return testStepIds.concat(this.testStepIdsByPickleStepId.get(pickleStepId))
      }, [])
    )
  }

  public getTestStepsAttachments(
    testStepIds: ReadonlyArray<string>
  ): ReadonlyArray<messages.IAttachment> {
    return testStepIds.reduce((attachments: messages.IAttachment[], testStepId) => {
      return attachments.concat(this.attachmentsByTestStepId.get(testStepId))
    }, [])
  }

  /**
   * Get StepMatchArguments for a pickle step
   * @param pickleStepId
   */
  public getStepMatchArgumentsLists(
    pickleStepId: string
  ): ReadonlyArray<messages.TestCase.TestStep.IStepMatchArgumentsList> | undefined {
    return this.stepMatchArgumentsListsByPickleStepId.get(pickleStepId)
  }

  public getHook(hookId: string): messages.IHook {
    return this.hooksById.get(hookId)
  }

  public getBeforeHookSteps(pickleId: string): ReadonlyArray<messages.TestCase.ITestStep> {
    const hookSteps: messages.TestCase.ITestStep[] = []

    this.identifyHookSteps(
      pickleId,
      (hook) => hookSteps.push(hook),
      () => null
    )
    return hookSteps
  }

  public getAfterHookSteps(pickleId: string): ReadonlyArray<messages.TestCase.ITestStep> {
    const hookSteps: messages.TestCase.ITestStep[] = []

    this.identifyHookSteps(
      pickleId,
      () => null,
      (hook) => hookSteps.push(hook)
    )
    return hookSteps
  }

  private identifyHookSteps(
    pickleId: string,
    onBeforeHookFound: (hook: messages.TestCase.ITestStep) => void,
    onAfterHookFound: (hook: messages.TestCase.ITestStep) => void
  ): void {
    const testCase = this.testCaseByPickleId.get(pickleId)

    if (!testCase) {
      return
    }

    let pickleStepFound = false

    for (const step of testCase.testSteps) {
      if (step.hookId) {
        pickleStepFound ? onAfterHookFound(step) : onBeforeHookFound(step)
      } else {
        pickleStepFound = true
      }
    }
  }

  public getTestStepResults(testStepId: string): messages.TestStepFinished.ITestStepResult[] {
    return this.testStepResultsbyTestStepId.get(testStepId)
  }
}
