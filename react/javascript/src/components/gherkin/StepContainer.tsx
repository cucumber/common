import React from 'react'
import statusName from '../gherkin/statusName'
import { messages } from '@cucumber/messages'

interface IProps {
  status: messages.TestResult.Status
}

const StepContainer: React.FunctionComponent<IProps> = ({
  status,
  children,
}) => {
  return (
    <div>
      <span className={`status-${statusName(status)}`}>Icon</span>
      {children}
    </div>
  )
}

export default StepContainer
