import React from 'react'
import { messages } from '@cucumber/messages'
import statusColor from './statusColor'

interface IProps {
  status: messages.TestResult.Status
  message: string
}

const ErrorMessage: React.FunctionComponent<IProps> = ({ status, message }) => {
  return (
    <pre
      className="error-message"
      style={{
        backgroundColor: statusColor(status)
          .darken(0.1)
          .hex(),
      }}
    >
      {message}
    </pre>
  )
}

export default ErrorMessage
