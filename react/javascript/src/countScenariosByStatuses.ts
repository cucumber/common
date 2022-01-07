import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import { Query as CucumberQuery } from '@cucumber/query'
import { GherkinDocumentWalker } from '@cucumber/gherkin-utils'
import { getWorstTestStepResult, TestStepResultStatus } from '@cucumber/messages'

export default function countScenariosByStatuses(
  gherkinQuery: GherkinQuery,
  cucumberQuery: CucumberQuery
): {
  scenarioCountByStatus: Map<TestStepResultStatus, number>
  statusesWithScenarios: readonly TestStepResultStatus[]
  totalScenarioCount: number
} {
  const scenarioCountByStatus = new Map<TestStepResultStatus, number>()

  for (const gherkinDocument of gherkinQuery.getGherkinDocuments()) {
    const counter = new GherkinDocumentWalker(
      {},
      {
        handleScenario: (scenario) => {
          const pickleIds = gherkinQuery.getPickleIds(gherkinDocument.uri, scenario.id)

          pickleIds.forEach((pickleId) => {
            const status = getWorstTestStepResult(
              cucumberQuery.getPickleTestStepResults([pickleId])
            ).status

            if (scenarioCountByStatus.has(status)) {
              scenarioCountByStatus.set(status, scenarioCountByStatus.get(status) + 1)
            } else {
              scenarioCountByStatus.set(status, 1)
            }
          })
        },
      }
    )
    counter.walkGherkinDocument(gherkinDocument)
  }

  const statusesWithScenarios = [...scenarioCountByStatus.keys()]

  const totalScenarioCount = [...scenarioCountByStatus.values()].reduce(
    (prev, curr) => prev + curr,
    0
  )

  return { scenarioCountByStatus, statusesWithScenarios, totalScenarioCount }
}
