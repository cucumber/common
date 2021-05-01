import assert from 'assert'
import * as messages from '@cucumber/messages'
import { Query } from '@cucumber/query'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import fs from 'fs'

import getFeatureStatus from '../src/getFeatureStatus'

function envelopesFrom(path: string): messages.Envelope[] {
  return fs
    .readFileSync(__dirname + '/' + path)
    .toString()
    .trim()
    .split('\n')
    .map((json: string) => JSON.parse(json))
}

function getGherkinDocument(envelopes: messages.Envelope[]): messages.GherkinDocument {
  return envelopes.find((envelope) => envelope.gherkinDocument).gherkinDocument
}

describe('getFeatureStatus', () => {
  let testResultsQuery: Query
  let gherkinQuery: GherkinQuery

  beforeEach(() => {
    testResultsQuery = new Query()
    gherkinQuery = new GherkinQuery()
  })

  function readEnvelopes(envelopes: messages.Envelope[]): void {
    envelopes.map((envelope) => {
      gherkinQuery.update(envelope)
      testResultsQuery.update(envelope)
    })
  }

  it('returns PASSED for a feature where all scenarios passed', () => {
    const envelopes = envelopesFrom(
      '../../../compatibility-kit/javascript/features/minimal/minimal.feature.ndjson'
    )
    const document = getGherkinDocument(envelopes)
    readEnvelopes(envelopes)

    assert.strictEqual(getFeatureStatus(document, testResultsQuery, gherkinQuery), 'PASSED')
  })

  it('returns the worst status for a feature with multiple scenarios', () => {
    const envelopes = envelopesFrom(
      '../../../compatibility-kit/javascript/features/stack-traces/stack-traces.feature.ndjson'
    )
    const document = getGherkinDocument(envelopes)
    readEnvelopes(envelopes)

    assert.strictEqual(getFeatureStatus(document, testResultsQuery, gherkinQuery), 'FAILED')
  })
})
