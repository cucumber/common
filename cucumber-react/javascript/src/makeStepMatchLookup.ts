import { messages } from 'cucumber-messages'
import { StepMatchLookup } from './types'

export default (
  pickles: messages.IPickle[],
  testStepMatchedList: messages.ITestStepMatched[],
): StepMatchLookup => {

  const pickleById = new Map<string, messages.IPickle>()
  const testStepMatchesByUriAndLine = new Map<string, messages.ITestStepMatched[]>()

  for (const pickle of pickles) {
    pickleById.set(pickle.id, pickle)
  }

  for (const testStepMatched of testStepMatchedList) {
    const pickle = pickleById.get(testStepMatched.pickleId)
    const pickleStep = pickle.steps[testStepMatched.index]
    for (const location of pickleStep.locations) {
      const key = `${pickle.uri}:${location.line}`
      let testStepMatchedList = testStepMatchesByUriAndLine.get(key)
      if (testStepMatchedList === undefined) {
        testStepMatchedList = []
        testStepMatchesByUriAndLine.set(key, testStepMatchedList)
      }
      testStepMatchedList.push(testStepMatched)
    }
  }

  return (queryUri: string, queryLine: number) => {
    return testStepMatchesByUriAndLine.get(`${queryUri}:${queryLine}`) || []
  }
}
