import StepDefinition from './StepDefinition'
import { CucumberExpression, ParameterTypeRegistry } from 'cucumber-expressions'

export default function makeDummyStepDefinitions(): StepDefinition[] {
  const parameterTypeRegistry = new ParameterTypeRegistry()
  return [
    new StepDefinition(
      new CucumberExpression('a passed {word}', parameterTypeRegistry),
      (thing: string) => undefined
    ),
    new StepDefinition(
      new CucumberExpression(
        'I have {int} cukes/cucumbers in my {word}',
        parameterTypeRegistry
      ),
      (count: number, container: string) => undefined
    ),
    new StepDefinition(
      new CucumberExpression('a failed {word}', parameterTypeRegistry),
      (thing: string) => {
        throw new Error(`This step failed. The thing was "${thing}"`)
      }
    ),
    new StepDefinition(
      new CucumberExpression('a pending {word}', parameterTypeRegistry),
      (thing: string) => {
        return 'pending'
      }
    ),
    new StepDefinition(
      new CucumberExpression('an ambiguou(s) {word}', parameterTypeRegistry),
      (thing: string) => undefined
    ),
    new StepDefinition(
      new CucumberExpression('an (a)mbiguous {word}', parameterTypeRegistry),
      (thing: string) => undefined
    ),
  ]
}
