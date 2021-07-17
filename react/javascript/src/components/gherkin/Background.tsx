import React from 'react'
import { Description } from './Description'
import { StepList } from './StepList'
import { Title } from './Title'
import { Keyword } from './Keyword'
import { BackgroundProps, DefaultComponent, useCustomRendering } from '../customise'

const DefaultRenderer: DefaultComponent<BackgroundProps, {}> = ({ background }) => {
  return (
    <section>
      <Title header="h2" id={background.id}>
        <Keyword>{background.keyword}:</Keyword>
        <span>{background.name}</span>
      </Title>
      <Description description={background.description} />
      <ol className="cucumber-steps">
        <StepList steps={background.steps || []} hasExamples={false} />
      </ol>
    </section>
  )
}

export const Background: React.FunctionComponent<BackgroundProps> = (props) => {
  const ResolvedRenderer = useCustomRendering<BackgroundProps, {}>(
    'Background',
    {},
    DefaultRenderer
  )
  return <ResolvedRenderer {...props} />
}
