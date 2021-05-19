import React from 'react'
import Description from './Description'
import * as messages from '@cucumber/messages'
import StepList from './StepList'
import IdGenerator from '../../IdGenerator'
import Anchor from './Anchor'
import Title from './Title'
import Keyword from './Keyword'

interface IProps {
  background: messages.Background
}

const generator = new IdGenerator()

const Background: React.FunctionComponent<IProps> = ({ background }) => {
  const idGenerated = generator.generate(background.name)

  return (
    <section>
      <Anchor id={idGenerated}>
        <Title id={idGenerated} tag="h2">
          <Keyword>{background.keyword}:</Keyword>
          <span>{background.name}</span>
        </Title>
      </Anchor>
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
