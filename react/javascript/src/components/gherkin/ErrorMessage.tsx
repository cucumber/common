import React from 'react'
import { messages } from '@cucumber/messages'

interface IProps {
  status: messages.TestResult.Status
  message: string
}

const ErrorMessage: React.FunctionComponent<IProps> = ({ status, message }) => {
  return <pre className="error-message">{message}</pre>
}

export default ErrorMessage
