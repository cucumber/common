import { Query as GherkinQuery } from '@cucumber/gherkin'
import { makeTestPlan, ITestPlan, SupportCode } from '@cucumber/fake-cucumber'
import makePredictableTestCase from './makePredictableTestCase'

export default function makePredictableTestPlan(
  gherkinQuery: GherkinQuery,
  supportCode: SupportCode
): ITestPlan {
  const testPlan = makeTestPlan(
    gherkinQuery,
    supportCode,
    makePredictableTestCase
  )
  console.log('-------------------------')
  console.log(testPlan)
  console.log('-------------------------')
  return testPlan
}
