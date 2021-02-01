import React from 'react'
import { messages } from '@cucumber/messages'

import StatusIcon from './StatusIcon'

interface IProps {
  status: messages.TestStepFinished.TestStepResult.Status
}

const IconStep: React.FunctionComponent<IProps> = ({ status, children }) => {
  return (
    <>
      <span className="cucumber-step__status">
        <StatusIcon status={status} />
      </span>
      <div className="cucumber-step__content">{children}</div>
    </>
  )
}

export default IconStep
