import StepDefinitionRegistry from './StepDefinitionRegistry'
import StepDefinition from './StepDefinition'
import {
  CucumberExpression,
  RegularExpression,
  ParameterTypeRegistry,
} from 'cucumber-expressions'

export default function defaultStepDefinitionRegistry(): StepDefinitionRegistry {
  return new StepDefinitionRegistry([
    new StepDefinition(
      new CucumberExpression('a passed {word}', new ParameterTypeRegistry()),
      () => undefined
    ),
    new StepDefinition(
      new CucumberExpression('a failed {word}', new ParameterTypeRegistry()),
      () => {
        throw new Error('Nope')
      }
    ),
    new StepDefinition(
      new CucumberExpression('a pending {word}', new ParameterTypeRegistry()),
      () => 'pending'
    ),
    new StepDefinition(
      new CucumberExpression(
        'an ambiguous {word}',
        new ParameterTypeRegistry()
      ),
      () => undefined
    ),
    new StepDefinition(
      new CucumberExpression('an {word} step', new ParameterTypeRegistry()),
      () => undefined
    ),
    new StepDefinition(
      new CucumberExpression(
        'I have {int} cukes in my belly',
        new ParameterTypeRegistry()
      ),
      cukes => cukes
    ),
  ])
}
