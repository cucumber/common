import React from 'react'
import { storiesOf } from "@storybook/react";
import { messages } from '@cucumber/messages';
import { IAttachmentProps } from '../src/components/gherkin/Attachment';
import CustomizableAttachment from '../src/components/customizable/CustomizableAttachment';
import CustomizableImageAttachment from '../src/components/customizable/CustomizableImageAttachment';
import MessageToComponentMappingContext, { defaultMessageToComponentMapping } from '../src/contexts/MessageToComponentMappingContext';

// @ts-ignore
import pngBase64 from '../testdata/images/cucumber-base64.txt'

const textAttachment = messages.Attachment.create({
  body: "This is a logged string",
  mediaType: 'text/x.cucumber.log+plain',
  contentEncoding: messages.Attachment.ContentEncoding.IDENTITY
})

const imageAttachment = messages.Attachment.create({
  body: pngBase64,
  mediaType: 'iamge/png',
  contentEncoding: messages.Attachment.ContentEncoding.BASE64
})

storiesOf('CustomizableAttachment', module)
  .add('Uses @cucumber/react/components/gherkin/Attachment by default', () => {
    return (
      <MessageToComponentMappingContext.Provider value={defaultMessageToComponentMapping}>
        <CustomizableAttachment attachment={textAttachment} />
      </MessageToComponentMappingContext.Provider>
    )
  })
  .add('Can be overriden to use a custom component', () => {

    const CapitalizedAttachment: React.FunctionComponent<IAttachmentProps> = ({
      attachment,
    }) => {
      return <div>{attachment.body.toUpperCase()}</div>
    }

    const overridenComponents = {
      ...defaultMessageToComponentMapping,
      ...{attachment: CapitalizedAttachment}
    }

    return (
      <MessageToComponentMappingContext.Provider value={overridenComponents}>
        <CustomizableAttachment attachment={textAttachment} />
      </MessageToComponentMappingContext.Provider>
    )
  })

  storiesOf('CustomizableImageAttachment', module)
  .add('Uses @cucumber/react/components/gherkin/ImageAttachment by default', () => {
    return (
      <MessageToComponentMappingContext.Provider value={defaultMessageToComponentMapping}>
        <CustomizableImageAttachment attachment={imageAttachment} />
      </MessageToComponentMappingContext.Provider>
    )
  })
  .add('Can be overriden to use a custom component', () => {
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

    const overridenComponents = {
      ...defaultMessageToComponentMapping,
      ...{imageAttachment: ThumbnailImageAttachment}
    }

    return (
      <MessageToComponentMappingContext.Provider value={overridenComponents}>
        <CustomizableImageAttachment attachment={imageAttachment} />
      </MessageToComponentMappingContext.Provider>
    )
  })