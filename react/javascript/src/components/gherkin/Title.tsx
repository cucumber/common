import React from 'react'
import styles from './Title.module.scss'

const Title: React.FunctionComponent<{
  tag: 'h1' | 'h2' | 'h3'
  id?: string
}> = ({ tag: Tag, id, children }) => {
  return (
    <Tag id={id} className={styles.title}>
      {children}
    </Tag>
  )
}

export default Title
