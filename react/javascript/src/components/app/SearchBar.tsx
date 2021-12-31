import React, { FunctionComponent } from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './SearchBar.module.scss'

interface IProps {
  query: string
  onSearch: (query: string) => void
}

export const SearchBar: FunctionComponent<IProps> = ({ query, onSearch }) => {
  const searchSubmitted = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new window.FormData(event.currentTarget)
    onSearch(formData.get('query').toString())
  }

  return (
    <form className={styles.searchForm} onSubmit={searchSubmitted}>
      <FontAwesomeIcon aria-hidden="true" className={styles.queryIcon} icon={faSearch} />
      <input
        className={styles.queryField}
        aria-label="Search"
        type="text"
        name="query"
        placeholder='e.g. "some text" or "@tags"'
        defaultValue={query}
      />
      <small className={styles.searchHelp}>
        You can use either plain text for the search or{' '}
        <a href="https://cucumber.io/docs/cucumber/api/#tag-expressions">
          cucumber tag expressions
        </a>{' '}
        to filter the output.
      </small>
    </form>
  )
}
