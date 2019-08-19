import * as React from 'react'
import Keyword from './Keyword'
import Description from './Description'
import Scenario from './Scenario'
import { messages } from 'cucumber-messages'
import Background from './Background'
import IRule = messages.GherkinDocument.Feature.FeatureChild.IRule

interface IProps {
  rule: IRule
}

const Rule: React.FunctionComponent<IProps> = ({ rule }) => {
  return (
    <section>
      <h2>
        <Keyword>{rule.keyword}</Keyword>: <span>{rule.name}</span>
      </h2>
      <Description description={rule.description}/>
      {(rule.children || []).map((child, index) => {
        if (child.background) {
          return <Background key={index} background={child.background}/>
        } else if (child.scenario) {
          return <Scenario key={index} scenario={child.scenario}/>
        } else {
          throw new Error('Expected background or scenario')
        }
      })}
    </section>
  )
}

export default Rule
