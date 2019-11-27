import { HookType, IHook } from './IHook'
import Hook from './Hook'

export default function makeDummyStepDefinitions(): IHook[] {
  return [
    new Hook(HookType.Before, '@before-passed', () => null),
    new Hook(HookType.Before, '@before-failed', () => {
      throw new Error('Something went wrong in before hook')
    }),
    new Hook(HookType.After, '@after-passed', () => null),
    new Hook(HookType.After, '@after-failed', () => {
      throw new Error('Something went wrong in after hook')
    }),
  ]
}
