import React from 'react'
import statusName from '../gherkin/statusName'
import { messages } from '@cucumber/messages'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface IProps {
  status: messages.TestResult.Status
}

const StepContainer: React.FunctionComponent<IProps> = ({
  status,
  children,
}) => {
  return (
    <div>
      <div className={`status-${statusName(status)}`}>
        <FontAwesomeIcon icon="coffee" />
      </div>
      {children}
    </div>
  )
}

export default StepContainer
