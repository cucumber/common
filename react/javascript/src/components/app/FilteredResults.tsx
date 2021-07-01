import React from 'react'
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
import statuses from './statuses'

const FilteredResults: React.FunctionComponent = () => {
  const gherkinQuery = React.useContext(GherkinQueryContext)
  const cucumberQuery = React.useContext(CucumberQueryContext)
  const { query, onlyShowStatuses } = React.useContext(SearchQueryContext)
  const allDocuments = gherkinQuery.getGherkinDocuments()

  const scenarioCountByStatus = countScenariosByStatuses(allDocuments, gherkinQuery, cucumberQuery)

  const search = new Search(gherkinQuery)

  for (const gherkinDocument of allDocuments) {
    search.add(gherkinDocument)
  }

  const matches = query ? search.search(query) : allDocuments
  const filtered = matches
    .map((document) =>
      filterByStatus(document, gherkinQuery, cucumberQuery, onlyShowStatuses ?? statuses)
    )
    .filter((document) => document !== null)

  const envelopesQuery = React.useContext(EnvelopesQueryContext)
  const meta = envelopesQuery.find((envelope) => envelope.meta !== null).meta
  const statusesWithScenarios = [...scenarioCountByStatus.keys()]

  return (
    <div className="cucumber-filtered-results">
      <div className="cucumber-report-header">
        <StatusesSummary scenarioCountByStatus={scenarioCountByStatus} />
        <ExecutionSummary meta={meta} />
        <SearchBar statusesWithScenarios={statusesWithScenarios} />
      </div>
      <GherkinDocumentList gherkinDocuments={filtered} preExpand={true} />
      <NoMatchResult query={query} matches={filtered} />
    </div>
  )
}

export default FilteredResults
