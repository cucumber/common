import React from 'react'

import StatusIcon from './StatusIcon'
import * as messages from '@cucumber/messages'
interface IProps {
  status: messages.TestStepResultStatus
}

const StepContainer: React.FunctionComponent<IProps> = ({ status, children }) => {
  // @ts-ignore
  return (
    <li className="cucumber-step">
      <span className="cucumber-step__status">
        <StatusIcon status={status} />
      </span>
      <div className="cucumber-step__content">{children}</div>
    </li>
  )
}

export default StepContainer
