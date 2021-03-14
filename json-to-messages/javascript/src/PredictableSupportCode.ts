import { SupportCode } from '@cucumber/fake-cucumber'
import IPredictableSupportCode from './IPredictableSupportCode'

import PredictableHook from './PredictableHook'
import PredictableStepDefinition from './PredictableStepDefinition'

export default class PredictableSupportCode implements IPredictableSupportCode {
  constructor(private readonly supportCode: SupportCode) {}

  public addPredictableBeforeHook(
    location: string,
    scenarioId: string,
    status: string,
    duration?: number,
    stack?: string
  ): void {
    const id = this.supportCode.newId()
    this.supportCode.registerBeforeHook(
      new PredictableHook(
        id,
        scenarioId,
        location,
        this.statusFromString(status),
        duration || 0,
        stack
      )
    )
  }

  public addPredictableAfterHook(
    location: string,
    scenarioId: string,
    status: string,
    duration?: number,
    stack?: string
  ): void {
    const id = this.supportCode.newId()

    this.supportCode.registerAfterHook(
      new PredictableHook(
        id,
        scenarioId,
        location,
        this.statusFromString(status),
        duration || 0,
        stack
      )
    )
  }

  public addPredictableStepDefinition(
    location: string,
    stepId: string,
    status: string,
    duration?: number,
    stack?: string
  ): void {
    const id = this.supportCode.newId()
    this.supportCode.registerStepDefinition(
      new PredictableStepDefinition(
        id,
        stepId,
        location,
        this.statusFromString(status),
        duration || 0,
        stack
      )
    )
  }

  private statusFromString(
    status: string
  ): 'UNKNOWN' | 'PASSED' | 'SKIPPED' | 'PENDING' | 'UNDEFINED' | 'AMBIGUOUS' | 'FAILED' {
    // @ts-ignore
    return status.toUpperCase()
  }
}
