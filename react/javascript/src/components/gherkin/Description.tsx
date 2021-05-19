import React from 'react'
import HighLight from '../app/HighLight'

interface IProps {
  description: string
}

const Description: React.FunctionComponent<IProps> = ({ description }) => {
  if (description && description.trim() !== '') {
    return <HighLight className="cucumber-description" text={description} markdown={true} />
  }
  return null
}

export default Description
