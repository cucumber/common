import * as React from 'react'

interface IProps {
  children: string
}

const Keyword: React.FunctionComponent<IProps> = ({ children }) => {
  return <span>{children}</span>
}

export default Keyword
