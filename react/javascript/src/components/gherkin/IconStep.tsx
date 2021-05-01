import React from 'react'

import StatusIcon from './StatusIcon'
import * as messages from '@cucumber/messages'
interface IProps {
  status: messages.TestStepResultStatus
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
