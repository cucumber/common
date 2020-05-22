import React from 'react'
import { messages } from '@cucumber/messages'
import ErrorMessage from './ErrorMessage'
import { faPaperclip } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface IProps {
  attachment: messages.IAttachment
}

const Attachment: React.FunctionComponent<IProps> = ({ attachment }) => {
  if (attachment.mediaType.match(/^image\//)) {
    return image(attachment)
  } else if (attachment.mediaType.match(/^video\//)) {
    return video(attachment)
  } else if (attachment.mediaType.match(/^text\//)) {
    return text(attachment, (s) => s)
  } else if (attachment.mediaType.match(/^application\/json/)) {
    return text(attachment, prettyJSON())
  } else {
    return (
      <ErrorMessage
        message={`Couldn't display ${attachment.mediaType} attachment because the media type is unsupported. Please submit a feature request at https://github.com/cucumber/cucumber/issues`}
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
      className="attachment-image"
    />
  )
}

function video(attachment: messages.IAttachment) {
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
    <video controls>
      <source src={`data:${attachment.mediaType};base64,${attachment.body}`} />
      Your browser is unable to display video
    </video>
  )
}

function base64Decode(body: string) {
  // @ts-ignore
  if (typeof global.atob === 'function') {
    // @ts-ignore
    return global.atob(body)
  } else if (typeof global.Buffer === 'function') {
    return global.Buffer.from(body, 'base64').toString('utf8')
  } else {
    throw new Error()
  }
}

function text(
  attachment: messages.IAttachment,
  prettify: (body: string) => string
) {
  const body =
    attachment.contentEncoding === messages.Attachment.ContentEncoding.IDENTITY
      ? attachment.body
      : base64Decode(attachment.body)
  return (
    <pre className="attachment">
      <FontAwesomeIcon icon={faPaperclip} className="attachment-icon" />
      {prettify(body)}
    </pre>
  )
}

function prettyJSON() {
  return (s: string) => {
    try {
      return JSON.stringify(JSON.parse(s), null, 2)
    } catch (ignore) {
      return s
    }
  }
}

export default Attachment
