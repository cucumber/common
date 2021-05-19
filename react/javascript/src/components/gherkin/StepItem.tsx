import React from 'react'

import StatusIcon from './StatusIcon'
import * as messages from '@cucumber/messages'
import styles from './StepItem.module.scss'

const StepItem: React.FunctionComponent<{
  status?: messages.TestStepResultStatus
}> = ({ status, children }) => {
  return (
    <li className={styles.container}>
      <span className={styles.status}>{status && <StatusIcon status={status} />}</span>
      <div className={styles.content}>{children}</div>
    </li>
  )
}

export default StepItem
