import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import { Query as CucumberQuery } from '@cucumber/query'
import { messages } from '@cucumber/messages'
import { GherkinDocumentWalker } from '@cucumber/gherkin-utils'

export default function countScenariosByStatuses(
  gherkinDocuments: readonly messages.IGherkinDocument[],
  gherkinQuery: GherkinQuery,
  cucumberQuery: CucumberQuery
): Map<messages.TestStepFinished.TestStepResult.Status, number> {
  const statuses = new Map<
    messages.TestStepFinished.TestStepResult.Status,
    number
  >()

  for (const gherkinDocument of gherkinDocuments) {
    const counter = new GherkinDocumentWalker(
      {},
      {
        handleScenario: (scenario) => {
          const pickleIds = gherkinQuery.getPickleIds(
            gherkinDocument.uri,
            scenario.id
          )

          pickleIds.forEach((pickleId) => {
            const status = cucumberQuery.getWorstTestStepResult(
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
