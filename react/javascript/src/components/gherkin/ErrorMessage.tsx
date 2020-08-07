import React from 'react'

interface IProps {
  message: string
  className?: string
}

const ErrorMessage: React.FunctionComponent<IProps> = ({
  message,
  className = '',
}) => {
  return <pre className={`cucumber-error ${className}`}>{message}</pre>
}

export default ErrorMessage
