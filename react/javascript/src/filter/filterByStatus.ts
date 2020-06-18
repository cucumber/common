import { Query as GherkinQuery } from '@cucumber/gherkin'
import { Query as CucumberQuery } from '@cucumber/query'
import { messages } from '@cucumber/messages'
import {
  GherkinDocumentWalker,
  rejectAllFilters,
} from '@cucumber/gherkin-utils'

export default function filterByStatus(
  gherkinDocument: messages.IGherkinDocument,
  gherkinQuery: GherkinQuery,
  cucumberQuery: CucumberQuery,
  statuses: messages.TestStepFinished.TestStepResult.Status[]
): messages.IGherkinDocument {
  const pickles = gherkinQuery.getPickles()
  const filters = {
    acceptScenario: (scenario: messages.GherkinDocument.Feature.IScenario) => {
      const pickleIds = gherkinQuery.getPickleIds(
        gherkinDocument.uri,
        scenario.id
      )

      return pickles
        .filter((pickle) => pickleIds.includes(pickle.id))
        .map((pickle) => {
          const pickleStatus = cucumberQuery.getWorstTestStepResult(
            cucumberQuery.getPickleStepTestStepResults(
              pickle.steps.map((step) => step.id)
            )
          ).status

          return statuses.includes(pickleStatus)
        })
        .includes(true)
    },
  }

  const walker = new GherkinDocumentWalker({
    ...rejectAllFilters,
    ...filters,
  })

  return walker.walkGherkinDocument(gherkinDocument)
}
