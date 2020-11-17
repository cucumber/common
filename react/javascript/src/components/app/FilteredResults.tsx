import React, { useState } from 'react'
import GherkinQueryContext from '../../GherkinQueryContext'
import CucumberQueryContext from '../../CucumberQueryContext'

import SearchBar from './SearchBar'
import { GherkinDocumentList } from '../../index'

import NoMatchResult from './NoMatchResult'
import Search from '../../search/Search'
import { messages } from '@cucumber/messages'
import filterByStatus from '../../filter/filterByStatus'
import StatusesSummary from './StatusesSummary'
import countScenariosByStatuses from '../../countScenariosByStatuses'
import ExecutionSummary from './ExecutionSummary'
import EnvelopesQueryContext from '../../EnvelopesQueryContext'

const defaultDisplayedResults = [
  messages.TestStepFinished.TestStepResult.Status.AMBIGUOUS,
  messages.TestStepFinished.TestStepResult.Status.FAILED,
  messages.TestStepFinished.TestStepResult.Status.PASSED,
  messages.TestStepFinished.TestStepResult.Status.PENDING,
  messages.TestStepFinished.TestStepResult.Status.SKIPPED,
  messages.TestStepFinished.TestStepResult.Status.UNDEFINED,
]

const FilteredResults: React.FunctionComponent = () => {
  const gherkinQuery = React.useContext(GherkinQueryContext)
  const cucumberQuery = React.useContext(CucumberQueryContext)
  const allDocuments = gherkinQuery.getGherkinDocuments()

  const [query, setQuery] = useState('')
  const scenarioCountByStatus = countScenariosByStatuses(
    allDocuments,
    gherkinQuery,
    cucumberQuery
  )

  const [displayedStatuses, setDisplayedStatuses] = useState(
    defaultDisplayedResults.filter((status) =>
      scenarioCountByStatus.get(status)
    )
  )

  const search = new Search(gherkinQuery)

  for (const gherkinDocument of allDocuments) {
    search.add(gherkinDocument)
  }

  const matches = query === '' ? allDocuments : search.search(query)
  const filtered = matches
    .map((document) =>
      filterByStatus(document, gherkinQuery, cucumberQuery, displayedStatuses)
    )
    .filter((document) => document !== null)

  const envelopesQuery = React.useContext(EnvelopesQueryContext)
  const meta = envelopesQuery.find((envelope) => envelope.meta !== null).meta

  return (
    <div className="cucumber-filtered-results">
      <div className="cucumber-report-header">
        <StatusesSummary scenarioCountByStatus={scenarioCountByStatus} />
        <ExecutionSummary meta={meta} />
        <SearchBar
          queryUpdated={(query) => setQuery(query)}
          statusesUpdated={(statuses) => setDisplayedStatuses(statuses)}
          enabledStatuses={displayedStatuses}
          scenarioCountByStatus={scenarioCountByStatus}
        />
      </div>
      <GherkinDocumentList gherkinDocuments={filtered} />
      <NoMatchResult query={query} matches={filtered} />
    </div>
  )
}

export default FilteredResults
