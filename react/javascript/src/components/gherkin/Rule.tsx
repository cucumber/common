import React from 'react'
import IdGenerator from '../../IdGenerator'
import Description from './Description'
import Scenario from './Scenario'
import * as messages from '@cucumber/messages'
import Background from './Background'
import Tags from './Tags'
import Anchor from './Anchor'
import Title from './Title'
import Keyword from './Keyword'
import HighLight from '../app/HighLight'

interface IProps {
  rule: messages.Rule
}

const generator = new IdGenerator()

const Rule: React.FunctionComponent<IProps> = ({ rule }) => {
  const idGenerated = generator.generate(rule.name)

  return (
    <section>
      <Tags tags={rule.tags} />
      <Anchor id={idGenerated}>
        <Title id={idGenerated} tag="h2">
          <Keyword>{rule.keyword}:</Keyword>
          <HighLight text={rule.name} />
        </Title>
      </Anchor>
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
