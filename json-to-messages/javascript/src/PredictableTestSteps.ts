import { messages, TimeConversion } from '@cucumber/messages'
import { ITestStep, TestStep, IWorld, EnvelopeListener, DateClock } from '@cucumber/fake-cucumber'
import { PerfHooksStopwatch } from '@cucumber/fake-cucumber'

abstract class PredictableTestStep extends TestStep implements ITestStep {
  constructor(
    public readonly id: string,
    public readonly sourceId: string,
    public readonly alwaysExecute: boolean,
    private readonly status: messages.TestStepFinished.TestStepResult.Status,
    private readonly duration: number,
    private readonly errorMessage?: string
  ) {
    // TODO: Rather than injecting a PerfHooksStopwatch here we should inject one that uses duration.
    // That will also require a different API for measuring duration...
    super(id, sourceId, alwaysExecute, [], [], new DateClock(), new PerfHooksStopwatch(), null)
  }

  public async execute(
    _: IWorld,
    testCaseStartedId: string,
    listener: EnvelopeListener
  ): Promise<messages.TestStepFinished.ITestStepResult> {
    this.emitTestStepStarted(testCaseStartedId, listener)
    return this.emitTestStepFinished(
      testCaseStartedId,
      new messages.TestStepFinished.TestStepResult({
        duration: TimeConversion.millisecondsToDuration(this.duration),
        status: this.status,
        message: this.errorMessage,
      }),
      listener
    )
  }
}

export class PredictablePickleTestStep extends PredictableTestStep {
  constructor(
    public readonly id: string,
    public readonly sourceId: string,
    public readonly alwaysExecute: boolean,
    private readonly stepDefinitionId: string,
    status: messages.TestStepFinished.TestStepResult.Status,
    duration: number,
    errorMessage?: string
  ) {
    super(id, sourceId, alwaysExecute, status, duration, errorMessage)
  }

  public toMessage(): messages.TestCase.ITestStep {
    const stepDefinitionIds = this.stepDefinitionId ? [this.stepDefinitionId] : []

    return new messages.TestCase.TestStep({
      id: this.id,
      pickleStepId: this.sourceId,
      stepDefinitionIds,
    })
  }
}

export class PredictableHookTestStep extends PredictableTestStep {
  public toMessage(): messages.TestCase.ITestStep {
    const testStep = new messages.TestCase.TestStep({
      id: this.id,
      hookId: this.sourceId,
    })
    testStep.pickleStepId = undefined
    return testStep
  }
}
