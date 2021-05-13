import React, { useContext } from 'react'
import { CustomRenderingContext, mixinStyles, ParameterProps } from '../customise/CustomRendering'
import styles from './Parameter.module.scss'

const Parameter: React.FunctionComponent<ParameterProps> = ({ parameterTypeName, children }) => {
  const { Parameter: Custom } = useContext(CustomRenderingContext)
  if (typeof Custom === 'function') {
    return <Custom parameterTypeName={parameterTypeName}>{children}</Custom>
  }
  const composedStyles = mixinStyles(styles, Custom)
  return <span title={parameterTypeName} className={composedStyles.parameter}>{children}</span>
}

export default Parameter
