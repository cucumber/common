import { Query as GherkinQuery } from '@cucumber/gherkin'
import { makeTestPlan, ITestPlan, SupportCode } from '@cucumber/fake-cucumber'
import makePredictableTestCase from './makePredictableTestCase'

export default function makePredictableTestPlan(
  gherkinQuery: GherkinQuery,
  supportCode: SupportCode
): ITestPlan {
  return makeTestPlan(gherkinQuery, supportCode, makePredictableTestCase)
}
