import { Query as GherkinQuery } from '@cucumber/gherkin'
import SupportCode from './SupportCode'
import TestPlan from './TestPlan'
import makePickleTestStep from './makePickleTestStep'
import ITestPlan from './ITestPlan'
import { MakeTestCase } from '.'
import makeHookTestStep from './makeHookTestStep'

export default function makeTestPlan(
  gherkinQuery: GherkinQuery,
  supportCode: SupportCode,
  makeTestCase: MakeTestCase
): ITestPlan {
  const pickles = gherkinQuery.getPickles()
  const testCases = pickles.map((pickle) =>
    makeTestCase(
      pickle,
      supportCode.stepDefinitions,
      supportCode.beforeHooks,
      supportCode.afterHooks,
      gherkinQuery,
      supportCode.newId,
      supportCode.clock,
      supportCode.makeErrorMessage,
      makePickleTestStep,
      makeHookTestStep
    )
  )

  return new TestPlan(testCases, supportCode)
}
