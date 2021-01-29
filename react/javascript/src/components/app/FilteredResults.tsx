import React from 'react'
import GherkinQueryContext from '../../GherkinQueryContext'
import CucumberQueryContext from '../../CucumberQueryContext'
import SearchQueryContext, {RenderSearchURLFn} from '../../SearchQueryContext'
import statusName, {allStatuses} from '../gherkin/statusName'

import SearchBar from './SearchBar'
import { GherkinDocumentList } from '../../index'

import NoMatchResult from './NoMatchResult'
import Search from '../../search/Search'
import filterByStatus from '../../filter/filterByStatus'
import StatusesSummary from './StatusesSummary'
import countScenariosByStatuses from '../../countScenariosByStatuses'
import ExecutionSummary from './ExecutionSummary'
import EnvelopesQueryContext from '../../EnvelopesQueryContext'

interface IProps {
  renderSearchURL?: RenderSearchURLFn
}

const FilteredResults: React.FunctionComponent<IProps> = ({renderSearchURL}) => {
  const gherkinQuery = React.useContext(GherkinQueryContext)
  const cucumberQuery = React.useContext(CucumberQueryContext)
  const { query, hiddenStatuses } = React.useContext(SearchQueryContext)
  const allDocuments = gherkinQuery.getGherkinDocuments()

  const scenarioCountByStatus = countScenariosByStatuses(
    allDocuments,
    gherkinQuery,
    cucumberQuery
  )

  const search = new Search(gherkinQuery)

  for (const gherkinDocument of allDocuments) {
    search.add(gherkinDocument)
  }

  const matches = query ? search.search(query) : allDocuments
  const filtered = matches
    .map((document) =>
      filterByStatus(document, gherkinQuery, cucumberQuery, allStatuses.filter((status) =>
        !hiddenStatuses.includes(statusName(status))
      ))
    )
    .filter((document) => document !== null)

  const envelopesQuery = React.useContext(EnvelopesQueryContext)
  const meta = envelopesQuery.find((envelope) => envelope.meta !== null).meta
  const statusesWithScenarios = [...scenarioCountByStatus.keys()].map(statusName)

  return (
    <div className="cucumber-filtered-results">
      <div className="cucumber-report-header">
        <StatusesSummary scenarioCountByStatus={scenarioCountByStatus}/>
        <ExecutionSummary meta={meta} />
        <SearchBar statusesWithScenarios={statusesWithScenarios} renderSearchURL={renderSearchURL}/>
      </div>
      <GherkinDocumentList gherkinDocuments={filtered} />
      <NoMatchResult query={query} matches={filtered} />
    </div>
  )
}

export default FilteredResults
