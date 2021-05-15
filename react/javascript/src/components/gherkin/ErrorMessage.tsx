import React, { useContext } from 'react'
import styles from './ErrorMessage.module.scss'
import { CustomRenderingContext, ErrorMessageProps, mixinStyles } from '../customise/CustomRendering'

const ErrorMessage: React.FunctionComponent<ErrorMessageProps> = ({ message }) => {
  // TODO add a hook for this to reduce boilerplate
  const { ErrorMessage: Custom } = useContext(CustomRenderingContext)
  if (typeof Custom === 'function') {
    return <Custom message={message} />
  }
  const composedStyles = mixinStyles(styles, Custom)
  return <pre className={composedStyles.message}>{message}</pre>
}

export default ErrorMessage
