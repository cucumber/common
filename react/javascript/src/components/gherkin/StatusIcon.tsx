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

const statusIcon = (
  status: messages.TestStepFinished.TestStepResult.Status
): IconDefinition => {
  return {
    // Keep the same order as in messages.proto - for readability's sake
    [messages.TestStepFinished.TestStepResult.Status.PASSED]: faCheckCircle,
    [messages.TestStepFinished.TestStepResult.Status.SKIPPED]: faStopCircle,
    [messages.TestStepFinished.TestStepResult.Status.PENDING]: faPauseCircle,
    [messages.TestStepFinished.TestStepResult.Status
      .UNDEFINED]: faQuestionCircle,
    [messages.TestStepFinished.TestStepResult.Status.AMBIGUOUS]: faInfoCircle,
    [messages.TestStepFinished.TestStepResult.Status.FAILED]: faTimesCircle,
    [messages.TestStepFinished.TestStepResult.Status.UNKNOWN]: faQuestionCircle,
  }[status]
}
