import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGrimace } from '@fortawesome/free-solid-svg-icons'
import styles from './NoMatchResult.module.scss'

interface IProps {
  query: string
}

export const NoMatchResult: React.FunctionComponent<IProps> = ({ query }) => {
  return (
    <p className={styles.message}>
      <FontAwesomeIcon className={styles.icon} aria-hidden="true" icon={faGrimace} />
      <span>
        {query
          ? `No matches found for your query "${query}" and/or filters`
          : 'No matches found for your filters'}
      </span>
    </p>
  )
}
