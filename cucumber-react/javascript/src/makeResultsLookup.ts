import { messages } from 'cucumber-messages'
import { ResultsLookup } from './types'
import { google } from 'cucumber-messages/dist/src/cucumber-messages'

// Unifying interface for both ITestStepFinished and ITestCaseFinished
interface IFinished {
  pickleId?: (string | null);
  timestamp?: (google.protobuf.ITimestamp | null);
  testResult?: (messages.ITestResult | null);
}

/**
 * Returns a function that can be used to look up results for a document uri
 * and an optional line number.
 *
 * @param pickles
 * @param testStepFinishedList
 * @param testCaseFinishedList
 */
export default function makeResultsLookup(
  pickles: messages.IPickle[],
  testStepFinishedList: messages.ITestStepFinished[],
  testCaseFinishedList: messages.ITestCaseFinished[],
): ResultsLookup {
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
    if (queryLine === null) {
      return testCaseFinishedListByUri.get(queryUri).sort((a, b) => {
        return b.testResult.status.valueOf() - a.testResult.status.valueOf()
      }).map(
        testCaseFinished => testCaseFinished.testResult,
      )
    }
    return finishedListByUriAndLine.get(
      `${queryUri}:${queryLine}`,
    ).map(
      finished => finished.testResult,
    )
  }
}
