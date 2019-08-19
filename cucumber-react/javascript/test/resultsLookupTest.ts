import { messages } from 'cucumber-messages'
import statuses from '../testdata/statuses.json'
import assert from 'assert'
import makeResultsLookup from '../src/makeResultsLookup'

describe('resultsLookup', () => {
  it('finds results for a line', () => {
    const pickles: messages.IPickle[] = statuses
      .filter(m => m.pickle)
      .map(m => messages.Pickle.fromObject(m.pickle))

    const testStepFinishedList: messages.ITestStepFinished[] = statuses
      .filter(m => m.testStepFinished)
      .map(m => messages.TestStepFinished.fromObject(m.testStepFinished))

    const resultsLookup = makeResultsLookup(pickles, testStepFinishedList)
    const result = resultsLookup('testdata/statuses.feature', 7)[0]
    assert.strictEqual(result.status, messages.TestResult.Status.FAILED)
  })
})
