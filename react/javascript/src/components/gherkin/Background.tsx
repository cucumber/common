import React from 'react'
import Description from './Description'
import { messages } from '@cucumber/messages'
import StepList from './StepList'
import IdGenerator from '../../IdGenerator'
import BackgroundTitle from './BackgroundTitle'

interface IProps {
  background: messages.GherkinDocument.Feature.IBackground
}

const generator = new IdGenerator()

const Background: React.FunctionComponent<IProps> = ({ background }) => {
  const idGenerated = generator.generate(background.name)

  return (
    <section className="cucumber-background">
      <BackgroundTitle id={idGenerated} background={background} />
      <Description description={background.description} />
      <StepList
        steps={background.steps || []}
        renderStepMatchArguments={true}
        renderMessage={true}
      />
    </section>
  )
}

export default Background
