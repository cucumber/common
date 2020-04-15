export default interface IPredictableSupportCode {
  addPredictableBeforeHook(
    location: string,
    scenarioId: string,
    status: string,
    duration?: number,
    stack?: string
  ): void

  addPredictableAfterHook(
    location: string,
    scenarioId: string,
    status: string,
    duration?: number,
    stack?: string
  ): void

  addPredictableStepDefinition(
    location: string,
    stepId: string,
    status: string,
    duration?: number,
    stack?: string
  ): void
}
