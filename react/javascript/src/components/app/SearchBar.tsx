import React from 'react'
import { faSearch, faQuestionCircle, faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SearchQueryContext from '../../SearchQueryContext'
import statusName from '../gherkin/statusName'
import statuses from './statuses'
import { TestStepResultStatus as Status } from '@cucumber/messages'

import styles from './SearchBar.module.scss'

interface IProps {
  statusesWithScenarios: Status[]
}

export const SearchBar: React.FunctionComponent<IProps> = ({ statusesWithScenarios }) => {
  const searchQueryContext = React.useContext(SearchQueryContext)

  const searchSubmitted = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new window.FormData(event.currentTarget)
    searchQueryContext.update({
      query: formData.get('query').toString(),
    })
  }

  const filterChanged = (name: Status, show: boolean) => {
    searchQueryContext.update({
      hideStatuses: show
        ? searchQueryContext.hideStatuses.filter((s) => s !== name)
        : searchQueryContext.hideStatuses.concat(name),
    })
  }

  const showFilters = statusesWithScenarios.length > 1

  return (
    <>
      <form className={styles.searchForm} onSubmit={searchSubmitted}>
        <FontAwesomeIcon aria-hidden="true" className={styles.queryIcon} icon={faSearch} />
        <input
          className={styles.queryField}
          aria-label="Search"
          type="text"
          name="query"
          placeholder='e.g. "some text" or "@tags"'
          defaultValue={searchQueryContext.query}
        />
        <small className={styles.searchHelp}>
          You can use either plain text for the search or{' '}
          <a href="https://cucumber.io/docs/cucumber/api/#tag-expressions">
            cucumber tag expressions
          </a>{' '}
          to filter the output.
        </small>
      </form>

      {showFilters && (
        <>
          <span>
            <FontAwesomeIcon icon={faFilter} /> Filter by scenario status:
          </span>
          <ul>
            {statuses.map((status) => {
              if (!statusesWithScenarios.includes(status)) {
                return
              }
              const name = statusName(status)
              const enabled = !searchQueryContext.hideStatuses.includes(status)

              return (
                <li key={name}>
                  <label>
                    <input
                      type="checkbox"
                      defaultChecked={enabled}
                      onChange={(evt) => filterChanged(status, evt.target.checked)}
                    />{' '}
                    {name}
                  </label>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </>
  )
}
