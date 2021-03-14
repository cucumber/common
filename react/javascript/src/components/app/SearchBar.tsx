import React from 'react'
import { faSearch, faQuestionCircle, faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SearchQueryContext from '../../SearchQueryContext'
import statusName from '../gherkin/statusName'

interface IProps {
  statusesUpdated: (
    statuses: (
      | 'UNKNOWN'
      | 'PASSED'
      | 'SKIPPED'
      | 'PENDING'
      | 'UNDEFINED'
      | 'AMBIGUOUS'
      | 'FAILED'
    )[]
  ) => any
  enabledStatuses: (
    | 'UNKNOWN'
    | 'PASSED'
    | 'SKIPPED'
    | 'PENDING'
    | 'UNDEFINED'
    | 'AMBIGUOUS'
    | 'FAILED'
  )[]
  scenarioCountByStatus: Map<
    'UNKNOWN' | 'PASSED' | 'SKIPPED' | 'PENDING' | 'UNDEFINED' | 'AMBIGUOUS' | 'FAILED',
    number
  >
}

const SearchBar: React.FunctionComponent<IProps> = ({
  statusesUpdated,
  enabledStatuses,
  scenarioCountByStatus,
}) => {
  const searchQueryContext = React.useContext(SearchQueryContext)

  const statuses: (
    | 'UNKNOWN'
    | 'PASSED'
    | 'SKIPPED'
    | 'PENDING'
    | 'UNDEFINED'
    | 'AMBIGUOUS'
    | 'FAILED'
  )[] = ['AMBIGUOUS', 'FAILED', 'PASSED', 'PENDING', 'SKIPPED', 'UNDEFINED', 'UNKNOWN']

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new window.FormData(event.currentTarget)
    searchQueryContext.updateQuery(formData.get('query').toString())
  }

  const showFilters = scenarioCountByStatus.size > 1 || scenarioCountByStatus.has('UNKNOWN')

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
            {statuses.map((status, index) => {
              const name = statusName(status)
              const enabled = enabledStatuses.includes(status)
              const inputId = `filter-status-${name}`

              if (scenarioCountByStatus.get(status) === undefined) {
                return
              }

              return (
                <li key={index}>
                  <input
                    id={inputId}
                    type="checkbox"
                    defaultChecked={enabled}
                    onChange={() => {
                      if (enabledStatuses.includes(status)) {
                        statusesUpdated(enabledStatuses.filter((s) => s !== status))
                      } else {
                        statusesUpdated([status].concat(enabledStatuses))
                      }
                    }}
                  />
                  <label htmlFor={inputId}>{name}</label>
                </li>
              )
            })}
          </ul>
        </form>
      )}
    </div>
  )
}

export default SearchBar
