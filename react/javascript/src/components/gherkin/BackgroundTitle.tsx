import React from 'react'
import * as messages from '@cucumber/messages'
import Keyword from './Keyword'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

interface IProps {
  id: string
  background: messages.Background
}

const BackgroundTitle: React.FunctionComponent<IProps> = ({ id, background }) => {
  return (
    <div className="cucumber-anchor cucumber-title">
      <a href={'#' + id} className="cucumber-anchor__link">
        <FontAwesomeIcon icon={faLink} className="cucumber-anchor__icon" />
      </a>
      <h2 id={id}>
        <Keyword className="cucumber-title__keyword">{background.keyword}:</Keyword>{' '}
        <span className="cucumber-title__text">{background.name}</span>
      </h2>
    </div>
  )
}

export default BackgroundTitle
