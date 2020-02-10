import React, { useState } from 'react'
import GherkinQueryContext from '../../GherkinQueryContext'
import SearchBar from './SearchBar'
import { GherkinDocumentList } from '../..'

const FilteredResults: React.FunctionComponent = () => {
  const [query, setQuery] = useState('')
  const gherkinQuery = React.useContext(GherkinQueryContext)

  const matches = gherkinQuery
    .getGherkinDocuments()
    .filter(
      doc =>
        query === '' ||
        doc.feature.name.toLowerCase().includes(query.toLowerCase())
    )

  return (
    <div className="cucumber-filtered-results">
      <SearchBar queryUpdated={query => setQuery(query)} />
      <GherkinDocumentList gherkinDocuments={matches} />
    </div>
  )
}

export default FilteredResults
