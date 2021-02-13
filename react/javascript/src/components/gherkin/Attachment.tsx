import React from 'react'
import { messages } from '@cucumber/messages'
import ErrorMessage from './ErrorMessage'
import { faPaperclip } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// @ts-ignore
import Convert from 'ansi-to-html'

interface IProps {
  attachment: messages.IAttachment
}

const Attachment: React.FunctionComponent<IProps> = ({ attachment }) => {
  if (attachment.mediaType.match(/^image\//)) {
    return image(attachment)
  } else if (attachment.mediaType.match(/^video\//)) {
    return video(attachment)
  } else if (attachment.mediaType == 'text/x.cucumber.log+plain') {
    return text(attachment, prettyANSI, true)
  } else if (attachment.mediaType.match(/^text\//)) {
    return text(attachment, (s) => s, false)
  } else if (attachment.mediaType.match(/^application\/json/)) {
    return text(attachment, prettyJSON, false)
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
        className="cucumber-attachment"
        message={`Couldn't display ${attachment.mediaType} image because it wasn't base64 encoded`}
      />
    )
  }
  return (
    <details>
      <summary>Attached Image</summary>
      <img
        alt="Embedded Image"
        src={`data:${attachment.mediaType};base64,${attachment.body}`}
        className="cucumber-attachment cucumber-attachment__image"
      />
    </details>
  )
}

function video(attachment: messages.IAttachment) {
  if (
    attachment.contentEncoding !== messages.Attachment.ContentEncoding.BASE64
  ) {
    return (
      <ErrorMessage
        className="cucumber-attachment"
        message={`Couldn't display ${attachment.mediaType} video because it wasn't base64 encoded`}
      />
    )
  }
  return (
    <details>
      <summary>Attached Video</summary>
      <video controls>
        <source
          src={`data:${attachment.mediaType};base64,${attachment.body}`}
        />
        Your browser is unable to display video
      </video>
    </details>
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
  prettify: (body: string) => string,
  dangerouslySetInnerHTML: boolean
) {
  const body =
    attachment.contentEncoding === messages.Attachment.ContentEncoding.IDENTITY
      ? attachment.body
      : base64Decode(attachment.body)

  if (dangerouslySetInnerHTML) {
    return (
      <pre className="cucumber-attachment cucumber-attachment__text">
        <FontAwesomeIcon
          icon={faPaperclip}
          className="cucumber-attachment__icon"
        />
        <span dangerouslySetInnerHTML={{ __html: prettify(body) }} />
      </pre>
    )
  }
  return (
    <pre className="cucumber-attachment cucumber-attachment__text">
      <FontAwesomeIcon
        icon={faPaperclip}
        className="cucumber-attachment__icon"
      />
      {prettify(body)}
    </pre>
  )
}

function prettyJSON(s: string) {
  try {
    return JSON.stringify(JSON.parse(s), null, 2)
  } catch (ignore) {
    return s
  }
}

function prettyANSI(s: string) {
  return new Convert().toHtml(s)
}

export default Attachment
