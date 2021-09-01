import React from 'react'
import { Description } from './Description'
import { Background } from './Background'
import { Children } from './Children'
import { Keyword } from './Keyword'
import { Scenario } from './Scenario'
import { Tags } from './Tags'
import { Title } from './Title'
import { HighLight } from '../app/HighLight'
import { DefaultComponent, RuleProps, useCustomRendering } from '../customise'

const DefaultRenderer: DefaultComponent<RuleProps, {}> = ({ rule }) => {
  return (
    <section>
      <Tags tags={rule.tags} />
      <Title header="h2" id={rule.id}>
        <Keyword>{rule.keyword}:</Keyword>
        <HighLight text={rule.name} />
      </Title>
      <Description description={rule.description} />
      <Children>
        {(rule.children || []).map((child, index) => {
          if (child.background) {
            return <Background key={index} background={child.background} />
          } else if (child.scenario) {
            return <Scenario key={index} scenario={child.scenario} />
          } else {
            throw new Error('Expected background or scenario')
          }
        })}
      </Children>
    </section>
  )
}

export const Rule: React.FunctionComponent<RuleProps> = (props) => {
  const ResolvedRenderer = useCustomRendering<RuleProps, {}>('Rule', {}, DefaultRenderer)
  return <ResolvedRenderer {...props} />
}
