import React from 'react'
import styles from './ErrorMessage.module.scss'
import {
  ErrorMessageClasses,
  ErrorMessageProps,
  useCustomRendering,
} from '../customise/CustomRendering'

const ErrorMessage: React.FunctionComponent<ErrorMessageProps> = (props) => {
  const Customised = useCustomRendering<ErrorMessageProps, ErrorMessageClasses>('ErrorMessage', styles)
  if (typeof Customised === 'function') {
    return <Customised {...props}/>
  }
  return <pre className={Customised.message}>{props.message}</pre>
}

export default ErrorMessage
