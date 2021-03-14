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
  status: 'UNKNOWN' | 'PASSED' | 'SKIPPED' | 'PENDING' | 'UNDEFINED' | 'AMBIGUOUS' | 'FAILED'
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
  status: 'UNKNOWN' | 'PASSED' | 'SKIPPED' | 'PENDING' | 'UNDEFINED' | 'AMBIGUOUS' | 'FAILED'
): IconDefinition => {
  return {
    // Keep the same order as in messages.proto - for readability's sake
    ['PASSED']: faCheckCircle,
    ['SKIPPED']: faStopCircle,
    ['PENDING']: faPauseCircle,
    ['UNDEFINED']: faQuestionCircle,
    ['AMBIGUOUS']: faInfoCircle,
    ['FAILED']: faTimesCircle,
    ['UNKNOWN']: faQuestionCircle,
  }[status]
}
