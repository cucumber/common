import React from 'react'
import { messages } from '@cucumber/messages'
import ITag = messages.GherkinDocument.Feature.ITag
import HighLight from '../app/HighLight'

interface IProps {
  tags: ITag[]
}

const Tags: React.FunctionComponent<IProps> = ({ tags }) => {
  if (!tags) {
    return null
  }
  return (
    <ul className="tag-list">
      {tags.map((tag, index) => (
        <li className="tag" key={index}>
          <HighLight text={tag.name} />
        </li>
      ))}
    </ul>
  )
}

export default Tags
