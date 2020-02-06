import {
  faCheckCircle,
  faQuestionCircle,
  faTimesCircle,
  faPauseCircle,
  faStopCircle,
  faInfoCircle,
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
      className={`status-${statusName(status)}`}
    />
  )
}

export default StatusIcon

const statusIcon = (status: Status): IconDefinition => {
  return {
    // Keep the same order as in messages.proto - for readability's sake
    [Status.PASSED]: faCheckCircle,
    [Status.SKIPPED]: faStopCircle,
    [Status.PENDING]: faPauseCircle,
    [Status.UNDEFINED]: faQuestionCircle,
    [Status.AMBIGUOUS]: faInfoCircle,
    [Status.FAILED]: faTimesCircle,
    [Status.UNKNOWN]: faQuestionCircle,
  }[status]
}
