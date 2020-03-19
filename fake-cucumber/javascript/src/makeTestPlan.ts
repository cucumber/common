import { Query as GherkinQuery } from '@cucumber/gherkin'
import SupportCode from './SupportCode'
import makeTestCase from './makeTestCase'
import TestPlan from './TestPlan'

export default function makeTestPlan(
  gherkinQuery: GherkinQuery,
  supportCode: SupportCode
) {
  const pickles = gherkinQuery.getPickles()
  const testCases = pickles.map(pickle =>
    makeTestCase(
      pickle,
      supportCode.stepDefinitions,
      supportCode.beforeHooks,
      supportCode.afterHooks,
      gherkinQuery,
      supportCode.newId,
      supportCode.clock,
      supportCode.makeErrorMessage
    )
  )

  return new TestPlan(testCases, supportCode)
}
