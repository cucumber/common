import { messages } from 'cucumber-messages'
import uuidv4 from 'uuid/v4'
import SupportCodeExecutor from './SupportCodeExecutor'

export default class TestStep {
  public readonly id: string = uuidv4()

  constructor(
    private readonly pickleStepId: string,
    private readonly supportCodeExecutors: SupportCodeExecutor[]
  ) {}

  public toMessage(): messages.TestCase.ITestStep {
    return new messages.TestCase.TestStep({
      id: this.id,
      pickleStepId: this.pickleStepId,
      stepDefinitionId: this.supportCodeExecutors.map(
        supportCodeExecutor => supportCodeExecutor.stepDefinitionId
      ),
      stepMatchArguments:
        this.supportCodeExecutors.length !== 1
          ? null
          : this.supportCodeExecutors[0].argsToMessages(),
    })
  }

  public execute(): messages.ITestStepFinished {
    if (this.supportCodeExecutors.length === 0) {
      return new messages.TestStepFinished({
        testStepId: this.id,
        testResult: new messages.TestResult({
          status: messages.TestResult.Status.UNDEFINED,
        }),
      })
    }

    if (this.supportCodeExecutors.length > 1) {
      return new messages.TestStepFinished({
        testStepId: this.id,
        testResult: new messages.TestResult({
          status: messages.TestResult.Status.AMBIGUOUS,
        }),
      })
    }

    try {
      const result = this.supportCodeExecutors[0].execute()
      return new messages.TestStepFinished({
        testStepId: this.id,
        testResult: new messages.TestResult({
          status:
            result === 'pending'
              ? messages.TestResult.Status.PENDING
              : messages.TestResult.Status.PASSED,
        }),
      })
    } catch (error) {
      return new messages.TestStepFinished({
        testStepId: this.id,
        testResult: new messages.TestResult({
          status: messages.TestResult.Status.FAILED,
        }),
      })
    }
  }
}
