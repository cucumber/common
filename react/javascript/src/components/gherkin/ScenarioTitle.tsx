import React from 'react'
import { messages } from '@cucumber/messages'
import IScenario = messages.GherkinDocument.Feature.IScenario
import Keyword from './Keyword'

interface IProps {
  id: string
  scenario: IScenario
}

const ScenarioTitle: React.FunctionComponent<IProps> = ({ id, scenario }) => {
  return (
    <h2>
      <Keyword>{scenario.keyword}:</Keyword>{' '}
      <span id={id} className="step-text">{scenario.name}</span>
    </h2>
  )
}

export default ScenarioTitle