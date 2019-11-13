import { messages } from 'cucumber-messages'
import {
  CucumberExpression,
  ParameterTypeRegistry,
} from 'cucumber-expressions'
import uuidv4 from 'uuid/v4'

class FakeStepDefinition {
  public id: string
  public pattern: string
  public expression: any

  constructor(
    public status: string,
  ) {
    this.id = uuidv4()
    this.pattern = `{}${status}{}`
    this.expression = new CucumberExpression(this.pattern, new ParameterTypeRegistry)
  }

  public asEnvelope(line: number): messages.Envelope {
    return new messages.Envelope({
      stepDefinitionConfig: new messages.StepDefinitionConfig({
        id: this.id,
        pattern: new messages.StepDefinitionPattern({
          source: this.pattern,
        }),
        location: new messages.SourceReference({
          uri: `some/javascript/status-${this.status}.js`,
          location: new messages.Location({
            line
          })
        })
      })
    })
  }
}

class FakeStepDefinitions {
  public stepDefinitions: FakeStepDefinition[] = []

  constructor() {
    this.generateStepDefinitions()
  }

  public ids(): string[] {
    return this.stepDefinitions.map(sd => sd.id)
  }

  public makeMessages(): messages.Envelope[] {
    return this.stepDefinitions.map((stepDefinition, index) => {
      return stepDefinition.asEnvelope(index)
    })
  }

  private generateStepDefinitions(): void {
    const statuses = ['passed', 'failed', 'pending', 'skipped', 'ambig', 'ambiguous']

    statuses.forEach(status => {
      this.stepDefinitions.push(new FakeStepDefinition(status))
    })
  }
}

export default FakeStepDefinitions