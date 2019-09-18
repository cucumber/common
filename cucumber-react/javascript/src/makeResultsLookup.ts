import { messages } from 'cucumber-messages'
import { ResultsLookup } from './types'
import { google } from 'cucumber-messages/dist/src/cucumber-messages'

// Unifying interface for both ITestStepFinished and ITestCaseFinished
interface IFinished {
  pickleId?: (string | null);
  timestamp?: (google.protobuf.ITimestamp | null);
  testResult?: (messages.ITestResult | null);
}

function sort(finishedList: IFinished[]): IFinished[] {
  return finishedList.sort((a, b) => {
    return b.testResult.status.valueOf() - a.testResult.status.valueOf()
  })
}

/**
 * Returns a function that can be used to look up results for a document uri
 * and an optional line number.
 *
 * This function will return a list of test results. That means, a step could have
 * multiple results. This happens for Background steps and Scenario Outline steps
 * because they are executed multiple times.
 *
 * There are different ways to render this. Rendering all the results can clutter up the UI,
 * so it's advisable to display an aggregate of all the results. This can be done easily since
 * the STATUS type is an enum which can be sorted by "severity".
 *
 * @param pickles
 * @param testStepFinishedList
 * @param testCaseFinishedList
 */
export default (
  pickles: messages.IPickle[],
  testStepFinishedList: messages.ITestStepFinished[],
  testCaseFinishedList: messages.ITestCaseFinished[],
): ResultsLookup => {
  const finishedListByUriAndLine = new Map<string, IFinished[]>()
  const testCaseFinishedListByUri = new Map<string, messages.ITestCaseFinished[]>()
  const pickleById = new Map<string, messages.IPickle>()

  for (const pickle of pickles) {
    const uri = pickle.uri
    pickleById.set(pickle.id, pickle)
    testCaseFinishedListByUri.set(uri, [])

    for (const location of pickle.locations) {
      finishedListByUriAndLine.set(`${uri}:${location.line}`, [])
    }
    for (const pickleStep of pickle.steps) {
      for (const location of pickleStep.locations) {
        finishedListByUriAndLine.set(`${uri}:${location.line}`, [])
      }
    }
  }

  for (const testStepFinished of testStepFinishedList) {
    const pickle = pickleById.get(testStepFinished.pickleId)
    const uri = pickle.uri
    const pickleStep = pickle.steps[testStepFinished.index]
    for (const location of pickleStep.locations) {
      finishedListByUriAndLine.get(
        `${uri}:${location.line}`,
      ).push(testStepFinished)
    }
  }

  for (const testCaseFinished of testCaseFinishedList) {
    const pickle = pickleById.get(testCaseFinished.pickleId)
    const uri = pickle.uri
    for (const location of pickle.locations) {
      finishedListByUriAndLine.get(
        `${uri}:${location.line}`,
      ).push(testCaseFinished)
    }
    testCaseFinishedListByUri.get(uri).push(testCaseFinished)
  }

  return (queryUri: string, queryLine?: number): messages.ITestResult[] => {
    const finishedList = queryLine === null ?
      testCaseFinishedListByUri.get(queryUri) :
      finishedListByUriAndLine.get(`${queryUri}:${queryLine}`)

    if (finishedList === undefined) return []
    return sort(finishedList).map(
      finished => finished.testResult,
    )
  }
}
