import React from 'react'
import { faSearch, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SearchQueryContext from '../../SearchQueryContext'

interface IProps {
  queryUpdated: (query: string) => any
}

const SearchBar: React.FunctionComponent<IProps> = ({ queryUpdated }) => {
  const searchQueryContext = React.useContext(SearchQueryContext)

  const updateQueryOnEnter = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      queryUpdated(searchQueryContext.query)
    }
  }

  return (
    <div className="cucumber-search-bar">
      <input
        type="text"
        placeholder="Some text or @tags"
        onKeyPress={updateQueryOnEnter}
        onChange={(event) => (searchQueryContext.query = event.target.value)}
      />
      <button
        type="submit"
        onClick={() => queryUpdated(searchQueryContext.query)}
        value="search"
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>

      <details>
        <summary><FontAwesomeIcon icon={faQuestionCircle} /></summary>
        <p
          >You can use either plain text for the search or &nbsp;
          <a href="https://cucumber.io/docs/cucumber/api/#tag-expressions">
            cucumber tag expressions
          </a>
          &nbsp; to filter the output.
        </p>
      </details>
    </div>
  )
}

export default SearchBar
