import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import SupportCode from './SupportCode'
import TestPlan from './TestPlan'
import makePickleTestStep from './makePickleTestStep'
import { ITestPlan, MakeTestCase, RunOptions } from './types'
import makeHookTestStep from './makeHookTestStep'

export default function makeTestPlan(
  gherkinQuery: GherkinQuery,
  supportCode: SupportCode,
  runOptions: RunOptions,
  makeTestCase: MakeTestCase
): ITestPlan {
  const pickles = gherkinQuery.getPickles()
  const testCases = pickles.map((pickle) =>
    makeTestCase(
      pickle,
      supportCode.stepDefinitions,
      supportCode.beforeHooks,
      supportCode.afterHooks.slice().reverse(),
      gherkinQuery,
      supportCode.newId,
      supportCode.clock,
      supportCode.stopwatch,
      supportCode.makeErrorMessage,
      makePickleTestStep,
      makeHookTestStep
    )
  )

  return new TestPlan(testCases, supportCode, runOptions)
}
