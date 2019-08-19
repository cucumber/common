import { messages } from 'cucumber-messages'
import { ResultsLookup } from './types'

export default function makeResultsLookup(
  pickles: messages.IPickle[],
  testStepFinishedList: messages.ITestStepFinished[]
): ResultsLookup {
  const testStepFinishedsByUriAndLine = new Map<
    string,
    messages.ITestStepFinished[]
  >()
  const pickleById = new Map<string, messages.IPickle>()

  for (const pickle of pickles) {
    const uri = pickle.uri
    pickleById.set(pickle.id, pickle)
    for (const pickleStep of pickle.steps) {
      for (const stepLocation of pickleStep.locations) {
        testStepFinishedsByUriAndLine.set(`${uri}:${stepLocation.line}`, [])
      }
    }
  }

  for (const testStepFinished of testStepFinishedList) {
    const pickle = pickleById.get(testStepFinished.pickleId)
    const uri = pickle.uri
    const pickleStep = pickle.steps[testStepFinished.index]
    for (const location of pickleStep.locations) {
      const testStepFinisheds = testStepFinishedsByUriAndLine.get(
        `${uri}:${location.line}`
      )
      testStepFinisheds.push(testStepFinished)
    }
  }

  return (queryUri: string, queryLine: number) => {
    const testStepFinisheds = testStepFinishedsByUriAndLine.get(
      `${queryUri}:${queryLine}`
    )
    return testStepFinisheds.map(
      testStepFinished => testStepFinished.testResult
    )
  }
}
