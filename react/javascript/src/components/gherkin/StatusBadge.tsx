import React from 'react'
import statusName from '../gherkin/statusName'
import { messages } from '@cucumber/messages'

interface IProps {
  status: messages.TestResult.Status
}

const StatusBadge: React.FunctionComponent<IProps> = ({ status }) => {
  return (
    <span className={`status-badge status-${statusName(status)}`}>
      {statusName(status)}
    </span>
  )
}

export default StatusBadge
