import { messages } from 'cucumber-messages'
import StepDefinition from './StepDefinition'

export default class StepDefinitionRegistry {
  constructor(
    private readonly stepDefinitions: StepDefinition[]
  ) {}

  public execute(text: string): messages.TestResult.Status {
    const matches = this.stepDefinitions
      .map(sd => sd.match(text))
      .filter(match => match !== null)

    if (matches.length === 0) {
      return messages.TestResult.Status.UNDEFINED
    }

    if (matches.length > 1) {
      return messages.TestResult.Status.AMBIGUOUS
    }

    return matches[0].execute()
  }
}