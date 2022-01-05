import React, { FunctionComponent } from 'react'
import { faFilter, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './SearchBar.module.scss'
import { TestStepResultStatus as Status } from '@cucumber/messages'
import statuses from './statuses'
import statusName from '../gherkin/statusName'

interface IProps {
  query: string
  hideStatuses: readonly Status[]
  statusesWithScenarios: readonly Status[]
  onSearch: (query: string) => void
  onFilter: (hideStatuses: Status[]) => void
}

export const SearchBar: FunctionComponent<IProps> = ({
  query,
  hideStatuses,
  statusesWithScenarios,
  onSearch,
  onFilter,
}) => {
  const searchSubmitted = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new window.FormData(event.currentTarget)
    onSearch(formData.get('query').toString())
  }
  const filterChanged = (name: Status, show: boolean) => {
    onFilter(show ? hideStatuses.filter((s) => s !== name) : hideStatuses.concat(name))
  }
  return (
    <div className={styles.layout}>
      <form className={styles.searchForm} onSubmit={searchSubmitted}>
        <FontAwesomeIcon aria-hidden="true" className={styles.queryIcon} icon={faSearch} />
        <input
          className={styles.queryField}
          aria-label="Search"
          type="text"
          name="query"
          placeholder="Search with text or @tags"
          defaultValue={query}
        />
        <small className={styles.searchHelp}>
          You can search with plain text or{' '}
          <a
            href="https://cucumber.io/docs/cucumber/api/#tag-expressions"
            target="_blank"
            rel="noreferrer"
          >
            Cucumber Tag Expressions
          </a>{' '}
          to filter the output
        </small>
      </form>
      {statusesWithScenarios.length > 1 && (
        <div className={styles.filterLayout}>
          <FontAwesomeIcon className={styles.filterIcon} title="Filter by status" icon={faFilter} />
          <ul className={styles.filterList}>
            {statuses.map((status) => {
              if (!statusesWithScenarios.includes(status)) {
                return
              }
              const name = statusName(status)
              const enabled = !hideStatuses.includes(status)

              return (
                <li key={name}>
                  <label className={styles.filterField}>
                    <input
                      type="checkbox"
                      defaultChecked={enabled}
                      onChange={(evt) => filterChanged(status, evt.target.checked)}
                    />
                    {name}
                  </label>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
