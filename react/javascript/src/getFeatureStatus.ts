import { messages } from '@cucumber/messages'
import IGherkinDocument = messages.IGherkinDocument

import { Query } from '@cucumber/query'
import { Query as GherkinQuery } from '@cucumber/gherkin'

export default function getFeatureStatus(
  document: IGherkinDocument,
  testResultsQuery: Query,
  gherkinQuery: GherkinQuery
): messages.TestStepFinished.TestStepResult.Status {
  return testResultsQuery.getWorstTestStepResult(
    testResultsQuery.getPickleTestStepResults(
      gherkinQuery.getPickleIds(document.uri)
    )
  ).status
}
