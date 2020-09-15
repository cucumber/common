import React from 'react'
import Attachment, { ImageAttachment } from '../components/gherkin/Attachment'
import Attachments from '../components/gherkin/Attachments'

export const defaultMessageToComponentMapping = {
  attachments: Attachments,
  attachment: Attachment,
  imageAttachment: ImageAttachment,
}

export default React.createContext(defaultMessageToComponentMapping)
