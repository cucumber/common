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

const resultsLookup = makeResultsLookup(pickles, testStepFinishedList, testCaseFinishedList)

describe('resultsLookup', () => {
  it('finds results for a step', () => {
    const result = resultsLookup('testdata/statuses.feature', 9)[0]
    assert.strictEqual(result.status, messages.TestResult.Status.FAILED)
  })

  it('finds results for a scenario', () => {
    const result = resultsLookup('testdata/statuses.feature', 5)[0]
    assert.strictEqual(result.status, messages.TestResult.Status.FAILED)
  })

  it('finds results for a passed example row', () => {
    const result = resultsLookup('testdata/statuses.feature', 24)[0]
    assert.strictEqual(result.status, messages.TestResult.Status.PASSED)
  })

  it('finds results for a failed example row', () => {
    const result = resultsLookup('testdata/statuses.feature', 25)[0]
    assert.strictEqual(result.status, messages.TestResult.Status.FAILED)
  })

  it('finds results for an ambiguous example row', () => {
    const result = resultsLookup('testdata/statuses.feature', 26)[0]
    assert.strictEqual(result.status, messages.TestResult.Status.AMBIGUOUS)
  })

  it('finds results for a whole file', () => {
    const result = resultsLookup('testdata/statuses.feature', null)[0]
    assert.strictEqual(result.status, messages.TestResult.Status.FAILED)
  })
})
