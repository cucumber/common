import Match from './Match'

export default class StepDefinition {
  constructor (
    private readonly expression: string
  ) {}

  public match(text: string): Match {
    return null
  }
}
