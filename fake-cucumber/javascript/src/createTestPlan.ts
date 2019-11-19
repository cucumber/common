import TestPlan from './TestPlan'
import StepDefinition from './StepDefinition'
import { messages } from 'cucumber-messages'
import TestCase from './TestCase'
import TestStep from './TestStep'

export default function createTestPlan(
  pickles: messages.IPickle[],
  stepDefinitions: StepDefinition[]
): TestPlan {
  const testCases = pickles.map(pickle =>
    createTestCase(pickle, stepDefinitions)
  )
  return new TestPlan(testCases)
}

function createTestCase(
  pickle: messages.IPickle,
  stepDefinitions: StepDefinition[]
): TestCase {
  const pickleTestSteps = pickle.steps.map(pickleStep =>
    createPickleTestStep(pickleStep, stepDefinitions)
  )
  const testSteps = pickleTestSteps
  return new TestCase(testSteps, pickle.id)
}

function createPickleTestStep(
  pickleStep: messages.Pickle.IPickleStep,
  stepDefinitions: StepDefinition[]
): TestStep {
  const supportCodeExecutors = stepDefinitions
    .map(stepDefinition => stepDefinition.match(pickleStep.text))
    .filter(supportCodeExecutor => supportCodeExecutor !== null)
  return new TestStep(pickleStep.id, supportCodeExecutors)
}
