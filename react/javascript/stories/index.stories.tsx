import { storiesOf } from '@storybook/react'
import React from 'react'
import { messages } from '@cucumber/messages'
import GherkinDocumentList from '../src/components/app/GherkinDocumentList'
import '../src/styles/react-accessible-accordion.css'
import '../src/styles/styles.scss'
import QueriesWrapper from '../src/components/app/QueriesWrapper'
import StepContainer from '../src/components/gherkin/StepContainer'
import { Query as GherkinQuery } from '@cucumber/gherkin'
import { Query as CucumberQuery } from '@cucumber/query'
// @ts-ignore
import documentList from '../testdata/all.ndjson'
// @ts-ignore
import attachments from '../../../compatibility-kit/javascript/features/attachments/attachments.ndjson'
// @ts-ignore
import dataTables from '../../../compatibility-kit/javascript/features/data-tables/data-tables.ndjson'
// @ts-ignore
import examplesTables from '../../../compatibility-kit/javascript/features/examples-tables/examples-tables.ndjson'
// @ts-ignore
import hooks from '../../../compatibility-kit/javascript/features/hooks/hooks.ndjson'
// @ts-ignore
import hooks2 from '../testdata/hooks.ndjson'
// @ts-ignore
import minimal from '../../../compatibility-kit/javascript/features/minimal/minimal.ndjson'
// @ts-ignore
import parameterTypes from '../../../compatibility-kit/javascript/features/parameter-types/parameter-types.ndjson'
// @ts-ignore
import rules from '../../../compatibility-kit/javascript/features/rules/rules.ndjson'
// @ts-ignore
import stackTraces from '../../../compatibility-kit/javascript/features/stack-traces/stack-traces.ndjson'
import Attachment from '../src/components/gherkin/Attachment'

// @ts-ignore
import mp4Base64 from '../testdata/video/sample.mp4.txt'

function props(ndjson: string): { gherkinQuery: GherkinQuery, cucumberQuery: CucumberQuery } {
  const gherkinQuery = new GherkinQuery()
  const cucumberQuery = new CucumberQuery()
  for (const json of ndjson.trim().split('\n')) {
    const envelope = messages.Envelope.fromObject(JSON.parse(json))
    gherkinQuery.update(envelope)
    cucumberQuery.update(envelope)
  }
  return { gherkinQuery, cucumberQuery }
}

storiesOf('Features', module)
  .add('Step Container', () => {
    return <QueriesWrapper {...props(documentList)}>
      <StepContainer status={messages.TestStepFinished.TestStepResult.Status.PASSED}>
        <div>Given a passed step</div>
      </StepContainer>
      <StepContainer status={messages.TestStepFinished.TestStepResult.Status.FAILED}>
        <div>When a failed step</div>
      </StepContainer>
      <StepContainer status={messages.TestStepFinished.TestStepResult.Status.SKIPPED}>
        <div>Then a skipped step</div>
      </StepContainer>
    </QueriesWrapper>
  })
  .add('Document list', () => {
    return <QueriesWrapper {...props(documentList)}>
      <GherkinDocumentList/>
    </QueriesWrapper>
  })
  .add('Attachments', () => {
    return <QueriesWrapper {...props(attachments)}>
      <GherkinDocumentList/>
    </QueriesWrapper>
  })
  .add('Examples Tables', () => {
    return <QueriesWrapper {...props(examplesTables)}>
      <GherkinDocumentList/>
    </QueriesWrapper>
  })
  .add('Data Tables', () => {
    return <QueriesWrapper {...props(dataTables)}>
      <GherkinDocumentList/>
    </QueriesWrapper>
  })
  .add('Hooks', () => {
    return <QueriesWrapper {...props(hooks)}>
      <GherkinDocumentList/>
    </QueriesWrapper>
  })
  .add('Hooks2', () => {
    return <QueriesWrapper {...props(hooks2)}>
      <GherkinDocumentList/>
    </QueriesWrapper>
  })
  .add('Minimal', () => {
    return <QueriesWrapper {...props(minimal)}>
      <GherkinDocumentList/>
    </QueriesWrapper>
  })
  .add('Parameter Types', () => {
    return <QueriesWrapper {...props(parameterTypes)}>
      <GherkinDocumentList/>
    </QueriesWrapper>
  })
  .add('Rules', () => {
    return <QueriesWrapper {...props(rules)}>
      <GherkinDocumentList/>
    </QueriesWrapper>
  })
  .add('Stack Traces', () => {
    return <QueriesWrapper {...props(stackTraces)}>
      <GherkinDocumentList/>
    </QueriesWrapper>
  })
storiesOf('Attachments', module)
  .add('text/plain identity encoded', () => {
    return <Attachment attachment={messages.Attachment.create({
      mediaType: 'text/plain',
      contentEncoding: messages.Attachment.ContentEncoding.IDENTITY,
      body: 'This text is identity encoded',
    })}/>
  })
  .add('text/plain base64 encoded', () => {
    return <Attachment attachment={messages.Attachment.create({
      mediaType: 'text/plain',
      contentEncoding: messages.Attachment.ContentEncoding.BASE64,
      body: btoa('This text is base64 encoded'),
    })}/>
  })
  .add('application/json', () => {
    return <Attachment attachment={messages.Attachment.create({
      mediaType: 'application/json',
      contentEncoding: messages.Attachment.ContentEncoding.IDENTITY,
      body: '{"this": "is", "json": true}',
    })}/>
  })
  .add('video/mp4', () => {
    return <Attachment attachment={messages.Attachment.create({
      mediaType: 'video/mp4',
      contentEncoding: messages.Attachment.ContentEncoding.BASE64,
      body: mp4Base64,
    })}/>
  })
