import React from 'react'
import IdGenerator from '../../IdGenerator'
import Description from './Description'
import Scenario from './Scenario'
import * as messages from '@cucumber/messages'
import Background from './Background'
import RuleTitle from './RuleTitle'
import Tags from './Tags'

interface IProps {
  rule: messages.Rule
}

const generator = new IdGenerator()

const Rule: React.FunctionComponent<IProps> = ({ rule }) => {
  const idGenerated = generator.generate(rule.name)

  return (
    <section className="cucumber-rule">
      <Tags tags={rule.tags} />
      <RuleTitle id={idGenerated} rule={rule} />
      <div className="cucumber-children">
        <Description description={rule.description} />
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
