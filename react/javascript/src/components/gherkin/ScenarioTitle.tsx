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
    <div className="anchored-link cucumber-title">
      <a href={'#' + id}>
        <FontAwesomeIcon icon={faLink} className="attachment-icon" />
      </a>
      <h2 id={id}>
        <Keyword className="cucumber-title__keyword">
          {scenario.keyword}:
        </Keyword>{' '}
        <HighLight className="cucumber-title__text" text={scenario.name} />
      </h2>
    </div>
  )
}

export default ScenarioTitle
