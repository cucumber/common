import assert from 'assert'
import { stubObject } from "ts-sinon";
import { messages } from '@cucumber/messages'
import GherkinDocument = messages.GherkinDocument
import { Query } from '@cucumber/query'
import { GherkinQuery } from '@cucumber/gherkin'
import fs from 'fs'

import hidePassedScenarios from '../src/hidePassedScenarios'

function envelopes(ndjson: string): messages.IEnvelope[] {
    return ndjson.trim().split('\n')
      .map((json: string) => messages.Envelope.fromObject(JSON.parse(json)))
  }

describe('hidePassedScenarios', () => {
  it('returns an empty array if no documents are provided', () => {
    const testResultsQuery = new Query()
    const gherkinQuery = new GherkinQuery()

    assert.deepStrictEqual(
      hidePassedScenarios([], testResultsQuery, gherkinQuery),
      []
    )
  })

  it('keeps documents which do not have a passed status', () => {
    const document = new GherkinDocument()
    const testResultsQuery = stubObject<Query>(new Query());
    testResultsQuery.getWorstResult.returns(new messages.TestResult({
        status: messages.TestResult.Status.FAILED,
    }))
    testResultsQuery.getPickleResults.returns([])

    const gherkinQuery = stubObject<GherkinQuery>(new GherkinQuery());
    gherkinQuery.getPickleIds.returns([]);

    assert.deepStrictEqual(
      hidePassedScenarios([document], testResultsQuery, gherkinQuery),
      [document]
    )
  })

  it('removes documents which do have a passed status', () => {
    const document = new GherkinDocument()
    const testResultsQuery = stubObject<Query>(new Query());
    testResultsQuery.getWorstResult.returns(new messages.TestResult({
        status: messages.TestResult.Status.PASSED,
    }))
    testResultsQuery.getPickleResults.returns([])

    const gherkinQuery = stubObject<GherkinQuery>(new GherkinQuery());
    gherkinQuery.getPickleIds.returns([]);

    assert.deepStrictEqual(
      hidePassedScenarios([document], testResultsQuery, gherkinQuery),
      []
    )
  })

  it('can process multiple documents and statuses', () => {
    const documentList = fs.readFileSync(__dirname + '/../testdata/all.ndjson').toString()
    const messages = envelopes(documentList)
    const testResultsQuery = new Query()
    const gherkinQuery = new GherkinQuery();
    messages.map(message => {
        gherkinQuery.update(message)
        testResultsQuery.update(message);
    })

    const documents = messages
        .filter(message => message.gherkinDocument)
        .map(m => m.gherkinDocument)


    assert.deepStrictEqual(
      hidePassedScenarios(documents, testResultsQuery, gherkinQuery).map(document => document.uri),
      [
        "testdata/rules.feature",
        "testdata/test.feature",
        "testdata/escaped_pipes.feature",
        "testdata/statuses.feature"
      ]
    )
  })
})
