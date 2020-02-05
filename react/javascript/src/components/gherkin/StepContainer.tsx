import React from 'react'
import { messages } from '@cucumber/messages'

import StatusIcon from './StatusIcon'

interface IProps {
  status: messages.TestResult.Status
}

const StepContainer: React.FunctionComponent<IProps> = ({
  status,
  children,
}) => {
  // @ts-ignore
  return (
    <div className="step-container">
      <StatusIcon status={status} />
      <div className="step-container__step">{children}</div>
    </div>
  )
}

export default StepContainer
