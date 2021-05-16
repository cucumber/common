import {
  faCheckCircle,
  faQuestionCircle,
  faTimesCircle,
  faPauseCircle,
  faStopCircle,
  faInfoCircle,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as messages from '@cucumber/messages'
import styles from './StatusIcon.module.scss'
import { CustomRenderingContext, mixinStyles, StatusIconProps } from '../customise/CustomRendering'

const StatusIcon: React.FunctionComponent<StatusIconProps> = ({ status }) => {
  const { StatusIcon: Custom } = useContext(CustomRenderingContext)
  if (typeof Custom === 'function') {
    return <Custom status={status} />
  }
  const composedStyles = mixinStyles(styles, Custom)
  return (
    <FontAwesomeIcon
      icon={statusIcon(status)}
      size="1x"
      className={composedStyles.icon}
      data-status={status}
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
