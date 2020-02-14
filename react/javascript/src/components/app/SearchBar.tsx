import React, { useState } from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface IProps {
  queryUpdated: (query: string) => any
}

const SearchBar: React.FunctionComponent<IProps> = ({ queryUpdated }) => {
  const [query, setQuery] = useState('')

  const updateQueryOnEnter = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      queryUpdated(query)
    }
  }

  return (
    <div className="cucumber-search-bar">
      <input
        type="text"
        onKeyPress={updateQueryOnEnter}
        onChange={event => setQuery(event.target.value)}
      />
      <button type="submit" onClick={() => queryUpdated(query)} value="search">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  )
}

export default SearchBar
