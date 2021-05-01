import React, { useState } from 'react'
import GherkinQueryContext from '../../GherkinQueryContext'
import CucumberQueryContext from '../../CucumberQueryContext'
import SearchQueryContext from '../../SearchQueryContext'

import SearchBar from './SearchBar'

import NoMatchResult from './NoMatchResult'
import Search from '../../search/Search'
import filterByStatus from '../../filter/filterByStatus'
import StatusesSummary from './StatusesSummary'
import countScenariosByStatuses from '../../countScenariosByStatuses'
import ExecutionSummary from './ExecutionSummary'
import EnvelopesQueryContext from '../../EnvelopesQueryContext'
import GherkinDocumentList from './GherkinDocumentList'
import * as messages from '@cucumber/messages'
import statuses from './statuses'

const FilteredResults: React.FunctionComponent = () => {
  const gherkinQuery = React.useContext(GherkinQueryContext)
  const cucumberQuery = React.useContext(CucumberQueryContext)
  const { query } = React.useContext(SearchQueryContext)
  const allDocuments = gherkinQuery.getGherkinDocuments()

  const scenarioCountByStatus = countScenariosByStatuses(allDocuments, gherkinQuery, cucumberQuery)

  const [displayedStatuses, setDisplayedStatuses] = useState<
    readonly messages.TestStepResultStatus[]
  >(statuses.filter((status) => scenarioCountByStatus.get(status)))

  const search = new Search(gherkinQuery)

  for (const gherkinDocument of allDocuments) {
    search.add(gherkinDocument)
  }

  const matches = query ? search.search(query) : allDocuments
  const filtered = matches
    .map((document) => filterByStatus(document, gherkinQuery, cucumberQuery, displayedStatuses))
    .filter((document) => document !== null)

  const envelopesQuery = React.useContext(EnvelopesQueryContext)
  const meta = envelopesQuery.find((envelope) => envelope.meta !== null).meta

  return (
    <div className="cucumber-filtered-results">
      <div className="cucumber-report-header">
        <StatusesSummary scenarioCountByStatus={scenarioCountByStatus} />
        <ExecutionSummary meta={meta} />
        <SearchBar
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
