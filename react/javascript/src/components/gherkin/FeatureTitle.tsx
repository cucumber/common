import React from 'react'
import * as messages from '@cucumber/messages'
import Keyword from './Keyword'
import HighLight from '../app/HighLight'
import Anchor from './Anchor'
import Title from './Title'

interface IProps {
  id: string
  feature: messages.Feature
}

const FeatureTitle: React.FunctionComponent<IProps> = ({ id, feature }) => {
  return (
    <Anchor id={id}>
      <Title id={id} tag="h1">
        <Keyword>{feature.keyword}:</Keyword>{' '}
        <HighLight className="cucumber-title__text" text={feature.name} />
      </Title>
    </Anchor>
  )
}

export default FeatureTitle
