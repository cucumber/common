import {
  faCheckCircle,
  faQuestionCircle,
  faTimesCircle,
  faPauseCircle,
  faStopCircle,
  faInfoCircle,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import * as messages from '@cucumber/messages'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import statusName from './statusName'

interface IProps {
  status: messages.TestStepFinished.TestStepResult.Status
}

const StatusIcon: React.FunctionComponent<IProps> = ({ status }) => {
  return (
    <FontAwesomeIcon
      icon={statusIcon(status)}
      size="1x"
      className={`cucumber-status--${statusName(status)}`}
    />
  )
}

export default StatusIcon

const statusIcon = (status: messages.TestStepFinished.TestStepResult.Status): IconDefinition => {
  return {
    // Keep the same order as in messages.proto - for readability's sake
    [messages.TestStepFinished.TestStepResult.Status.PASSED]: faCheckCircle,
    [messages.PPED]: faStopCircle,
    [messages.NG]: faPauseCircle,
    [messages.NED]: faQuestionCircle,
    [messages.GUOUS]: faInfoCircle,
    [messages.LED]: faTimesCircle,
    [messages.TestStepFinished.TestStepResult.Status.UNKNOWN]: faQuestionCircle,
  }[status]
}
