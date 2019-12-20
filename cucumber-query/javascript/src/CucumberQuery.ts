import { messages } from 'cucumber-messages'
import { GherkinQuery } from 'gherkin'

export default class CucumberQuery {
  private readonly testCaseStartedById = new Map<
    string,
    messages.ITestCaseStarted
  >()
  private readonly testCaseById = new Map<string, messages.ITestCase>()
  private readonly testStepById = new Map<string, messages.TestCase.ITestStep>()

  private readonly documentResultsByUri = new Map<
    string,
    messages.ITestResult[]
  >()
  private readonly stepMatchArgumentsListsByPickleStepId = new Map<
    string,
    messages.TestCase.TestStep.IStepMatchArgumentsList[]
  >()
  private readonly testResultsByPickleStepId = new Map<
    string,
    messages.ITestResult[]
  >()
  private readonly testResultByPickleId = new Map<
    string,
    messages.ITestResult
  >()

  public constructor(private readonly gherkinQuery: GherkinQuery) {}

  public getStepResults(
    uri: string,
    lineNumber: number
  ): messages.ITestResult[] {
    const pickleStepIds = this.gherkinQuery.getPickleIds(uri, lineNumber)
    return sortResultsBySeverity(
      pickleStepIds.reduce((r: messages.ITestResult[], pickleStepId) => {
        return r.concat(this.testResultsByPickleStepId.get(pickleStepId))
      }, [])
    )
  }

  public getScenarioResults(
    uri: string,
    lineNumber: number
  ): messages.ITestResult[] {
    const pickleIds = this.gherkinQuery.getPickleIds(uri, lineNumber)
    return sortResultsBySeverity(
      pickleIds.map(pickleId => this.testResultByPickleId.get(pickleId))
    )
  }

  public getStepMatchArgumentsLists(
    uri: string,
    lineNumber: number
  ): messages.TestCase.TestStep.IStepMatchArgumentsList[] {
    const pickleStepIds = this.gherkinQuery.getPickleIds(uri, lineNumber)
    if (pickleStepIds.length === 0) {
      // This can happen in a feature file with a Background, and no Scenarios, because
      // no pickles are generated in that case.
      return []
    }

    // Background steps will have a pickleStepId for each scenario. However, they
    // will be identical, so we just grab the first one
    const pickleStepId = pickleStepIds[0]
    const stepMatchArgumentsLists = this.stepMatchArgumentsListsByPickleStepId.get(
      pickleStepId
    )
    if (stepMatchArgumentsLists === undefined) {
      throw new Error(
        `No StepMatchArgumentsList for pickle step id ${pickleStepId}`
      )
    }
    return stepMatchArgumentsLists
  }

  public update(message: messages.IEnvelope): CucumberQuery {
    if (message.testCase) {
      this.testCaseById.set(message.testCase.id, message.testCase)
      this.testResultsByPickleStepId.set(message.testCase.pickleId, [])

      for (const testStep of message.testCase.testSteps) {
        this.testStepById.set(testStep.id, testStep)

        if (testStep.pickleStepId) {
          this.testResultsByPickleStepId.set(testStep.pickleStepId, [])
          this.stepMatchArgumentsListsByPickleStepId.set(
            testStep.pickleStepId,
            testStep.stepMatchArgumentsLists
          )
        } else if (testStep.hookId) {
          // Nothing to do
        }
      }
    }

    if (message.testCaseStarted) {
      this.testCaseStartedById.set(
        message.testCaseStarted.id,
        message.testCaseStarted
      )
    }

    if (message.testStepFinished) {
      const testStep = this.testStepById.get(
        message.testStepFinished.testStepId
      )
      if (testStep.pickleStepId) {
        this.testResultsByPickleStepId
          .get(testStep.pickleStepId)
          .push(message.testStepFinished.testResult)
      }
    }

    if (message.testCaseFinished) {
      const testCaseStarted = this.testCaseStartedById.get(
        message.testCaseFinished.testCaseStartedId
      )
      const testCase = this.testCaseById.get(testCaseStarted.testCaseId)

      if (testCase === undefined) {
        throw new Error(
          `Did not find a TestCase with id "${
            testCaseStarted.testCaseId
          }". Known ids:\n${Array.from(this.testCaseById.keys()).join('\n')}`
        )
      }
      const testStepResults = testCase.testSteps
        .map(testStep => testStep.pickleStepId)
        .reduce((r: messages.ITestResult[], pickleStepId) => {
          const items = this.testResultsByPickleStepId.get(pickleStepId)
          if (items === undefined) {
            throw new Error(`Nothing for pickle step id ${pickleStepId}`)
          }
          return r.concat(items)
        }, [])
      const testCaseResults = sortResultsBySeverity(testStepResults)
      this.testResultByPickleId.set(testCase.pickleId, testCaseResults[0])
    }

    return this
  }

  public getDocumentResults(uri: string): messages.ITestResult[] {
    const results = this.documentResultsByUri.get(uri) || []
    return results.sort((a, b) => b.status.valueOf() - a.status.valueOf())
  }
}

function sortResultsBySeverity(testStepResults: messages.ITestResult[]) {
  return testStepResults.sort((a, b) => b.status.valueOf() - a.status.valueOf())
}
