import React from 'react'
import Attachment, { ImageAttachment } from '../components/gherkin/Attachment'

export const defaultMessageToComponentMapping = {
  attachment: Attachment,
  imageAttachment: ImageAttachment,
}

export default React.createContext(defaultMessageToComponentMapping)
