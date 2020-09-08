import React from 'react'

interface IProps {
  children: any
  className?: string
}

const Keyword: React.FunctionComponent<IProps> = ({
  children,
  className = '',
}) => {
  return <span className={className}>{children}</span>
}

export default Keyword
