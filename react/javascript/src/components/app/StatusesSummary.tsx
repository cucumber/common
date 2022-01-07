import React from 'react'
import statusName from '../gherkin/statusName'
import * as messages from '@cucumber/messages'
import statuses from './statuses'
import styles from './StatusesSummary.module.scss'

export interface IStatusesSummaryProps {
  scenarioCountByStatus: Map<messages.TestStepResultStatus, number>
  totalScenarioCount: number
}

export const StatusesSummary: React.FunctionComponent<IStatusesSummaryProps> = ({
  scenarioCountByStatus,
  totalScenarioCount,
}) => {
  return (
    <ol className={styles.statusesList}>
      {statuses.map((status) => {
        const scenarioCount = scenarioCountByStatus.get(status)
        if (scenarioCount === undefined) {
          return
        }
        return (
          <li
            key={status}
            data-status={status}
            className={styles.statusesItem}
            style={{ width: `calc(${scenarioCount} / ${totalScenarioCount} * 100%)` }}
          >
            {scenarioCount} {statusName(status)}
          </li>
        )
      })}
    </ol>
  )
}
