import React from 'react'
import Keyword from './Keyword'
import Description from './Description'
import Scenario from './Scenario'
import { messages } from 'cucumber-messages'
import Background from './Background'
import { H2, Indent, StepText, Section } from './html'
import IRule = messages.GherkinDocument.Feature.FeatureChild.IRule

interface IProps {
  rule: IRule
}

const Rule: React.FunctionComponent<IProps> = ({ rule }) => {
  return (
    <Section>
      <H2>
        <Keyword>{rule.keyword}:</Keyword> <StepText>{rule.name}</StepText>
      </H2>
      <Indent>
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
      </Indent>
    </Section>
  )
}

export default Rule
