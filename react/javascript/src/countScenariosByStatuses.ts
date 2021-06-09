import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import { Query as CucumberQuery } from '@cucumber/query'
import * as messages from '@cucumber/messages'
import { GherkinDocumentWalker } from '@cucumber/gherkin-utils'
import { getWorstTestStepResult } from '@cucumber/messages'

export default function countScenariosByStatuses(
  gherkinDocuments: readonly messages.GherkinDocument[],
  gherkinQuery: GherkinQuery,
  cucumberQuery: CucumberQuery
): Map<messages.TestStepResultStatus, number> {
  const statuses = new Map<messages.TestStepResultStatus, number>()

  for (const gherkinDocument of gherkinDocuments) {
    const counter = new GherkinDocumentWalker(
      {},
      {
        handleScenario: (scenario) => {
          const pickleIds = gherkinQuery.getPickleIds(gherkinDocument.uri, scenario.id)

          pickleIds.forEach((pickleId) => {
            const status = getWorstTestStepResult(
              cucumberQuery.getPickleTestStepResults([pickleId])
            ).status

            if (statuses.has(status)) {
              statuses.set(status, statuses.get(status) + 1)
            } else {
              statuses.set(status, 1)
            }
          })
        },
      }
    )
    counter.walkGherkinDocument(gherkinDocument)
  }

  return statuses
}
