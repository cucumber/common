import React from 'react'
import { messages } from '@cucumber/messages'

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
  const statuses = new Map<
    string,
    messages.TestStepFinished.TestStepResult.Status
  >([
    ['ambiguous', messages.TestStepFinished.TestStepResult.Status.AMBIGUOUS],
    ['failed', messages.TestStepFinished.TestStepResult.Status.FAILED],
    ['passed', messages.TestStepFinished.TestStepResult.Status.PASSED],
    ['pending', messages.TestStepFinished.TestStepResult.Status.PENDING],
    ['skipped', messages.TestStepFinished.TestStepResult.Status.SKIPPED],
    ['undefined', messages.TestStepFinished.TestStepResult.Status.UNDEFINED],
    ['unknown', messages.TestStepFinished.TestStepResult.Status.UNKNOWN],
  ])

  return (
    <div className="cucumber-status-filter">
      <p>Display only:</p>
      <ul>
        {Array.from(statuses.entries()).map((entry, index) => {
          const name = entry[0]
          const status = entry[1]
          const scenarioCount = scenarioCountByStatus.get(status)

          if (scenarioCount === undefined) {
            return
          }

          const enabled = enabledStatuses.includes(status)
          return (
            <li key={index} className={`filter-status-${name}`}>
              <label>
                <input
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
                {name} ({scenarioCount} scenarios)
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default StatusesFilter
