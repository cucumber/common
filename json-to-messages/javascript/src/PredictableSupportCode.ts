import { SupportCode, ISupportCodeExecutor } from '@cucumber/fake-cucumber'
import IPredictableSupportCode from './IPredictableSupportCode'
import StepDefinition from './StepDefinition'
import {
  PassedCodeExecutor,
  PendingCodeExecutor,
  FailedCodeExecutor,
} from './SupportCodeExecutor'

import PredictableHook from './PredictableHook'
import { messages } from '@cucumber/messages'

export default class PredictableSupportCode implements IPredictableSupportCode {
  constructor(private readonly supportCode: SupportCode) {}

  public addPredictableBeforeHook(
    location: string,
    scenarioId: string,
    status: string,
    stack?: string
  ): void {
    const id = this.supportCode.newId()
    this.supportCode.registerBeforeHook(
      new PredictableHook(
        id,
        scenarioId,
        location,
        this.statusFromString(status),
        0,
        stack
      )
    )
  }

  public addPredictableAfterHook(
    location: string,
    scenarioId: string,
    status: string,
    stack?: string
  ): void {
    const id = this.supportCode.newId()

    this.supportCode.registerAfterHook(
      new PredictableHook(
        id,
        scenarioId,
        location,
        this.statusFromString(status),
        0,
        stack
      )
    )
  }

  public addPredictableStepDefinition(
    location: string,
    stepId: string,
    status: string,
    stack?: string
  ): void {
    const id = this.supportCode.newId()
    const locationChunks = location.split(':')
    let executor: ISupportCodeExecutor = null

    switch (status) {
      case 'passed': {
        executor = new PassedCodeExecutor(id)
        break
      }
      case 'pending': {
        executor = new PendingCodeExecutor(id)
        break
      }
      case 'failed': {
        executor = new FailedCodeExecutor(id, stack)
        break
      }
    }

    const stepDefinition = new StepDefinition(
      id,
      stepId,
      executor,
      locationChunks[0],
      parseInt(locationChunks[1])
    )
    this.supportCode.registerStepDefinition(stepDefinition)
  }

  private statusFromString(status: string): messages.TestStepResult.Status {
    switch (status) {
      case 'passed': {
        return messages.TestStepResult.Status.PASSED
      }
      case 'pending': {
        return messages.TestStepResult.Status.PENDING
      }
      case 'failed': {
        return messages.TestStepResult.Status.FAILED
      }
    }
  }
}
