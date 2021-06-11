import React from 'react'
import { faSearch, faQuestionCircle, faFilter, faShare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SearchQueryContext, { RenderSearchURLFn } from '../../SearchQueryContext'
import statusName from '../gherkin/statusName'
import statuses from './statuses'

const statusNames = statuses.map(statusName).sort()

interface IProps {
  statusesWithScenarios: string[]
  renderSearchURL?: RenderSearchURLFn
}

const SearchBar: React.FunctionComponent<IProps> = ({ statusesWithScenarios, renderSearchURL }) => {
  const searchQueryContext = React.useContext(SearchQueryContext)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new window.FormData(event.currentTarget)
    searchQueryContext.update({
      query: formData.get('query').toString(),
    })
  }

  const showFilters =
    statusesWithScenarios.length > 1 ||
    statusesWithScenarios.find((n) => searchQueryContext.hiddenStatuses.includes(n))

  let link = null
  if (renderSearchURL) {
    const href = renderSearchURL(searchQueryContext)
    link = (
      <p className="help">
        <FontAwesomeIcon icon={faShare} /> &nbsp; Link to this search: <a href={href}>{href}</a>
      </p>
    )
  }

  return (
    <div className="cucumber-search-bar">
      <form className="cucumber-search-bar-search" onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          placeholder="Some text or @tags"
          defaultValue={searchQueryContext.query}
        />
        <button type="submit" value="search">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
      <p className="help">
        <FontAwesomeIcon icon={faQuestionCircle} />
        &nbsp; You can use either plain text for the search or &nbsp;
        <a href="https://cucumber.io/docs/cucumber/api/#tag-expressions">
          cucumber tag expressions
        </a>
        &nbsp; to filter the output.
      </p>
      {showFilters && (
        <form className="cucumber-search-bar-filter">
          <span>
            <FontAwesomeIcon icon={faFilter} /> Filter by scenario status:
          </span>
          <ul>
            {statusNames.map((name, index) => {
              if (!statusesWithScenarios.includes(name)) {
                return
              }

              const enabled = !searchQueryContext.hiddenStatuses.includes(name)
              const inputId = `filter-status-${name}`

              return (
                <li key={index}>
                  <input
                    id={inputId}
                    type="checkbox"
                    defaultChecked={enabled}
                    onChange={(evt) => {
                      searchQueryContext.update({
                        hiddenStatuses: evt.target.checked
                          ? searchQueryContext.hiddenStatuses.filter((n) => n !== name)
                          : searchQueryContext.hiddenStatuses.concat(name),
                      })
                    }}
                  />
                  <label htmlFor={inputId}>{name}</label>
                </li>
              )
            })}
          </ul>
        </form>
      )}
      {link}
    </div>
  )
}

export default SearchBar
