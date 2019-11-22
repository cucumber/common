import { messages } from 'cucumber-messages'
import ExpressionStepDefinition from './ExpressionStepDefinition'
import TestCase from './TestCase'
import TestStep from './TestStep'
import IStepDefinition from './IStepDefinition'
import makePickleTestStep from './makePickleTestStep'

export default function makeTestCase(
  pickle: messages.IPickle,
  stepDefinitions: IStepDefinition[]
): TestCase {
  const pickleTestSteps = pickle.steps.map(pickleStep =>
    makePickleTestStep(pickleStep, stepDefinitions)
  )
  const testSteps = pickleTestSteps
  return new TestCase(testSteps, pickle.id)
}
