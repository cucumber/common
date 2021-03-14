import React from 'react'
import * as messages from '@cucumber/messages'
import HighLight from '../app/HighLight'

interface IProps {
  tags: readonly messages.Tag[]
}

const Tags: React.FunctionComponent<IProps> = ({ tags }) => {
  if (!tags) {
    return null
  }
  return (
    <ul className="cucumber-tags">
      {tags.map((tag, index) => (
        <li className="cucumber-tag" key={index}>
          <HighLight text={tag.name} />
        </li>
      ))}
    </ul>
  )
}

export default Tags
