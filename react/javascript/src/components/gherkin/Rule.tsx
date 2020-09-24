import React from 'react'
import IdGenerator from '../../IdGenerator'
import Description from './Description'
import Scenario from './Scenario'
import { messages } from '@cucumber/messages'
import Background from './Background'
import RuleTitle from './RuleTitle'

interface IProps {
  rule: messages.GherkinDocument.Feature.FeatureChild.IRule
}

const generator = new IdGenerator()

const Rule: React.FunctionComponent<IProps> = ({ rule }) => {
  const idGenerated = generator.generate(rule.name)

  return (
    <section className="cucumber-rule">
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
