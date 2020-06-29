import React from 'react'
import { messages } from '@cucumber/messages'
import statusName from '../gherkin/statusName'
import StatusIcon from '../gherkin/StatusIcon'

interface IProps {
  statusesUpdated: (
    statuses: messages.TestStepFinished.TestStepResult.Status[]
  ) => any
  enabledStatuses: messages.TestStepFinished.TestStepResult.Status[]
  scenarioCountByStatus: Map<
    messages.TestStepFinished.TestStepResult.Status,
    number
  >
}

const StatusesFilter: React.FunctionComponent<IProps> = ({
  statusesUpdated: statusesUpdated,
  enabledStatuses: enabledStatuses,
  scenarioCountByStatus: scenarioCountByStatus,
}) => {
  const statuses = [
    messages.TestStepFinished.TestStepResult.Status.AMBIGUOUS,
    messages.TestStepFinished.TestStepResult.Status.FAILED,
    messages.TestStepFinished.TestStepResult.Status.PASSED,
    messages.TestStepFinished.TestStepResult.Status.PENDING,
    messages.TestStepFinished.TestStepResult.Status.SKIPPED,
    messages.TestStepFinished.TestStepResult.Status.UNDEFINED,
    messages.TestStepFinished.TestStepResult.Status.UNKNOWN,
  ]

  return (
    <div className="cucumber-status-filter">
      <table>
        <thead>
          <th>
            <td>Status</td>
            <td>Scenarios</td>
            <td>Show</td>
          </th>
        </thead>
        <tbody>
          {statuses.map((status, index) => {
            const name = statusName(status)
            const scenarioCount = scenarioCountByStatus.get(status)
            const enabled = enabledStatuses.includes(status)
            const inputId = `filter-status-${name}`

            if (scenarioCount === undefined) {
              return
            }

            return (
              <tr key={index}>
                <td>
                  <label htmlFor={inputId}>
                    <StatusIcon status={status} /> {name}
                  </label>
                </td>
                <td>{scenarioCount} scenarios</td>
                <td>
                  <input
                    id={inputId}
                    type="checkbox"
                    defaultChecked={enabled}
                    onChange={() => {
                      if (enabledStatuses.includes(status)) {
                        statusesUpdated(
                          enabledStatuses.filter((s) => s !== status)
                        )
                      } else {
                        statusesUpdated([status].concat(enabledStatuses))
                      }
                    }}
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default StatusesFilter
