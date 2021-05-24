import React from 'react'
import Description from './Description'
import * as messages from '@cucumber/messages'
import StepList from './StepList'
import Title from './Title'
import Keyword from './Keyword'

interface IProps {
  background: messages.Background
}

const Background: React.FunctionComponent<IProps> = ({ background }) => {
  return (
    <section>
      <Title header="h2" id={background.id}>
        <Keyword>{background.keyword}:</Keyword>
        <span>{background.name}</span>
      </Title>
      <Description description={background.description} />
      <ol className="cucumber-steps">
        <StepList
          steps={background.steps || []}
          renderStepMatchArguments={true}
          renderMessage={true}
        />
      </ol>
    </section>
  )
}

export default Background
