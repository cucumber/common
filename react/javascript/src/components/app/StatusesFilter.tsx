import React, { VoidFunctionComponent } from 'react'
import { TestStepResultStatus as Status } from '@cucumber/messages'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import statuses from './statuses'
import statusName from '../gherkin/statusName'

interface IProps {
  statusesWithScenarios: readonly Status[]
  hideStatuses: readonly Status[]
  onChange: (hideStatuses: Status[]) => void
}

export const StatusesFilter: VoidFunctionComponent<IProps> = ({
  statusesWithScenarios,
  hideStatuses,
  onChange,
}) => {
  if (!(statusesWithScenarios.length > 1)) {
    return null
  }
  const filterChanged = (name: Status, show: boolean) => {
    onChange(show ? hideStatuses.filter((s) => s !== name) : hideStatuses.concat(name))
  }
  return (
    <>
      <span>
        <FontAwesomeIcon icon={faFilter} /> Filter by scenario status:
      </span>
      <ul>
        {statuses.map((status) => {
          if (!statusesWithScenarios.includes(status)) {
            return
          }
          const name = statusName(status)
          const enabled = !hideStatuses.includes(status)

          return (
            <li key={name}>
              <label>
                <input
                  type="checkbox"
                  defaultChecked={enabled}
                  onChange={(evt) => filterChanged(status, evt.target.checked)}
                />{' '}
                {name}
              </label>
            </li>
          )
        })}
      </ul>
    </>
  )
}
