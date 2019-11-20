import { messages } from 'cucumber-messages'
import StepDefinition from './StepDefinition'
import TestCase from './TestCase'
import TestStep from './TestStep'

export default function makeTestCase(
  pickle: messages.IPickle,
  stepDefinitions: StepDefinition[]
): TestCase {
  const pickleTestSteps = pickle.steps.map(pickleStep =>
    makePickleTestStep(pickleStep, stepDefinitions)
  )
  const testSteps = pickleTestSteps
  return new TestCase(testSteps, pickle.id)
}

function makePickleTestStep(
  pickleStep: messages.Pickle.IPickleStep,
  stepDefinitions: StepDefinition[]
): TestStep {
  const supportCodeExecutors = stepDefinitions
    .map(stepDefinition => stepDefinition.match(pickleStep.text))
    .filter(supportCodeExecutor => supportCodeExecutor !== null)
  return new TestStep(pickleStep.id, supportCodeExecutors)
}
