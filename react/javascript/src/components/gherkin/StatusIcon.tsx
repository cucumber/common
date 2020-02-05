import {
  faCheckCircle,
  faFutbol,
  faQuestionCircle,
  faTimesCircle,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import { messages } from '@cucumber/messages'
import Status = messages.TestResult.Status
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import statusName from './statusName'

interface IProps {
  status: Status
}

const StatusIcon: React.FunctionComponent<IProps> = ({ status }) => {
  return (
    <FontAwesomeIcon
      icon={statusIcon(status)}
      size="1x"
      className={`status_icon status-${statusName(status)}`}
    />
  )
}

export default StatusIcon

const statusIcon = (status: Status): IconDefinition => {
  return {
    // Keep the same order as in messages.proto - for readability's sake
    [Status.PASSED]: faCheckCircle,
    [Status.SKIPPED]: faFutbol,
    [Status.PENDING]: faFutbol,
    [Status.UNDEFINED]: faQuestionCircle,
    [Status.AMBIGUOUS]: faFutbol,
    [Status.FAILED]: faTimesCircle,
    [Status.UNKNOWN]: faFutbol,
  }[status]
}
