import { HookType, IHook } from './IHook'
import ScenarioNameHook from './ScenarioNameHook'

export default function makeDummyStepDefinitions(): IHook[] {
  return [
    new ScenarioNameHook(HookType.Before, /passed before hook/, () => null),
    new ScenarioNameHook(HookType.Before, /failed before hook/, () => {
      throw new Error('Something went wrong in before hook')
    }),
    new ScenarioNameHook(HookType.After, /passed after hook/, () => null),
    new ScenarioNameHook(HookType.After, /failed after hook/, () => {
      throw new Error('Something went wrong in after hook')
    }),
  ]
}
