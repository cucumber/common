import { Query as GherkinQuery } from '@cucumber/gherkin'
import { Query as CucumberQuery } from '@cucumber/query'
import { messages } from '@cucumber/messages'
import {
  GherkinDocumentWalker,
  rejectAllFilters,
} from '@cucumber/gherkin-utils'

function getPickleResult(
  pickle: messages.IPickle,
  cucumberQuery: CucumberQuery
): messages.TestStepFinished.TestStepResult.Status {
  const pickleStepIds = pickle.steps.map((step) => step.id)
  const pickleStepResults = cucumberQuery.getPickleStepTestStepResults(pickleStepIds)

  const stepResults = pickleStepResults.slice()
  const hookTestSteps = cucumberQuery.getBeforeHookSteps(pickle.id).concat(cucumberQuery.getAfterHookSteps(pickle.id))
  hookTestSteps.forEach(step => {
    const results = cucumberQuery.getTestStepResults(step.id)
    results.forEach(result => stepResults.push(result))
  })


  return cucumberQuery.getWorstTestStepResult(stepResults).status
}

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
          return statuses.includes(getPickleResult(pickle, cucumberQuery))
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
