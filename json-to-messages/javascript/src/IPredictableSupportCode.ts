export default interface IPredictableSupportCode {
  addPredictableBeforeHook(
    location: string,
    scenarioId: string,
    stack?: string
  ): void

  addPredictableAfterHook(
    location: string,
    scenarioId: string,
    stack?: string
  ): void

  addPredictableStepDefinition(
    location: string,
    stepId: string,
    status: string,
    stack?: string
  ): void
}
