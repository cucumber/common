import * as messages from '@cucumber/messages'
import { ArrayMultimap } from '@teppeis/multimaps'

export default class Query {
  private readonly testStepResultByPickleId = new ArrayMultimap<string, messages.TestStepResult>()
  private readonly testStepResultsByPickleStepId = new ArrayMultimap<
    string,
    messages.TestStepResult
  >()
  private readonly testStepById = new Map<string, messages.TestStep>()
  private readonly testCaseByPickleId = new Map<string, messages.TestCase>()
  private readonly pickleIdByTestStepId = new Map<string, string>()
  private readonly pickleStepIdByTestStepId = new Map<string, string>()
  private readonly testStepResultsbyTestStepId = new ArrayMultimap<
    string,
    messages.TestStepResult
  >()
  private readonly testStepIdsByPickleStepId = new ArrayMultimap<string, string>()
  private readonly hooksById = new Map<string, messages.Hook>()

  private readonly attachmentsByTestStepId = new ArrayMultimap<string, messages.Attachment>()

  private readonly stepMatchArgumentsListsByPickleStepId = new Map<
    string,
    readonly messages.StepMatchArgumentsList[]
  >()

  public update(envelope: messages.Envelope) {
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
    pickleStepIds: readonly string[]
  ): readonly messages.TestStepResult[] {
    if (pickleStepIds.length === 0) {
      return [
        {
          status: messages.TestStepResultStatus.UNKNOWN,
          duration: messages.TimeConversion.millisecondsToDuration(0),
          willBeRetried: false,
        },
      ]
    }
    return pickleStepIds.reduce((testStepResults: messages.TestStepResult[], pickleId) => {
      return testStepResults.concat(this.testStepResultsByPickleStepId.get(pickleId))
    }, [])
  }

  /**
   * Gets all the results for multiple pickles
   * @param pickleIds
   */
  public getPickleTestStepResults(
    pickleIds: readonly string[]
  ): readonly messages.TestStepResult[] {
    if (pickleIds.length === 0) {
      return [
        {
          status: messages.TestStepResultStatus.UNKNOWN,
          duration: messages.TimeConversion.millisecondsToDuration(0),
          willBeRetried: false,
        },
      ]
    }
    return pickleIds.reduce((testStepResults: messages.TestStepResult[], pickleId) => {
      return testStepResults.concat(this.testStepResultByPickleId.get(pickleId))
    }, [])
  }

  /**
   * Gets all the attachments for multiple pickle steps
   * @param pickleStepIds
   */
  public getPickleStepAttachments(
    pickleStepIds: readonly string[]
  ): readonly messages.Attachment[] {
    return this.getTestStepsAttachments(
      pickleStepIds.reduce((testStepIds: string[], pickleStepId: string) => {
        return testStepIds.concat(this.testStepIdsByPickleStepId.get(pickleStepId))
      }, [])
    )
  }

  public getTestStepsAttachments(testStepIds: readonly string[]): readonly messages.Attachment[] {
    return testStepIds.reduce((attachments: messages.Attachment[], testStepId) => {
      return attachments.concat(this.attachmentsByTestStepId.get(testStepId))
    }, [])
  }

  /**
   * Get StepMatchArguments for a pickle step
   * @param pickleStepId
   */
  public getStepMatchArgumentsLists(
    pickleStepId: string
  ): readonly messages.StepMatchArgumentsList[] | undefined {
    return this.stepMatchArgumentsListsByPickleStepId.get(pickleStepId)
  }

  public getHook(hookId: string): messages.Hook {
    return this.hooksById.get(hookId)
  }

  public getBeforeHookSteps(pickleId: string): readonly messages.TestStep[] {
    const hookSteps: messages.TestStep[] = []

    this.identifyHookSteps(
      pickleId,
      (hook) => hookSteps.push(hook),
      () => null
    )
    return hookSteps
  }

  public getAfterHookSteps(pickleId: string): readonly messages.TestStep[] {
    const hookSteps: messages.TestStep[] = []

    this.identifyHookSteps(
      pickleId,
      () => null,
      (hook) => hookSteps.push(hook)
    )
    return hookSteps
  }

  private identifyHookSteps(
    pickleId: string,
    onBeforeHookFound: (hook: messages.TestStep) => void,
    onAfterHookFound: (hook: messages.TestStep) => void
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

  public getTestStepResults(testStepId: string): messages.TestStepResult[] {
    return this.testStepResultsbyTestStepId.get(testStepId)
  }
}
