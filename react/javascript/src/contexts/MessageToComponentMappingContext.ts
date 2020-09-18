import React from 'react'
import Attachment, { ImageAttachment } from '../components/gherkin/Attachment'
import Attachments from '../components/gherkin/Attachments'

export type IMessageToComponent = {
  attachments?: typeof Attachments
  attachment?: typeof Attachment
  imageAttachment?: typeof ImageAttachment
}

export default React.createContext({} as IMessageToComponent)
