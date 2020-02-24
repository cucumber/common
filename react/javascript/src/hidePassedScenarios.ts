import { messages } from '@cucumber/messages'
import IGherkinDocument = messages.IGherkinDocument

import { Query } from '@cucumber/query'
import { GherkinQuery } from '@cucumber/gherkin'

export default function hidePassedScenarios(
    documents: IGherkinDocument[],
    testResultsQuery: Query,
    gherkinQuery: GherkinQuery
  ): IGherkinDocument[] {
    return documents.filter(
      document =>
        testResultsQuery.getWorstResult(
          testResultsQuery.getPickleResults(
            gherkinQuery.getPickleIds(document.uri)
          )
        ).status != messages.TestResult.Status.PASSED
    )
  }