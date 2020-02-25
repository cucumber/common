import assert from 'assert'
import { messages } from '@cucumber/messages'
import { Query } from '@cucumber/query'
import { GherkinQuery } from '@cucumber/gherkin'
import fs from 'fs'

import getFeatureStatus from '../src/getFeatureStatus'

function pathToEnvelopes(path: string): messages.IEnvelope[] {
  return fs
    .readFileSync(__dirname + '/' + path)
    .toString()
    .trim()
    .split('\n')
    .map((json: string) => messages.Envelope.fromObject(JSON.parse(json)))
}

function getGherkinDocument(
  envelopes: messages.IEnvelope[]
): messages.IGherkinDocument {
  return envelopes.find(envelope => envelope.gherkinDocument).gherkinDocument
}

describe('getFeatureStatus', () => {
  let testResultsQuery: Query
  let gherkinQuery: GherkinQuery

  beforeEach(() => {
    testResultsQuery = new Query()
    gherkinQuery = new GherkinQuery()
  })

  function readEnvelopes(envelopes: messages.IEnvelope[]): void {
    envelopes.map(envelope => {
      gherkinQuery.update(envelope)
      testResultsQuery.update(envelope)
    })
  }

  it('returns PASSED for a feature where all scenarios passed', () => {
    const envelopes = pathToEnvelopes('../testdata/parameter_types.ndjson')
    const document = getGherkinDocument(envelopes)
    readEnvelopes(envelopes)

    assert.equal(
      getFeatureStatus(document, testResultsQuery, gherkinQuery),
      messages.TestResult.Status.PASSED
    )
  })

  it('returns the worst status for a feature with multiple scenarios', () => {
    const envelopes = pathToEnvelopes('../testdata/statuses.ndjson')
    const document = getGherkinDocument(envelopes)
    readEnvelopes(envelopes)

    assert.equal(
      getFeatureStatus(document, testResultsQuery, gherkinQuery),
      messages.TestResult.Status.FAILED
    )
  })
})
