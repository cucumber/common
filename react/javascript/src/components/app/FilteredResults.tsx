import React, { useState } from 'react'
import UriContext from '../../UriContext'
import GherkinDocument from '../gherkin/GherkinDocument'
import GherkinQueryContext from '../../GherkinQueryContext'
import SearchBar from './SearchBar'

const FilteredResults: React.FunctionComponent = () => {
  const [query, setQuery] = useState('');
  const gherkinQuery = React.useContext(GherkinQueryContext)

  const matches = gherkinQuery
    .getGherkinDocuments()
    .filter(
      doc => query === '' || doc.feature.name.toLowerCase().includes(query.toLowerCase())
    )

  return (
      <div className="cucumber-filtered-results">
        <SearchBar queryUpdated={(query) => setQuery(query) } />
        { matches.map(doc => (
          <UriContext.Provider value={doc.uri}>
            <GherkinDocument gherkinDocument={doc} />
          </UriContext.Provider>
        ))}
      </div>
  )
}

export default FilteredResults