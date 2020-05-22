import React from 'react'

interface IProps {
  message: string
}

const ErrorMessage: React.FunctionComponent<IProps> = ({ message }) => {
  return <pre className="error-message">{message}</pre>
}

export default ErrorMessage
