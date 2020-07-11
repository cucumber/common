import React from 'react'
import { messages } from '@cucumber/messages'
import IScenario = messages.GherkinDocument.Feature.IScenario
import Keyword from './Keyword'
import HighLight from '../app/HighLight'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

interface IProps {
  id: string
  scenario: IScenario
}

const ScenarioTitle: React.FunctionComponent<IProps> = ({ id, scenario }) => {
  return (
    <div className="anchored-link">
      <a href={'#' + id}>
        <FontAwesomeIcon icon={faLink} className="attachment-icon" />
      </a>
      <h2 id={id}>
        <Keyword>{scenario.keyword}:</Keyword>{' '}
        <span className="step-text">
          <HighLight text={scenario.name} />
        </span>
      </h2>
    </div>
  )
}

export default ScenarioTitle
