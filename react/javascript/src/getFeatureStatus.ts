import { messages } from '@cucumber/messages'
import IGherkinDocument = messages.IGherkinDocument

import { Query } from '@cucumber/query'
import { GherkinQuery } from '@cucumber/gherkin'

export default function getFeatureStatus(
  document: IGherkinDocument,
  testResultsQuery: Query,
  gherkinQuery: GherkinQuery
): messages.TestResult.Status {
  return testResultsQuery.getWorstResult(
    testResultsQuery.getPickleResults(gherkinQuery.getPickleIds(document.uri))
  ).status
}
