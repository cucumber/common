import React from 'react'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Anchor.module.scss'

const Anchor: React.FunctionComponent<{
  id: string
}> = ({ id, children }) => {
  return (
    <div className={styles.wrapper}>
      <a href={'#' + id} className={styles.anchor}>
        <FontAwesomeIcon icon={faLink} />
      </a>
      {children}
    </div>
  )
}

export default Anchor
