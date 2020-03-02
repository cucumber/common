import React from 'react'
import marked from 'marked'
import sanitizeHtml from 'sanitize-html'

interface IProps {
  description: string
}

const sanitize = (toSanitize: string) => {
  return sanitizeHtml(toSanitize)
}

const markdown = (toMarkdown: string) => {
  const sanitized = sanitize(toMarkdown)
  const convertedToMarkdown = marked(sanitized)
  return { __html: convertedToMarkdown }
}

const Description: React.FunctionComponent<IProps> = ({ description }) => {
  return (
    <p>
      <div dangerouslySetInnerHTML={markdown(description)} />
    </p>
  )
}

export default Description
