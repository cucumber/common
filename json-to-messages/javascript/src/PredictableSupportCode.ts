import { SupportCode, ISupportCodeExecutor } from '@cucumber/fake-cucumber'
import IPredictableSupportCode from './IPredictableSupportCode'
import StepDefinition from './StepDefinition'
import {
  PassedCodeExecutor,
  PendingCodeExecutor,
  FailedCodeExecutor,
} from './SupportCodeExecutor'
import Hook from './Hook'

export default class PredictableSupportCode implements IPredictableSupportCode {
  constructor(private readonly supportCode: SupportCode) {}

  addPredictableBeforeHook(
    location: string,
    scenarioId: string,
    stack?: string
  ): void {
    const id = this.supportCode.newId()

    this.supportCode.registerBeforeHook(
      new Hook(id, scenarioId, location, stack)
    )
  }

  addPredictableAfterHook(
    location: string,
    scenarioId: string,
    stack?: string
  ): void {
    const id = this.supportCode.newId()

    this.supportCode.registerAfterHook(
      new Hook(id, scenarioId, location, stack)
    )
  }

  addPredictableStepDefinition(
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
}
