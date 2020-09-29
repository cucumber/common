import React from 'react'
import { messages } from '@cucumber/messages'

import Keyword from './Keyword'
import HighLight from '../app/HighLight'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

interface IProps {
  id: string
  rule: messages.GherkinDocument.Feature.FeatureChild.IRule
}

const RuleTitle: React.FunctionComponent<IProps> = ({ id, rule }) => {
  return (
    <div className="cucumber-anchor cucumber-title">
      <a href={'#' + id} className="cucumber-anchor__link">
        <FontAwesomeIcon icon={faLink} className="cucumber-anchor__icon" />
      </a>
      <h2 id={id}>
        <Keyword className="cucumber-title__keyword">{rule.keyword}:</Keyword>{' '}
        <HighLight className="cucumber-title__text" text={rule.name} />
      </h2>
    </div>
  )
}

export default RuleTitle
