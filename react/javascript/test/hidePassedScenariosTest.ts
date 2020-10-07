import assert from 'assert'
import { stubObject } from 'ts-sinon'
import { IdGenerator, messages } from '@cucumber/messages'
import GherkinDocument = messages.GherkinDocument
import {
  Query as CucumberQuery,
  Query,
  QueryStream as CucumberQueryStream,
} from '@cucumber/query'
import { GherkinStreams } from '@cucumber/gherkin'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import fs from 'fs'

import hidePassedScenarios from '../src/hidePassedScenarios'
import { runCucumber, SupportCode } from '@cucumber/fake-cucumber'
import { glob } from 'glob'

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
    const testResultsQuery = stubObject<Query>(new Query())
    testResultsQuery.getWorstTestStepResult.returns(
      new messages.TestStepFinished.TestStepResult({
        status: messages.TestStepFinished.TestStepResult.Status.FAILED,
      })
    )
    testResultsQuery.getPickleTestStepResults.returns([])

    const gherkinQuery = stubObject<GherkinQuery>(new GherkinQuery())
    gherkinQuery.getPickleIds.returns([])

    assert.deepStrictEqual(
      hidePassedScenarios([document], testResultsQuery, gherkinQuery),
      [document]
    )
  })

  it('removes documents which do have a passed status', () => {
    const document = new GherkinDocument()
    const testResultsQuery = stubObject<Query>(new Query())
    testResultsQuery.getWorstTestStepResult.returns(
      new messages.TestStepFinished.TestStepResult({
        status: messages.TestStepFinished.TestStepResult.Status.PASSED,
      })
    )
    testResultsQuery.getPickleTestStepResults.returns([])

    const gherkinQuery = stubObject<GherkinQuery>(new GherkinQuery())
    gherkinQuery.getPickleIds.returns([])

    assert.deepStrictEqual(
      hidePassedScenarios([document], testResultsQuery, gherkinQuery),
      []
    )
  })

  it('can process multiple documents and statuses', async () => {
    const supportCode = new SupportCode()
    // Make one of the scenarios pass so it's filtered out
    supportCode.defineStepDefinition(
      messages.SourceReference.create({
        uri: __filename,
        location: { column: 1, line: 1 },
      }),
      'I have {int} cukes in my belly',
      function (cukeCount: number) {
        assert(cukeCount)
      }
    )

    const featureFiles = glob
      .sync('../../compatibility-kit/javascript/features/**/*.feature')
      .sort()
    const gherkinStream = GherkinStreams.fromPaths(featureFiles, {
      newId: IdGenerator.incrementing(),
      createReadStream(filePath: string) {
        return fs.createReadStream(filePath, { encoding: 'utf-8' })
      },
    })
    const gherkinQuery = new GherkinQuery()
    const cucumberQuery = new CucumberQuery()

    const cucumberQueryStream = new CucumberQueryStream(cucumberQuery)
    await runCucumber(
      supportCode,
      gherkinStream,
      gherkinQuery,
      cucumberQueryStream
    )

    const gherkinDocuments = gherkinQuery.getGherkinDocuments()

    const expectedFeatureFiles = featureFiles.filter(
      (path) =>
        path !==
        '../../compatibility-kit/javascript/features/minimal/minimal.feature'
    )
    assert.notDeepStrictEqual(featureFiles, expectedFeatureFiles)
    assert.deepStrictEqual(
      hidePassedScenarios(gherkinDocuments, cucumberQuery, gherkinQuery)
        .map((document) => document.uri)
        .sort(),
      expectedFeatureFiles
    )
  })
})
