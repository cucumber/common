import React from 'react'
import marked from 'marked'
import sanitizeHtml from 'sanitize-html'

interface IProps {
  description: string
}

const Description: React.FunctionComponent<IProps> = ({ description }) => {
  const html = marked(description)
  const sanitizedHtml = sanitizeHtml(html)
  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
}

export default Description
