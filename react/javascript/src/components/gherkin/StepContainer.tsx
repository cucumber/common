import React from 'react'
import { messages } from '@cucumber/messages'

import StatusIcon from './StatusIcon'

interface IProps {
  status: messages.TestStepResult.Status
}

const StepContainer: React.FunctionComponent<IProps> = ({
  status,
  children,
}) => {
  // @ts-ignore
  return (
    <div className="step-container">
      <span className="text_status_icon_container">
        <StatusIcon status={status} />
      </span>
      <div className="step-container__step">{children}</div>
    </div>
  )
}

export default StepContainer
