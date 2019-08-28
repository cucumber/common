import React from 'react'
import styled from 'styled-components'

interface IProps {
  children: any
}

const KeywordSpan = styled.span`
  font-weight: bold;
`

const Keyword: React.FunctionComponent<IProps> = ({ children }) => {
  return <KeywordSpan>{children}</KeywordSpan>
}

export default Keyword
