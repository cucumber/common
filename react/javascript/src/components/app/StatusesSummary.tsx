import React from 'react'
import statusName from '../gherkin/statusName'
import StatusIcon from '../gherkin/StatusIcon'

interface IProps {
  scenarioCountByStatus: Map<
    'UNKNOWN' | 'PASSED' | 'SKIPPED' | 'PENDING' | 'UNDEFINED' | 'AMBIGUOUS' | 'FAILED',
    number
  >
}

const StatusesSummary: React.FunctionComponent<IProps> = ({
  scenarioCountByStatus: scenarioCountByStatus,
}) => {
  const statuses: (
    | 'UNKNOWN'
    | 'PASSED'
    | 'SKIPPED'
    | 'PENDING'
    | 'UNDEFINED'
    | 'AMBIGUOUS'
    | 'FAILED'
  )[] = ['AMBIGUOUS', 'FAILED', 'PASSED', 'PENDING', 'SKIPPED', 'UNDEFINED', 'UNKNOWN']

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
