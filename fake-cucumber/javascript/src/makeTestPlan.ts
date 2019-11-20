import TestPlan from './TestPlan'
import StepDefinition from './StepDefinition'
import { messages } from 'cucumber-messages'
import makeTestCase from './makeTestCase'

export default function makeTestPlan(
  pickles: messages.IPickle[],
  stepDefinitions: StepDefinition[]
): TestPlan {
  const testCases = pickles.map(pickle => makeTestCase(pickle, stepDefinitions))
  return new TestPlan(testCases)
}
