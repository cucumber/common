import React from 'react'
import { messages } from '@cucumber/messages'
import Keyword from './Keyword'
import HighLight from '../app/HighLight'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

interface IProps {
  id: string
  scenario: messages.GherkinDocument.Feature.IScenario
}

const ScenarioTitle: React.FunctionComponent<IProps> = ({ id, scenario }) => {
  return (
    <div className="cucumber-anchor cucumber-title">
      <a href={'#' + id} className="cucumber-anchor__link">
        <FontAwesomeIcon icon={faLink} className="cucumber-anchor__icon" />
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
