import React from 'react'
import * as messages from '@cucumber/messages'
import Keyword from './Keyword'
import HighLight from '../app/HighLight'
import Anchor from './Anchor'
import Title from './Title'

interface IProps {
  id: string
  rule: messages.Rule
}

const RuleTitle: React.FunctionComponent<IProps> = ({ id, rule }) => {
  return (
    <Anchor id={id}>
      <Title id={id} tag="h2">
        <Keyword>{rule.keyword}:</Keyword> <HighLight text={rule.name} />
      </Title>
    </Anchor>
  )
}

export default RuleTitle
