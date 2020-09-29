import React from 'react'
import { messages } from '@cucumber/messages'
import Keyword from './Keyword'
import HighLight from '../app/HighLight'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

interface IProps {
  id: string
  feature: messages.GherkinDocument.IFeature
}

const FeatureTitle: React.FunctionComponent<IProps> = ({ id, feature }) => {
  return (
    <div className="cucumber-anchor cucumber-title">
      <a href={'#' + id} className="cucumber-anchor__link">
        <FontAwesomeIcon icon={faLink} className="cucumber-anchor__icon" />
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
