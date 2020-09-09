import React from 'react'
import { storiesOf } from "@storybook/react";
import { messages } from '@cucumber/messages';
import CustomizableAttachment from '../test/components/customizable/CustomizableAttachment';
import { IAttachmentProps } from '../src/components/gherkin/Attachment';
import MessageToComponentMappingContext, { defaultMessageToComponentMapping } from '../src/contexts/MessageToComponentMappingContext';

storiesOf('CustomizableAttachment', module)
  .add('Uses @cucumber/react/components/gherkin/Attachment by default', () => {
    const attachment = messages.Attachment.create({
      body: "This is a logged string",
      mediaType: 'text/x.cucumber.log+plain',
      contentEncoding: messages.Attachment.ContentEncoding.IDENTITY
    })
    return (
      <MessageToComponentMappingContext.Provider value={defaultMessageToComponentMapping}>
        <CustomizableAttachment attachment={attachment} />
      </MessageToComponentMappingContext.Provider>
    )
  })
  .add('Can be overriden to use a custom component', () => {
    const attachment = messages.Attachment.create({
      body: "This is a logged string",
      mediaType: 'text/x.cucumber.log+plain',
      contentEncoding: messages.Attachment.ContentEncoding.IDENTITY
    })

    const CapitalizedAttachment: React.FunctionComponent<IAttachmentProps> = ({
      attachment,
    }) => {
      return <div>{attachment.body.toUpperCase()}</div>
    }

    return (
      <MessageToComponentMappingContext.Provider value={{attachment: CapitalizedAttachment}}>
        <CustomizableAttachment attachment={attachment} />
      </MessageToComponentMappingContext.Provider>
    )
  })