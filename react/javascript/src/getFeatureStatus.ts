import { messages } from '@cucumber/messages'
import IGherkinDocument = messages.IGherkinDocument

import { Query as CucumberQuery } from '@cucumber/query'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'

export default function getFeatureStatus(
  document: IGherkinDocument,
  cucumberQuery: CucumberQuery,
  gherkinQuery: GherkinQuery
): messages.TestStepFinished.TestStepResult.Status {
  return cucumberQuery.getWorstTestStepResult(
    cucumberQuery.getPickleTestStepResults(
      gherkinQuery.getPickleIds(document.uri)
    )
  ).status
}
