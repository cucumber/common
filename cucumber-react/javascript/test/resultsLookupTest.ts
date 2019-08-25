import { messages } from 'cucumber-messages'
import statuses from '../testdata/statuses.json'
import assert from 'assert'
import makeResultsLookup from '../src/makeResultsLookup'

const envelopes: messages.IEnvelope[] = statuses.map(e => messages.Envelope.fromObject(e))

const pickles: messages.IPickle[] = envelopes
  .filter(m => m.pickle)
  .map(m => m.pickle)

const testStepFinishedList: messages.ITestStepFinished[] = envelopes
  .filter(m => m.testStepFinished)
  .map(m => m.testStepFinished)

const testCaseFinishedList: messages.ITestStepFinished[] = envelopes
  .filter(m => m.testCaseFinished)
  .map(m => m.testCaseFinished)

describe('resultsLookup', () => {
  it('finds results for a step', () => {
    const resultsLookup = makeResultsLookup(pickles, testStepFinishedList, testCaseFinishedList)
    const result = resultsLookup('testdata/statuses.feature', 9)[0]
    assert.strictEqual(result.status, messages.TestResult.Status.FAILED)
  })

  it('finds results for a scenario', () => {
    const resultsLookup = makeResultsLookup(pickles, testStepFinishedList, testCaseFinishedList)
    const result = resultsLookup('testdata/statuses.feature', 5)[0]
    assert.strictEqual(result.status, messages.TestResult.Status.FAILED)
  })

  it('finds results for a whole file', () => {
    const resultsLookup = makeResultsLookup(pickles, testStepFinishedList, testCaseFinishedList)
    const results = resultsLookup('testdata/statuses.feature', null)
    assert.strictEqual(results[0].status, messages.TestResult.Status.FAILED)
  })
})
