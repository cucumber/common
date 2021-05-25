import React from 'react'
import Description from './Description'
import Scenario from './Scenario'
import * as messages from '@cucumber/messages'
import Background from './Background'
import Tags from './Tags'
import Title from './Title'
import Keyword from './Keyword'
import HighLight from '../app/HighLight'

interface IProps {
  rule: messages.Rule
}

const Rule: React.FunctionComponent<IProps> = ({ rule }) => {
  return (
    <section>
      <Tags tags={rule.tags} />
      <Title header="h2" id={rule.id}>
        <Keyword>{rule.keyword}:</Keyword>
        <HighLight text={rule.name} />
      </Title>
      <Description description={rule.description} />
      <div className="cucumber-children">
        {(rule.children || []).map((child, index) => {
          if (child.background) {
            return <Background key={index} background={child.background} />
          } else if (child.scenario) {
            return <Scenario key={index} scenario={child.scenario} />
          } else {
            throw new Error('Expected background or scenario')
          }
        })}
      </div>
    </section>
  )
}

export default Rule
