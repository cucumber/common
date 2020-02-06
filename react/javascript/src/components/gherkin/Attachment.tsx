import React from 'react'
import { messages } from '@cucumber/messages'
import ErrorMessage from './ErrorMessage'

interface IProps {
  attachment: messages.IAttachment
}

const Attachment: React.FunctionComponent<IProps> = ({ attachment }) => {
  if (attachment.mediaType.match(/^image\//)) {
    const base64 = bytesToBase64(attachment.binary)
    return (
      <img
        alt="Embedded Image"
        src={`data:${attachment.mediaType};base64,${base64}`}
      />
    )
  } else if (attachment.mediaType.match(/^text\//)) {
    return <pre className="attachment">{attachment.text}</pre>
  } else {
    return (
      <ErrorMessage
        message={`Can't display attachment with media type ${attachment.mediaType}`}
      />
    )
  }
}

function bytesToBase64(buffer: Uint8Array): string {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  const len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

export default Attachment
