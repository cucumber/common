import * as messages from '@cucumber/messages'
import IGherkinDocument = messages.GherkinDocument

import { Query as CucumberQuery } from '@cucumber/query'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import { getWorstTestStepResult } from '@cucumber/messages'

export default function getFeatureStatus(
  document: IGherkinDocument,
  cucumberQuery: CucumberQuery,
  gherkinQuery: GherkinQuery
): messages.TestStepResultStatus {
  return getWorstTestStepResult(
    cucumberQuery.getPickleTestStepResults(gherkinQuery.getPickleIds(document.uri))
  ).status
}
