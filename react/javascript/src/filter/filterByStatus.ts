import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import { Query as CucumberQuery } from '@cucumber/query'
import * as messages from '@cucumber/messages'
import { GherkinDocumentWalker, rejectAllFilters } from '@cucumber/gherkin-utils'

export default function filterByStatus(
  gherkinDocument: messages.GherkinDocument,
  gherkinQuery: GherkinQuery,
  cucumberQuery: CucumberQuery,
  statuses: readonly (
    | 'UNKNOWN'
    | 'PASSED'
    | 'SKIPPED'
    | 'PENDING'
    | 'UNDEFINED'
    | 'AMBIGUOUS'
    | 'FAILED'
  )[]
): messages.GherkinDocument | null {
  const filters = {
    acceptScenario: (scenario: messages.Scenario) => {
      const pickleIds = gherkinQuery.getPickleIds(gherkinDocument.uri, scenario.id)

      return pickleIds
        .map((pickleId) =>
          statuses.includes(
            cucumberQuery.getWorstTestStepResult(cucumberQuery.getPickleTestStepResults([pickleId]))
              .status
          )
        )
        .includes(true)
    },
  }

  const walker = new GherkinDocumentWalker({
    ...rejectAllFilters,
    ...filters,
  })

  return walker.walkGherkinDocument(gherkinDocument)
}
