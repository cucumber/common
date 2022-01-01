import React from 'react'
import GherkinQueryContext from '../../GherkinQueryContext'
import CucumberQueryContext from '../../CucumberQueryContext'
import SearchQueryContext from '../../SearchQueryContext'

import { SearchBar } from './SearchBar'
import { NoMatchResult } from './NoMatchResult'
import { StatusesSummary } from './StatusesSummary'
import { GherkinDocumentList } from './GherkinDocumentList'

import Search from '../../search/Search'
import filterByStatus from '../../filter/filterByStatus'
import countScenariosByStatuses from '../../countScenariosByStatuses'
import { ExecutionSummary } from './ExecutionSummary'
import EnvelopesQueryContext from '../../EnvelopesQueryContext'
import statuses from './statuses'
import styles from './FilteredResults.module.scss'

export const FilteredResults: React.FunctionComponent = () => {
  const envelopesQuery = React.useContext(EnvelopesQueryContext)
  const gherkinQuery = React.useContext(GherkinQueryContext)
  const cucumberQuery = React.useContext(CucumberQueryContext)
  const { query, hideStatuses, update } = React.useContext(SearchQueryContext)
  const allDocuments = gherkinQuery.getGherkinDocuments()

  const scenarioCountByStatus = countScenariosByStatuses(allDocuments, gherkinQuery, cucumberQuery)
  const totalScenarioCount = [...scenarioCountByStatus.values()].reduce(
    (prev, curr) => prev + curr,
    0
  )

  const search = new Search(gherkinQuery)

  for (const gherkinDocument of allDocuments) {
    search.add(gherkinDocument)
  }

  const onlyShowStatuses = statuses.filter((s) => !hideStatuses.includes(s))

  const matches = query ? search.search(query) : allDocuments
  const filtered = matches
    .map((document) => filterByStatus(document, gherkinQuery, cucumberQuery, onlyShowStatuses))
    .filter((document) => document !== null)

  const statusesWithScenarios = [...scenarioCountByStatus.keys()]

  const testRunStarted = envelopesQuery.find(
    (envelope) => !!envelope.testRunStarted
  )?.testRunStarted
  const testRunFinished = envelopesQuery.find(
    (envelope) => !!envelope.testRunFinished
  )?.testRunFinished
  const meta = envelopesQuery.find((envelope) => envelope.meta !== null).meta

  return (
    <div className="cucumber">
      <div className={styles.reportHeader}>
        <StatusesSummary
          scenarioCountByStatus={scenarioCountByStatus}
          totalScenarioCount={totalScenarioCount}
        />
        <ExecutionSummary
          scenarioCountByStatus={scenarioCountByStatus}
          totalScenarioCount={totalScenarioCount}
          testRunStarted={testRunStarted}
          testRunFinished={testRunFinished}
          meta={meta}
        />
        <SearchBar
          query={query}
          onSearch={(query) => update({ query })}
          statusesWithScenarios={statusesWithScenarios}
          hideStatuses={hideStatuses}
          onFilter={(hideStatuses) => update({ hideStatuses })}
        />
      </div>

      {filtered.length > 0 && <GherkinDocumentList gherkinDocuments={filtered} preExpand={true} />}
      {filtered.length < 1 && <NoMatchResult query={query} />}
    </div>
  )
}
