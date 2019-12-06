import {
  CucumberExpression,
  RegularExpression,
  ParameterTypeRegistry,
} from 'cucumber-expressions'
import { ICucumberSupportCode, SupportCodeExecutor } from './support-code'
import { messages } from 'cucumber-messages'

export default function makeDummyStepDefinitions(supportCode: ICucumberSupportCode): messages.IEnvelope[] {
  const parameterTypeRegistry = new ParameterTypeRegistry()
  return [
    supportCode.registerStepDefinition(
      new CucumberExpression('a passed {word}', parameterTypeRegistry),
      new SupportCodeExecutor((thing: string) => undefined)
    ),
    supportCode.registerStepDefinition(
      new RegularExpression(/a passed step .*/, parameterTypeRegistry),
      new SupportCodeExecutor((thing: string) => undefined)
    ),
    supportCode.registerStepDefinition(
      new CucumberExpression(
        'I have {int} cukes/cucumbers in my {word}',
        parameterTypeRegistry
      ),
      new SupportCodeExecutor((count: number, container: string) => undefined)
    ),
    supportCode.registerStepDefinition(
      new CucumberExpression('a failed {word}', parameterTypeRegistry),
      new SupportCodeExecutor((thing: string) => {
        throw new Error(`This step failed. The thing was "${thing}"`)
      })
    ),
    supportCode.registerStepDefinition(
      new RegularExpression(/a failed step .*/, parameterTypeRegistry),
      new SupportCodeExecutor((thing: string) => {
        throw new Error(`This step failed. The thing was "${thing}"`)
      })
    ),
    supportCode.registerStepDefinition(
      new CucumberExpression('an ambiguou(s) {word}', parameterTypeRegistry),
      new SupportCodeExecutor((thing: string) => undefined)
    ),
    supportCode.registerStepDefinition(
      new CucumberExpression('an (a)mbiguous {word}', parameterTypeRegistry),
      new SupportCodeExecutor((thing: string) => undefined)
    )
  ].map(stepDefinition => new messages.Envelope({ stepDefinition }))
}
