import React from 'react'
import statusName from '../gherkin/statusName'
import { messages } from '@cucumber/messages'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { library, icon } from '@fortawesome/fontawesome-svg-core'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

library.add(faCamera)

const camera = icon({ prefix: 'fas', iconName: 'camera' })

interface IProps {
  status: messages.TestResult.Status
}

const StepContainer: React.FunctionComponent<IProps> = ({
  status,
  children,
}) => {
  return (
    <div>
      <div className={`status-${statusName(status)}`}>
        <FontAwesomeIcon icon="camera" />
      </div>
      {children}
    </div>
  )
}

export default StepContainer
