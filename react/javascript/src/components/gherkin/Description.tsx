import React from 'react'
import HighLight from '../app/HighLight'

interface IProps {
  description: string
}

const Description: React.FunctionComponent<IProps> = ({ description }) => {
  return (
    <HighLight
      className="cucumber-description"
      text={description}
      markdown={true}
    />
  )
}

export default Description
