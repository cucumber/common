import React from 'react'
import statusName from '../gherkin/statusName'
import { messages } from '@cucumber/messages'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'

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
      <FontAwesomeIcon icon={faCheckCircle} />
      </div>
      {children}
    </div>
  )
}

export default StepContainer
