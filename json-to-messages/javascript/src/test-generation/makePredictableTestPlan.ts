import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import { makeTestPlan, ITestPlan, SupportCode, RunOptions } from '@cucumber/fake-cucumber'
import makePredictableTestCase from './makePredictableTestCase'

export default function makePredictableTestPlan(
  gherkinQuery: GherkinQuery,
  supportCode: SupportCode,
  runOptions: RunOptions
): ITestPlan {
  return makeTestPlan(gherkinQuery, supportCode, runOptions, makePredictableTestCase)
}
