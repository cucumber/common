import assert from 'assert'
import * as messages from '@cucumber/messages'
import { Query as CucumberQuery, Query } from '@cucumber/query'
import { GherkinStreams } from '@cucumber/gherkin-streams'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'

import hidePassedScenarios from '../src/hidePassedScenarios'
import { runCucumber, SupportCode } from '@cucumber/fake-cucumber'
import { glob } from 'glob'
import CucumberQueryStream from './CucumberQueryStream'

describe('hidePassedScenarios', () => {
  it('returns an empty array if no documents are provided', () => {
    const testResultsQuery = new Query()
    const gherkinQuery = new GherkinQuery()

    assert.deepStrictEqual(hidePassedScenarios([], testResultsQuery, gherkinQuery), [])
  })

  it('can process multiple documents and statuses', async () => {
    const supportCode = new SupportCode()
    // Make one of the scenarios pass so it's filtered out
    supportCode.defineStepDefinition(
      {
        uri: __filename,
        location: { column: 1, line: 1 },
      },
      'I have {int} cukes in my belly',
      function (cukeCount: number) {
        assert(cukeCount)
      }
    )

    const featureFiles = glob
      .sync('../../compatibility-kit/javascript/features/**/*.feature')
      .sort()
    const gherkinStream = GherkinStreams.fromPaths(featureFiles, {
      newId: messages.IdGenerator.incrementing(),
    })
    const gherkinQuery = new GherkinQuery()
    const cucumberQuery = new CucumberQuery()

    const cucumberQueryStream = new CucumberQueryStream(cucumberQuery)
    await runCucumber(supportCode, gherkinStream, gherkinQuery, cucumberQueryStream)

    const gherkinDocuments = gherkinQuery.getGherkinDocuments()

    const expectedFeatureFiles = featureFiles.filter(
      (path) => path !== '../../compatibility-kit/javascript/features/minimal/minimal.feature'
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
