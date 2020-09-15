import React from 'react'
import { messages } from '@cucumber/messages'
// @ts-ignore
import CustomizableAttachment from '../customizable/CustomizableAttachment'

export interface IAttachmentsProps {
  attachments: ReadonlyArray<messages.IAttachment>
}

const Attachments: React.FunctionComponent<IAttachmentsProps> = ({
  attachments,
}) => {
  return (
    <>
      {attachments.map((attachment, i) => (
        <CustomizableAttachment key={i} attachment={attachment} />
      ))}
    </>
  )
}

export default Attachments
