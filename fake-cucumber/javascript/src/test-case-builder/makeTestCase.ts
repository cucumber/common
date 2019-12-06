import { messages } from 'cucumber-messages'
import ITestCase from './ITestCase'
import TestCase from './TestCase'
import { ICucumberSupportCode } from '../support-code'

import ITestStep from './ITestStep'
import PickleTestStep from './PickleTestStep'
import HookTestStep from './HookTestStep'

export default function makeTestCase(
  pickle: messages.IPickle,
  supportCode: ICucumberSupportCode
): ITestCase {
  const pickleTags = pickle.tags ? pickle.tags.map(tag => tag.name) : []

  const beforeHookSteps = supportCode
    .findBeforeHooks(pickleTags)
    .map(hookId => new HookTestStep(supportCode, hookId))

  const pickleSteps = pickle.steps.map(
    pickleStep => new PickleTestStep(supportCode, pickleStep)
  )

  const afterHookSteps = supportCode
    .findAfterHooks(pickleTags)
    .map(hookId => new HookTestStep(supportCode, hookId))

  const steps: ITestStep[] = []
    .concat(beforeHookSteps)
    .concat(pickleSteps)
    .concat(afterHookSteps)

  return new TestCase(steps, pickle.id)
}
