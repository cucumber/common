import React from 'react'
import {
  faSearch,
  faQuestionCircle,
  faFilter,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SearchQueryContext from '../../SearchQueryContext'
import { messages } from '@cucumber/messages'
import statusName from '../gherkin/statusName'

interface IProps {
  queryUpdated: (query: string) => any
  statusesUpdated: (
    statuses: messages.TestStepFinished.TestStepResult.Status[]
  ) => any
  enabledStatuses: messages.TestStepFinished.TestStepResult.Status[]
  scenarioCountByStatus: Map<
    messages.TestStepFinished.TestStepResult.Status,
    number
  >
}

const SearchBar: React.FunctionComponent<IProps> = ({
  queryUpdated,
  statusesUpdated,
  enabledStatuses,
  scenarioCountByStatus,
}) => {
  const searchQueryContext = React.useContext(SearchQueryContext)
  const statuses = [
    messages.TestStepFinished.TestStepResult.Status.AMBIGUOUS,
    messages.TestStepFinished.TestStepResult.Status.FAILED,
    messages.TestStepFinished.TestStepResult.Status.PASSED,
    messages.TestStepFinished.TestStepResult.Status.PENDING,
    messages.TestStepFinished.TestStepResult.Status.SKIPPED,
    messages.TestStepFinished.TestStepResult.Status.UNDEFINED,
    messages.TestStepFinished.TestStepResult.Status.UNKNOWN,
  ]

  const updateQueryOnEnter = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      queryUpdated(searchQueryContext.query)
      event.preventDefault()
    }
  }

  const showFilters =
    scenarioCountByStatus.size > 1 ||
    scenarioCountByStatus.has(
      messages.TestStepFinished.TestStepResult.Status.UNKNOWN
    )

  return (
    <div className="cucumber-search-bar">
      <form className="cucumber-search-bar-search">
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
                        statusesUpdated(
                          enabledStatuses.filter((s) => s !== status)
                        )
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
