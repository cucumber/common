import React from 'react'
import { messages } from '@cucumber/messages'
import IFeature = messages.GherkinDocument.IFeature
import Keyword from './Keyword'
import HighLight from '../app/HighLight'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

interface IProps {
  id: string
  feature: IFeature
}

const FeatureTitle: React.FunctionComponent<IProps> = ({ id, feature }) => {
  return (
    <div className="anchored-link cucumber-title">
      <a href={'#' + id}>
        <FontAwesomeIcon icon={faLink} className="attachment-icon" />
      </a>
      <h1 id={id}>
        <Keyword className="cucumber-title__keyword">
          {feature.keyword}:
        </Keyword>{' '}
        <HighLight className="cucumber-title__text" text={feature.name} />
      </h1>
    </div>
  )
}

export default FeatureTitle
