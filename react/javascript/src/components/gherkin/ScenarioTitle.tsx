import React from 'react'
import * as messages from '@cucumber/messages'
import Keyword from './Keyword'
import HighLight from '../app/HighLight'
import Anchor from './Anchor'
import Title from './Title'

interface IProps {
  id: string
  scenario: messages.Scenario
}

const ScenarioTitle: React.FunctionComponent<IProps> = ({ id, scenario }) => {
  return (
    <Anchor id={id}>
      <Title id={id} tag="h2">
        <Keyword>{scenario.keyword}:</Keyword> <HighLight text={scenario.name} />
      </Title>
    </Anchor>
  )
}

export default ScenarioTitle
