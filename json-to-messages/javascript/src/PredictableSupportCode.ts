import { SupportCode, ISupportCodeExecutor } from '@cucumber/fake-cucumber'
import IPredictableSupportCode from './IPredictableSupportCode'
import StepDefinition from './StepDefinition'
import { IdGenerator } from '@cucumber/fake-cucumber/node_modules/@cucumber/messages'
import {
  PassedCodeExecutor,
  PendingCodeExecutor,
  FailedCodeExecutor,
} from './SupportCodeExecutor'
import Hook from './Hook'

export default class PredictableSupportCode extends SupportCode
  implements IPredictableSupportCode {
  addPredictableBeforeHook(
    location: string,
    scenarioId: string,
    stack?: string
  ): void {
    const id = IdGenerator.uuid()()

    this.registerBeforeHook(new Hook(id, scenarioId, location, stack))
  }

  addPredictableAfterHook(
    location: string,
    scenarioId: string,
    stack?: string
  ): void {
    const id = IdGenerator.uuid()()

    this.registerAfterHook(new Hook(id, scenarioId, location, stack))
  }

  addPredictableStepDefinition(
    location: string,
    stepId: string,
    status: string,
    stack?: string
  ): void {
    const id = IdGenerator.uuid()()
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
    this.registerStepDefinition(stepDefinition)
  }
}
