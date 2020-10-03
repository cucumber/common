import { messages } from '@cucumber/messages'
import IGherkinDocument = messages.IGherkinDocument
import { Query as CucumberQuery } from '@cucumber/query'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import getFeatureStatus from './getFeatureStatus'

export default function hidePassedScenarios(
  documents: readonly IGherkinDocument[],
  cucumberQuery: CucumberQuery,
  gherkinQuery: GherkinQuery
): readonly IGherkinDocument[] {
  return documents.filter(
    (document) =>
      getFeatureStatus(document, cucumberQuery, gherkinQuery) !=
      messages.TestStepFinished.TestStepResult.Status.PASSED
  )
}
