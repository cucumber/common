import React from 'react'
import { messages } from '@cucumber/messages'
import statusName from '../gherkin/statusName'
import StatusIcon from '../gherkin/StatusIcon'

interface IProps {
  scenarioCountByStatus: Map<
    messages.TestStepFinished.TestStepResult.Status,
    number
  >
}

const StatusesSummary: React.FunctionComponent<IProps> = ({
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
          <tr>
            <th colSpan={2}>Execution summary</th>
          </tr>
        </thead>
        <tbody>
          {statuses.map((status, index) => {
            const name = statusName(status)
            const scenarioCount = scenarioCountByStatus.get(status)

            if (scenarioCount === undefined) {
              return
            }

            return (
              <tr key={index}>
                <td>
                  <StatusIcon status={status} /> {name}
                </td>
                <td>{scenarioCount} scenarios</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default StatusesSummary
