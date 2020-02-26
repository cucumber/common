import React, { useState } from 'react'
import GherkinQueryContext from '../../GherkinQueryContext'
import TestResultQueryContext from '../../CucumberQueryContext'
import SearchBar from './SearchBar'
import { GherkinDocumentList } from '../..'
import StatusFilterPassed from './StatusFilterPassed'

import hidePassedScenarios from '../../hidePassedScenarios'
import Search from '../../search/Search'


const FilteredResults: React.FunctionComponent = () => {
  const [query, setQuery] = useState('')
  const [hidePassed, setHidePassed] = useState(false)

  const gherkinQuery = React.useContext(GherkinQueryContext)
  const testResultsQuery = React.useContext(TestResultQueryContext)
  const allDocuments = gherkinQuery.getGherkinDocuments()
  const search = new Search()

  for (const gherkinDocument of allDocuments) {
    search.add(gherkinDocument)
  }

  let matches = query === '' ? allDocuments : search.search(query)
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
