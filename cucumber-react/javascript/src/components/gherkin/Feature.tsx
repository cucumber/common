import React from 'react'
import Tags from './Tags'
import Keyword from './Keyword'
import Description from './Description'
import Scenario from './Scenario'
import { messages } from 'cucumber-messages'
import Rule from './Rule'
import Background from './Background'
import { H1, Indent, StepText, Section } from './html'
import IFeature = messages.GherkinDocument.IFeature

interface IProps {
  feature: IFeature
}

const Feature: React.FunctionComponent<IProps> = ({ feature }) => {
  return (
    <Section>
      <Tags tags={feature.tags}/>
      <H1>
        <Keyword>{feature.keyword}:</Keyword> <StepText>{feature.name}</StepText>
      </H1>
      <Indent>
        {feature.description ? <Description description={feature.description}/> : null}
        {(feature.children || []).map((child, index) => {
          if (child.background) {
            return <Background key={index} background={child.background}/>
          } else if (child.scenario) {
            return <Scenario key={index} scenario={child.scenario}/>
          } else if (child.rule) {
            return <Rule key={index} rule={child.rule}/>
          } else {
            throw new Error('Expected background, scenario or rule')
          }
        })}
      </Indent>
    </Section>
  )
}

export default Feature
