import { messages } from 'cucumber-messages'
import StepDefinition from './StepDefinition'
import uuidv4 from 'uuid/v4'

export default class StepDefinitionRegistry {
  constructor(private readonly stepDefinitions: StepDefinition[]) {}

  public execute(text: string): messages.TestResult.Status {
    const matches = this.stepDefinitions
      .map(sd => sd.match(text))
      .filter(supportCodeExecutor => supportCodeExecutor !== null)

    if (matches.length === 0) {
      return messages.TestResult.Status.UNDEFINED
    }

    if (matches.length > 1) {
      return messages.TestResult.Status.AMBIGUOUS
    }

    matches[0].execute()
    return messages.TestResult.Status.PASSED
  }

  public computeTestStep(
    pickleStep: messages.Pickle.IPickleStep
  ): messages.TestCase.ITestStep {
    const matchingStepDefinitions = this.stepDefinitions.filter(
      sd => sd.match(pickleStep.text) !== null
    )

    const supportCodeExecutors = this.stepDefinitions
      .map(stepDefinition => stepDefinition.match(pickleStep.text))
      .filter(supportCodeExecutor => supportCodeExecutor !== null)

    return new messages.TestCase.TestStep({
      id: uuidv4(),
      pickleStepId: pickleStep.id,
      stepDefinitionId: supportCodeExecutors.map(
        supportCodeExecutor => supportCodeExecutor.stepDefinitionId
      ),
      stepMatchArguments:
        matchingStepDefinitions.length !== 1
          ? null
          : matchingStepDefinitions[0]
              .getArguments(pickleStep.text)
              .map(arg => {
                return new messages.StepMatchArgument({
                  // TODO: add recursive transformation.
                  group: arg.group,
                  parameterTypeName: arg.parameterType.name,
                })
              }),
    })
  }

  public toMessages(): messages.IEnvelope[] {
    return this.stepDefinitions.map(
      stepdef =>
        new messages.Envelope({
          stepDefinitionConfig: stepdef.toMessage(),
        })
    )
  }
}
