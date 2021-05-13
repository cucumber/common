import React, { useContext } from 'react'
import styles from './Keyword.module.scss'
import { CustomRenderingContext, mixinStyles } from '../customise/CustomRendering'

const Keyword: React.FunctionComponent = ({ children }) => {
  const { Keyword: Custom } = useContext(CustomRenderingContext)
  if (typeof Custom === 'function') {
    return <Custom>{children}</Custom>
  }
  const composedStyles = mixinStyles(styles, Custom)
  return <span className={composedStyles.keyword}>{children}</span>
}

export default Keyword
