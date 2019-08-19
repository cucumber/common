import * as React from 'react'

interface IProps {
  children: string
}

const Tag: React.FunctionComponent<IProps> = ({ children }) => {
  return <li>{children}</li>
}

export default Tag
