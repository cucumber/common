import React from 'react'

interface IProps {
  id: string
}

const AnchorLink: React.FunctionComponent<IProps> = ({ id }) => {
  return <a href={id}>TESTASTOSTESTASTOS</a>
}

export default AnchorLink