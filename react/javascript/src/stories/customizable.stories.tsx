import React from 'react'
import { Meta } from '@storybook/react'
import { messages } from '@cucumber/messages'
import { IAttachmentProps } from '../components/gherkin/Attachment'
import CustomizableAttachments from '../components/customizable/CustomizableAttachments'
import CustomizableAttachment from '../components/customizable/CustomizableAttachment'
import CustomizableImageAttachment from '../components/customizable/CustomizableImageAttachment'
import MessageToComponentMappingContext from '../contexts/MessageToComponentMappingContext'
import attachments from '../../acceptance/attachments/attachments'

import Attachments, {
  IAttachmentsProps,
} from '../components/gherkin/Attachments'
import { FilteredResults, QueriesWrapper } from '../index'
import queries from './queries'

// 64x64 #ff0000 png from https://png-pixel.com/
const pngBase64 =
  'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAY0lEQVR42u3QAREAAAQEsJdcdHI4W4TVJJ3HSoAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECLhvAUBsX8GVkqJPAAAAAElFTkSuQmCC'

const textAttachment = messages.Attachment.create({
  body: 'This is a logged string',
  mediaType: 'text/x.cucumber.log+plain',
  contentEncoding: messages.Attachment.ContentEncoding.IDENTITY,
})

const imageAttachment = messages.Attachment.create({
  body: pngBase64,
  mediaType: 'image/png',
  contentEncoding: messages.Attachment.ContentEncoding.BASE64,
})

const CountAttachments: React.FunctionComponent<IAttachmentsProps> = ({
  attachments,
}) => {
  const attachmentsCount = attachments.length
  return (
    <div>
      {attachmentsCount > 0 && <div>Found {attachmentsCount} attachments</div>}
      <Attachments attachments={attachments} />
    </div>
  )
}

const CapitalizedAttachment: React.FunctionComponent<IAttachmentProps> = ({
  attachment,
}) => {
  return <div>{attachment.body.toUpperCase()}</div>
}

const ThumbnailImageAttachment: React.FunctionComponent<IAttachmentProps> = ({
  attachment,
}) => {
  return (
    <div>
      Thumbnail of the image:
      <img
        alt="Embedded Image"
        src={`data:${attachment.mediaType};base64,${attachment.body}`}
        className="cucumber-attachment cucumber-attachment__image"
        style={{ width: '100px', border: '3px solid red' }}
      />
    </div>
  )
}

export default {
  title: 'Customising components',
  component: FilteredResults,
} as Meta

export const MultipleOverrides = () => (
  <QueriesWrapper
    {...queries(attachments)}
    messageToComponentMapping={{
      attachments: CountAttachments,
      imageAttachment: ThumbnailImageAttachment,
    }}
  >
    <FilteredResults />
  </QueriesWrapper>
)

export const NoOverrideAttachments = () => (
  <MessageToComponentMappingContext.Provider value={{}}>
    <CustomizableAttachments attachments={[textAttachment, imageAttachment]} />
  </MessageToComponentMappingContext.Provider>
)

export const OverrideAttachments = () => (
  <MessageToComponentMappingContext.Provider
    value={{ attachments: CountAttachments }}
  >
    <CustomizableAttachments attachments={[textAttachment, imageAttachment]} />
  </MessageToComponentMappingContext.Provider>
)

export const NoOverrideAttachment = () => (
  <MessageToComponentMappingContext.Provider value={{}}>
    <CustomizableAttachment attachment={textAttachment} />
  </MessageToComponentMappingContext.Provider>
)

export const OverrideAttachment = () => (
  <MessageToComponentMappingContext.Provider
    value={{ attachment: CapitalizedAttachment }}
  >
    <CustomizableAttachment attachment={textAttachment} />
  </MessageToComponentMappingContext.Provider>
)

export const NoOverrideImageAttachment = () => (
  <MessageToComponentMappingContext.Provider value={{}}>
    <CustomizableImageAttachment attachment={imageAttachment} />
  </MessageToComponentMappingContext.Provider>
)

export const OverrideImageAttachment = () => (
  <MessageToComponentMappingContext.Provider
    value={{ imageAttachment: ThumbnailImageAttachment }}
  >
    <CustomizableImageAttachment attachment={imageAttachment} />
  </MessageToComponentMappingContext.Provider>
)
