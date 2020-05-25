import React, { useState } from 'react'
import GherkinQueryContext from '../../GherkinQueryContext'

import SearchBar from './SearchBar'
import { GherkinDocumentList } from '../..'

import Search from '../../search/Search'
import NoMatchResult from './NoMatchResult'

const FilteredResults: React.FunctionComponent = () => {
  const [query, setQuery] = useState('')

  const gherkinQuery = React.useContext(GherkinQueryContext)
  const allDocuments = gherkinQuery.getGherkinDocuments()
  const search = new Search()

  for (const gherkinDocument of allDocuments) {
    search.add(gherkinDocument)
  }

  const matches = query === '' ? allDocuments : search.search(query)

  return (
    <div className="cucumber-filtered-results">
      <SearchBar queryUpdated={(query) => setQuery(query)} />
      <GherkinDocumentList gherkinDocuments={matches} />
      <NoMatchResult query={query} matches={matches} />
    </div>
  )
}

export default FilteredResults
