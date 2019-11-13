import { messages } from 'cucumber-messages'
import {
  ParameterTypeRegistry
} from 'cucumber-expressions'
import uuidv4 from 'uuid/v4'

import Argument from 'cucumber-expressions/dist/src/Argument'
import CucumberExpression from 'cucumber-expressions/dist/src/CucumberExpression'

class FakeStepDefinition {
  public id: string
  public pattern: string
  public expression: CucumberExpression

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

class FakeMatch {
  public stepMatchArguments: Argument<any>[] = []
  public stepDefinitionId: string = ""

  public makeStepMatchArgumentMessages(): messages.StepMatchArgument[] {
    const stepMatchMessages: messages.StepMatchArgument[] = []
    this.stepMatchArguments.forEach(match => {
      const message = new messages.StepMatchArgument({
        group: match.group,
        parameterTypeName: match.parameterType.name
      })
      stepMatchMessages.push(message)
    })

    return stepMatchMessages
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
      return stepDefinition.asEnvelope(index * 3)
    })
  }

  public matchStep(step: string): FakeMatch {
    const fakeMatch = new FakeMatch()

    this.stepDefinitions.forEach(stepDefinition => {
      const match = stepDefinition.expression.match(step)
      if (match !== null) {
        fakeMatch.stepMatchArguments = match
        fakeMatch.stepDefinitionId = stepDefinition.id
      }
    })

    return fakeMatch
  }

  private generateStepDefinitions(): void {
    const statuses = ['passed', 'failed', 'pending', 'skipped', 'ambig', 'ambiguous']

    statuses.forEach(status => {
      this.stepDefinitions.push(new FakeStepDefinition(status))
    })
  }
}

export default FakeStepDefinitions