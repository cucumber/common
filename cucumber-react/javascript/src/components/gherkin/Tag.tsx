import React from 'react'
import styled from 'styled-components'

interface IProps {
  children: string
}

const Li = styled.li`
  display: inline;
  list-style-type: none;
  padding: 4px 8px 4px 8px;
  margin-right: 6px;
  background-color: #ddd;
  border-radius: 6px;
`

const Tag: React.FunctionComponent<IProps> = ({ children }) => {
  return <Li>{children}</Li>
}

export default Tag
