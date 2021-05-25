import React from 'react'
import Tags from './Tags'
import Description from './Description'
import Scenario from './Scenario'
import * as messages from '@cucumber/messages'
import Rule from './Rule'
import Background from './Background'
import Title from './Title'
import Keyword from './Keyword'
import HighLight from '../app/HighLight'

interface IProps {
  feature: messages.Feature
}

const Feature: React.FunctionComponent<IProps> = ({ feature }) => {
  return (
    <section>
      <Tags tags={feature.tags} />
      <Title header="h1" id={feature.name}>
        <Keyword>{feature.keyword}:</Keyword>
        <HighLight text={feature.name} />
      </Title>
      <Description description={feature.description} />
      <div className="cucumber-children">
        {(feature.children || []).map((child, index) => {
          if (child.background) {
            return <Background key={index} background={child.background} />
          } else if (child.scenario) {
            return <Scenario key={index} scenario={child.scenario} />
          } else if (child.rule) {
            return <Rule key={index} rule={child.rule} />
          } else {
            throw new Error('Expected background, scenario or rule')
          }
        })}
      </div>
    </section>
  )
}

export default Feature
