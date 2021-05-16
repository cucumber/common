import {
  faCheckCircle,
  faQuestionCircle,
  faTimesCircle,
  faPauseCircle,
  faStopCircle,
  faInfoCircle,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as messages from '@cucumber/messages'
import styles from './StatusIcon.module.scss'
import {
  StatusIconClasses,
  StatusIconProps,
  useCustomRendering,
} from '../customise/CustomRendering'

const StatusIcon: React.FunctionComponent<StatusIconProps> = (props) => {
  const Customised = useCustomRendering<StatusIconProps, StatusIconClasses>('StatusIcon', styles)
  if (typeof Customised === 'function') {
    return <Customised {...props}>{props.children}</Customised>
  }
  return (
    <FontAwesomeIcon
      icon={statusIcon(props.status)}
      size="1x"
      className={Customised.icon}
      data-status={props.status}
    />
  )
}

export default StatusIcon

const statusIcon = (status: messages.TestStepResultStatus): IconDefinition => {
  return {
    ['PASSED']: faCheckCircle,
    ['SKIPPED']: faStopCircle,
    ['PENDING']: faPauseCircle,
    ['UNDEFINED']: faQuestionCircle,
    ['AMBIGUOUS']: faInfoCircle,
    ['FAILED']: faTimesCircle,
    ['UNKNOWN']: faQuestionCircle,
  }[status]
}
