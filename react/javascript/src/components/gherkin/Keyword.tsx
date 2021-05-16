import React from 'react'
import styles from './Keyword.module.scss'
import {
  KeywordClasses,
  useCustomRendering,
} from '../customise/CustomRendering'

const Keyword: React.FunctionComponent = ({ children }) => {
  const Customised = useCustomRendering<any, KeywordClasses>('Keyword', styles)
  if (typeof Customised === 'function') {
    return <Customised>{children}</Customised>
  }
  return <span className={Customised.keyword}>{children}</span>
}

export default Keyword
