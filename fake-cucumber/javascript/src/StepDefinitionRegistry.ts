import { messages } from 'cucumber-messages'
import StepDefinition from './StepDefinition'
import uuidv4 from 'uuid/v4'
import TestStep from './TestStep'

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

  public executeTestStep(
    testStep: messages.TestCase.ITestStep
  ): messages.ITestStepFinished {
    if (testStep.stepDefinitionId.length === 0) {
      return new messages.TestStepFinished({
        testStepId: testStep.id,
        testResult: new messages.TestResult({
          status: messages.TestResult.Status.UNDEFINED,
        }),
      })
    }

    if (testStep.stepDefinitionId.length > 1) {
      return new messages.TestStepFinished({
        testStepId: testStep.id,
        testResult: new messages.TestResult({
          status: messages.TestResult.Status.AMBIGUOUS,
        }),
      })
    }

    throw new Error("Can't execute yet")
  }

  public createTestStep(
    text: string,
    pickleStepId: string
  ): TestStep {
    const supportCodeExecutors = this.stepDefinitions
      .map(stepDefinition => stepDefinition.match(text))
      .filter(supportCodeExecutor => supportCodeExecutor !== null)

    return new TestStep(pickleStepId, supportCodeExecutors)
  }

  public computeTestStep(
    text: string,
    pickleStepId: string
  ): messages.TestCase.ITestStep {
    throw new Error("Not anymore")

    const matchingStepDefinitions = this.stepDefinitions.filter(
      sd => sd.match(text) !== null
    )

    const supportCodeExecutors = this.stepDefinitions
      .map(stepDefinition => stepDefinition.match(text))
      .filter(supportCodeExecutor => supportCodeExecutor !== null)

    return new messages.TestCase.TestStep({
      id: uuidv4(),
      pickleStepId,
      stepDefinitionId: supportCodeExecutors.map(
        supportCodeExecutor => supportCodeExecutor.stepDefinitionId
      ),
      stepMatchArguments:
        matchingStepDefinitions.length !== 1
          ? null
          : matchingStepDefinitions[0].getArguments(text).map(arg => {
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
