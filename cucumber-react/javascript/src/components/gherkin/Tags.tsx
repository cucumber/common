import React from 'react'
import { messages } from 'cucumber-messages'
import Tag from './Tag'
import ITag = messages.GherkinDocument.Feature.ITag
import styled from 'styled-components'

interface IProps {
  tags: ITag[]
}

const TagList = styled.ul`
  padding: 0;
  margin-bottom: 0;
`

const Tags: React.FunctionComponent<IProps> = ({ tags }) => {
  if (!tags) {
    return null
  }
  return (
    <TagList>
      {tags.map((tag, index) => (
        <Tag key={index}>{tag.name}</Tag>
      ))}
    </TagList>
  )
}

export default Tags
