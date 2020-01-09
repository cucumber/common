import React from 'react'

interface IProps {
  children: any
}

const Keyword: React.FunctionComponent<IProps> = ({ children }) => {
  return <span className="keyword">{children}</span>
}

export default Keyword
