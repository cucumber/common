import { messages } from '@cucumber/messages'
import IGherkinDocument = messages.IGherkinDocument
import Query from '@cucumber/query'
import { Query as GherkinQuery } from '@cucumber/gherkin'
import getFeatureStatus from './getFeatureStatus'

export default function hidePassedScenarios(
  documents: IGherkinDocument[],
  testResultQuery: Query,
  gherkinQuery: GherkinQuery
): IGherkinDocument[] {
  return documents.filter(
    document =>
      getFeatureStatus(document, testResultQuery, gherkinQuery) !=
      messages.TestStepResult.Status.PASSED
  )
}
