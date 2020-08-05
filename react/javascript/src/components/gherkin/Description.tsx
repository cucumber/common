import React from 'react'
import marked from 'marked'
import sanitizeHtml from 'sanitize-html'
import HighLight from '../app/HighLight'

interface IProps {
  description: string
  className?: string
}

const Description: React.FunctionComponent<IProps> = ({
  description,
  className = '',
}) => {
  const html = marked(description)
  const sanitizedHtml = sanitizeHtml(html)

  return (
    <HighLight className={className} text={sanitizedHtml} htmlText={true} />
  )
}

export default Description
