import React from 'react'
import Keyword from './Keyword'
import Description from './Description'
import { messages } from 'cucumber-messages'
import StepList from './StepList'
import { Indent, StepText, Section } from './html'
import IBackground = messages.GherkinDocument.Feature.IBackground

interface IProps {
  background: IBackground
}

const Background: React.FunctionComponent<IProps> = ({ background }) => {
  return (
    <Section>
      <h2>
        <Keyword>{background.keyword}:</Keyword>{' '}
        <StepText>{background.name}</StepText>
      </h2>
      <Indent>
        <Description description={background.description} />
        <StepList
          steps={background.steps || []}
          renderStepMatchArguments={true}
        />
      </Indent>
    </Section>
  )
}

export default Background
