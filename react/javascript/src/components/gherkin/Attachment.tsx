import React from 'react'
import { messages } from '@cucumber/messages'
import ErrorMessage from './ErrorMessage'

interface IProps {
  attachment: messages.IAttachment
}

const Attachment: React.FunctionComponent<IProps> = ({ attachment }) => {
  switch (attachment.contentEncoding) {
    case messages.Attachment.ContentEncoding.BASE64:
      if (attachment.mediaType.match(/^image\//)) {
        return (
          <img
            alt="Embedded Image"
            src={`data:${attachment.mediaType};base64,${attachment.body}`}
          />
        )
      } else {
        return (
          <ErrorMessage
            message={`Can't display base64 encoded attachment with media type '${attachment.mediaType}'`}
          />
        )
      }
    case messages.Attachment.ContentEncoding.IDENTITY:
      if (attachment.mediaType.match(/^text\//)) {
        return <pre className="attachment">{attachment.body}</pre>
      } else {
        return (
          <ErrorMessage
            message={`Can't display plain text attachment with media type '${attachment.mediaType}'`}
          />
        )
      }
  }
}

export default Attachment
