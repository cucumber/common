import React from 'react'
import Description from './Description'
import { messages } from '@cucumber/messages'
import StepList from './StepList'
import IdGenerator from '../../IdGenerator'
import BackgroundTitle from './BackgroundTitle'
import IBackground = messages.GherkinDocument.Feature.IBackground

interface IProps {
  background: IBackground
}

const generator = new IdGenerator()

const Background: React.FunctionComponent<IProps> = ({ background }) => {
  const idGenerated = generator.generate(background.name)

  return (
    <section>
      <BackgroundTitle
          id={idGenerated}
          background={background}
      />
      <div className="indent">
        <Description description={background.description} />
        <StepList
          steps={background.steps || []}
          renderStepMatchArguments={true}
          renderMessage={true}
        />
      </div>
    </section>
  )
}

export default Background
