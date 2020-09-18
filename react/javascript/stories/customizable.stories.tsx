import React from 'react'
import { storiesOf } from "@storybook/react";
import { messages } from '@cucumber/messages';
import Attachment, { IAttachmentProps } from '../src/components/gherkin/Attachment';
import CustomizableAttachments from '../src/components/customizable/CustomizableAttachments';
import CustomizableAttachment from '../src/components/customizable/CustomizableAttachment';
import CustomizableImageAttachment from '../src/components/customizable/CustomizableImageAttachment';
import MessageToComponentMappingContext from '../src/contexts/MessageToComponentMappingContext';
import { Query as CucumberQuery } from '@cucumber/query'
import { Query as GherkinQuery } from '@cucumber/gherkin'

// @ts-ignore
import pngBase64 from '../testdata/images/cucumber-base64.txt'
// @ts-ignore
import attachments from '../../../compatibility-kit/javascript/features/attachments/attachments.ndjson'


import Attachments, { IAttachmentsProps } from '../src/components/gherkin/Attachments';
import { EnvelopesQuery, QueriesWrapper, FilteredResults } from '../src';

const textAttachment = messages.Attachment.create({
  body: "This is a logged string",
  mediaType: 'text/x.cucumber.log+plain',
  contentEncoding: messages.Attachment.ContentEncoding.IDENTITY
})

const imageAttachment = messages.Attachment.create({
  body: pngBase64,
  mediaType: 'image/png',
  contentEncoding: messages.Attachment.ContentEncoding.BASE64
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
  return <div>
    Thumbnail of the image:
    <img
      alt="Embedded Image"
      src={`data:${attachment.mediaType};base64,${attachment.body}`}
      className="cucumber-attachment cucumber-attachment__image"
      style={{width: '100px', border: '3px solid red'}}
    />
  </div>
}

storiesOf('Customizing components', module)
  .add('many overrides can be set when instanciating QueriesWrapper', () => {
    const gherkinQuery = new GherkinQuery()
    const cucumberQuery = new CucumberQuery()
    const envelopesQuery = new EnvelopesQuery()
    for (const json of attachments.trim().split('\n')) {
      const envelope = messages.Envelope.fromObject(JSON.parse(json))
      gherkinQuery.update(envelope)
      cucumberQuery.update(envelope)
      envelopesQuery.update(envelope)
    }

    return <QueriesWrapper
      cucumberQuery={cucumberQuery}
      gherkinQuery={gherkinQuery}
      envelopesQuery={envelopesQuery}
      messageToComponentMapping={{
        attachments: CountAttachments,
        imageAttachment: ThumbnailImageAttachment
      }}
    >
      <FilteredResults />
    </QueriesWrapper>
  })

storiesOf('CustomizableAttachments', module)
  .add('Uses @cucumber/react/components/gherkin/Attachments by default', () => {
    return (
      <MessageToComponentMappingContext.Provider value={{}}>
        <CustomizableAttachments attachments={[textAttachment, imageAttachment]} />
      </MessageToComponentMappingContext.Provider>
    )
  })
  .add('Can be overriden to use a custom component', () => {
    const overridenComponents = {attachments: CountAttachments}

    return (
      <MessageToComponentMappingContext.Provider value={overridenComponents}>
        <CustomizableAttachments attachments={[textAttachment, imageAttachment]} />
      </MessageToComponentMappingContext.Provider>
    )
  })

storiesOf('CustomizableAttachment', module)
  .add('Uses @cucumber/react/components/gherkin/Attachment by default', () => {
    return (
      <MessageToComponentMappingContext.Provider value={{}}>
        <CustomizableAttachment attachment={textAttachment} />
      </MessageToComponentMappingContext.Provider>
    )
  })
  .add('Can be overriden to use a custom component', () => {
    const overridenComponents = {attachment: CapitalizedAttachment}

    return (
      <MessageToComponentMappingContext.Provider value={overridenComponents}>
        <CustomizableAttachment attachment={textAttachment} />
      </MessageToComponentMappingContext.Provider>
    )
  })

storiesOf('CustomizableImageAttachment', module)
  .add('Uses @cucumber/react/components/gherkin/ImageAttachment by default', () => {
    return (
      <MessageToComponentMappingContext.Provider value={{}}>
        <CustomizableImageAttachment attachment={imageAttachment} />
      </MessageToComponentMappingContext.Provider>
    )
  })
  .add('Can be overriden to use a custom component', () => {
    const overridenComponents = {imageAttachment: ThumbnailImageAttachment}

    return (
      <MessageToComponentMappingContext.Provider value={overridenComponents}>
        <CustomizableImageAttachment attachment={imageAttachment} />
      </MessageToComponentMappingContext.Provider>
    )
  })