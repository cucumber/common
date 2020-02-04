import React from 'react'
import statusName from '../gherkin/statusName'
import { messages } from '@cucumber/messages'
import Status = messages.TestResult.Status

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle, faFutbol, IconDefinition } from '@fortawesome/free-regular-svg-icons'

interface IProps {
  status: messages.TestResult.Status
}

const statusIcons = (status: Status): IconDefinition => {
  return {
    // Keep the same order as in messages.proto - for readability's sake
    [Status.PASSED]: faCheckCircle,
    [Status.SKIPPED]: faFutbol,
    [Status.PENDING]: faFutbol,
    [Status.UNDEFINED]: faFutbol,
    [Status.AMBIGUOUS]: faFutbol,
    [Status.FAILED]: faTimesCircle,
    [Status.UNKNOWN]: faFutbol,
  }[status]
}

const StepContainer: React.FunctionComponent<IProps> = ({
  status,
  children,
}) => {
  return (
    <div>
      <div className={`status-${statusName(status)}`}>
      <FontAwesomeIcon icon={faCheckCircle} color="white" />

      <FontAwesomeIcon icon={faTimesCircle} color="white" />

      </div>
      {children}
    </div>
  )
}

export default StepContainer
