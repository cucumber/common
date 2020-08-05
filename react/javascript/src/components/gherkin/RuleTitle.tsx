import React from 'react'
import { messages } from '@cucumber/messages'
import IRule = messages.GherkinDocument.Feature.FeatureChild.IRule
import Keyword from './Keyword'
import HighLight from '../app/HighLight'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

interface IProps {
  id: string
  rule: IRule
}

const RuleTitle: React.FunctionComponent<IProps> = ({ id, rule }) => {
  return (
    <div className="anchored-link cucumber-title">
      <a href={'#' + id}>
        <FontAwesomeIcon icon={faLink} className="attachment-icon" />
      </a>
      <h2 id={id}>
        <Keyword className="cucumber-title__keyword">{rule.keyword}:</Keyword>{' '}
        <HighLight className="cucumber-title__text" text={rule.name} />
      </h2>
    </div>
  )
}

export default RuleTitle
