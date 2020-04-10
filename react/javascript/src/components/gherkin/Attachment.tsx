import React from 'react'
import { messages } from '@cucumber/messages'
import ErrorMessage from './ErrorMessage'

interface IProps {
  attachment: messages.IAttachment
}

const Attachment: React.FunctionComponent<IProps> = ({ attachment }) => {
  if (attachment.mediaType.match(/^image\//)) {
    return image(attachment)
  } else if (attachment.mediaType.match(/^text\//)) {
    return text(attachment, (s) => s)
  } else if (attachment.mediaType.match(/^application\/json/)) {
    return text(attachment, (s) => JSON.stringify(JSON.parse(s), null, 2))
  } else {
    return (
      <ErrorMessage
        message={`Couldn't display ${attachment.mediaType} data because it's unsupported. Please submit a feature request at https://github.com/cucumber/cucumber/issues`}
      />
    )
  }
}

function image(attachment: messages.IAttachment) {
  if (
    attachment.contentEncoding !== messages.Attachment.ContentEncoding.BASE64
  ) {
    return (
      <ErrorMessage
        message={`Couldn't display ${attachment.mediaType} image because it wasn't base64 encoded`}
      />
    )
  }
  return (
    <img
      alt="Embedded Image"
      src={`data:${attachment.mediaType};base64,${attachment.body}`}
    />
  )
}

function text(
  attachment: messages.IAttachment,
  prettify: (body: string) => string
) {
  if (
    attachment.contentEncoding !== messages.Attachment.ContentEncoding.IDENTITY
  ) {
    return (
      <ErrorMessage
        message={`Couldn't display ${attachment.mediaType} text because it wasn't identity encoded`}
      />
    )
  }
  return <pre className="attachment">{prettify(attachment.body)}</pre>
}

export default Attachment
