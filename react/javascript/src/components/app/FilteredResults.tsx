import React, { useState } from 'react'
import GherkinQueryContext from '../../GherkinQueryContext'
import TestResultQueryContext from '../../CucumberQueryContext'
import SearchBar from './SearchBar'
import { GherkinDocumentList } from '../..'
import StatusFilterPassed from './StatusFilterPassed'

import hidePassedScenarios from '../../hidePassedScenarios'

const FilteredResults: React.FunctionComponent = () => {
  const [query, setQuery] = useState('')
  const [hidePassed, setHidePassed] = useState(false)

  const gherkinQuery = React.useContext(GherkinQueryContext)
  const testResultsQuery = React.useContext(TestResultQueryContext)

  let matches = gherkinQuery
    .getGherkinDocuments()
    .filter(
      doc =>
        query === '' ||
        doc.feature.name.toLowerCase().includes(query.toLowerCase())
    )

  if (hidePassed) {
    matches = hidePassedScenarios(matches, testResultsQuery, gherkinQuery)
  }

  return (
    <div className="cucumber-filtered-results">
      <SearchBar queryUpdated={query => setQuery(query)} />
      <StatusFilterPassed
        statusQueryUpdated={hidePassed => setHidePassed(hidePassed)}
      />
      <GherkinDocumentList gherkinDocuments={matches} />
    </div>
  )
}

export default FilteredResults
