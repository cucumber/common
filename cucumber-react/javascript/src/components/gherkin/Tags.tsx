import * as React from 'react'
import { messages } from 'cucumber-messages'
import Tag from './Tag'
import ITag = messages.GherkinDocument.Feature.ITag

interface IProps {
  tags: ITag[]
}

const Tags: React.FunctionComponent<IProps> = ({ tags }) => {
  if (!tags) return null
  return (
    <ul>
      {tags.map((tag, index) => (
        <Tag key={index}>{tag.name}</Tag>
      ))}
    </ul>
  )
}

export default Tags
