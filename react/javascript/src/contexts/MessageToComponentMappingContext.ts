import React from 'react'
import Attachment from '../components/gherkin/Attachment'

export const defaultMessageToComponentMapping = {
  attachment: Attachment,
}

export default React.createContext(defaultMessageToComponentMapping)
