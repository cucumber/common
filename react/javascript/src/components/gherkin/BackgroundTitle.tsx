import React from 'react'
import * as messages from '@cucumber/messages'
import Keyword from './Keyword'
import Anchor from './Anchor'
import Title from './Title'

interface IProps {
  id: string
  background: messages.Background
}

const BackgroundTitle: React.FunctionComponent<IProps> = ({ id, background }) => {
  return (
    <Anchor id={id}>
      <Title id={id} tag="h2">
        <Keyword>{background.keyword}:</Keyword> <span>{background.name}</span>
      </Title>
    </Anchor>
  )
}

export default BackgroundTitle
