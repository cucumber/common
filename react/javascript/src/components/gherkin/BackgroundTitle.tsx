import React from 'react'
import { messages } from '@cucumber/messages'
import IBackground = messages.GherkinDocument.Feature.IBackground
import Keyword from './Keyword'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

interface IProps {
  id: string
  background: IBackground
}

const BackgroundTitle: React.FunctionComponent<IProps> = ({
  id,
  background,
}) => {
  return (
    <div className="anchored-link cucumber-title">
      <a href={'#' + id}>
        <FontAwesomeIcon icon={faLink} className="attachment-icon" />
      </a>
      <h2 id={id}>
        <Keyword className="cucumber-title__keyword">
          {background.keyword}:
        </Keyword>{' '}
        <span className="cucumber-title__text">{background.name}</span>
      </h2>
    </div>
  )
}

export default BackgroundTitle
