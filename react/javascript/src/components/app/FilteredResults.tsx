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
import { TimeConversion } from '@cucumber/messages'

export const FilteredResults: React.FunctionComponent = () => {
  const envelopesQuery = React.useContext(EnvelopesQueryContext)
  const gherkinQuery = React.useContext(GherkinQueryContext)
  const cucumberQuery = React.useContext(CucumberQueryContext)
  const { query, hideStatuses } = React.useContext(SearchQueryContext)
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

  const startDate: Date = new Date(
    TimeConversion.timestampToMillisecondsSinceEpoch(
      envelopesQuery.find((envelope) => !!envelope.testRunStarted)?.testRunStarted.timestamp
    )
  )
  const finishDate: Date = new Date(
    TimeConversion.timestampToMillisecondsSinceEpoch(
      envelopesQuery.find((envelope) => !!envelope.testRunFinished)?.testRunFinished.timestamp
    )
  )

  const meta = envelopesQuery.find((envelope) => envelope.meta !== null).meta

  return (
    <div className="cucumber">
      <StatusesSummary
        scenarioCountByStatus={scenarioCountByStatus}
        totalScenarioCount={totalScenarioCount}
      />
      <ExecutionSummary
        scenarioCountByStatus={scenarioCountByStatus}
        totalScenarioCount={totalScenarioCount}
        startDate={startDate}
        finishDate={finishDate}
        meta={meta}
      />
      <SearchBar statusesWithScenarios={statusesWithScenarios} />
      <GherkinDocumentList gherkinDocuments={filtered} preExpand={true} />
      <NoMatchResult query={query} matches={filtered} />
    </div>
  )
}
