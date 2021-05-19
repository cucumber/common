import React from 'react'
import Tags from './Tags'
import IdGenerator from '../../IdGenerator'
import Description from './Description'
import Scenario from './Scenario'
import * as messages from '@cucumber/messages'
import Rule from './Rule'
import Background from './Background'
import Title from './Title'
import Keyword from './Keyword'
import HighLight from '../app/HighLight'
import Anchor from './Anchor'

interface IProps {
  feature: messages.Feature
}

const generator = new IdGenerator()

const Feature: React.FunctionComponent<IProps> = ({ feature }) => {
  const idGenerated = generator.generate(feature.name)

  return (
    <section>
      <Tags tags={feature.tags} />
      <Anchor id={idGenerated}>
        <Title id={idGenerated} tag="h1">
          <Keyword>{feature.keyword}:</Keyword>
          <HighLight text={feature.name} />
        </Title>
      </Anchor>
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
