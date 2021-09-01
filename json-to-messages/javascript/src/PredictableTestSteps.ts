import * as messages from '@cucumber/messages'
import {
  DateClock,
  EnvelopeListener,
  ITestStep,
  IWorld,
  PerfHooksStopwatch,
  TestStep,
} from '@cucumber/fake-cucumber'

abstract class PredictableTestStep extends TestStep implements ITestStep {
  constructor(
    public readonly id: string,
    public readonly sourceId: string,
    public readonly alwaysExecute: boolean,
    private readonly status: messages.TestStepResultStatus,
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
  ): Promise<messages.TestStepResult> {
    this.emitTestStepStarted(testCaseStartedId, listener)
    return this.emitTestStepFinished(
      testCaseStartedId,
      {
        duration: messages.TimeConversion.millisecondsToDuration(this.duration),
        status: this.status,
        message: this.errorMessage,
      },
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
    status: messages.TestStepResultStatus,
    duration: number,
    errorMessage?: string
  ) {
    super(id, sourceId, alwaysExecute, status, duration, errorMessage)
  }

  public toMessage(): messages.TestStep {
    const stepDefinitionIds = this.stepDefinitionId ? [this.stepDefinitionId] : []

    return {
      id: this.id,
      pickleStepId: this.sourceId,
      stepDefinitionIds: stepDefinitionIds,
    }
  }
}

export class PredictableHookTestStep extends PredictableTestStep {
  public toMessage(): messages.TestStep {
    return {
      id: this.id,
      hookId: this.sourceId,
    }
  }
}
