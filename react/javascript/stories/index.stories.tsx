import React from 'react'
import { storiesOf } from '@storybook/react'

import { messages } from '@cucumber/messages'
import { Query as CucumberQuery } from '@cucumber/query'
import { Query as GherkinQuery } from '@cucumber/gherkin'
import Attachment from '../src/components/gherkin/Attachment'
import FilteredResults from '../src/components/app/FilteredResults'
import GherkinDocumentList from '../src/components/app/GherkinDocumentList'
import QueriesWrapper from '../src/components/app/QueriesWrapper'
import SearchBar from '../src/components/app/SearchBar'
import StepContainer from '../src/components/gherkin/StepContainer'
import HighLight from '../src/components/app/HighLight'
import Duration from '../src/components/app/Duration'

import '../src/styles/react-accessible-accordion.css'
import '../src/styles/styles.scss'

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
// @ts-ignore
import cucumberRuby from './cucumber-ruby.ndjson'

// @ts-ignore
import mp4Base64 from '../testdata/video/sample.mp4.txt'
import { EnvelopesQuery } from '../src/EnvelopesQueryContext'

function props(ndjson: string): { gherkinQuery: GherkinQuery, cucumberQuery: CucumberQuery, envelopesQuery: EnvelopesQuery } {
  const gherkinQuery = new GherkinQuery()
  const cucumberQuery = new CucumberQuery()
  const envelopesQuery = new EnvelopesQuery()
  for (const json of ndjson.trim().split('\n')) {
    const envelope = messages.Envelope.fromObject(JSON.parse(json))
    gherkinQuery.update(envelope)
    cucumberQuery.update(envelope)
    envelopesQuery.update(envelope)
  }
  return {gherkinQuery, cucumberQuery, envelopesQuery}
}

storiesOf('Features', module)
  .add('Step Container', () => {
    return <QueriesWrapper {...props(documentList)}>
      <div className="cucumber-steps">
        <StepContainer status={messages.TestStepFinished.TestStepResult.Status.PASSED}>
          <div>Given a passed step</div>
        </StepContainer>
        <StepContainer status={messages.TestStepFinished.TestStepResult.Status.FAILED}>
          <div>When a failed step</div>
        </StepContainer>
        <StepContainer status={messages.TestStepFinished.TestStepResult.Status.SKIPPED}>
          <div>Then a skipped step</div>
        </StepContainer>
      </div>
    </QueriesWrapper>
  })
  .add('Search bar', () => {
    return<QueriesWrapper {...props(documentList)}>
      <SearchBar
        queryUpdated={(query) => console.log("query:", query)}
        statusesUpdated={(statuses) => console.log("statuses:", statuses)}
        enabledStatuses={[]}
        scenarioCountByStatus={new Map<messages.TestStepFinished.TestStepResult.Status, number>()}
      />
    </QueriesWrapper>
  })
  .add('Filtered results', () => {
    return <QueriesWrapper {...props(documentList)}>
      <FilteredResults />
    </QueriesWrapper>
  })
  .add('Large input', () => {
    return <QueriesWrapper {...props(cucumberRuby)}>
      <FilteredResults />
    </QueriesWrapper>
  })
  .add('Filtered results: attachments', () => {
    return <QueriesWrapper {...props(attachments)}>
      <FilteredResults />
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
  .add('HighLight', () => {
    const gherkinQuery = new GherkinQuery()
    const cucumberQuery = new CucumberQuery()
    const envelopesQuery = new EnvelopesQuery()
    const query = "et dolore co"

    return <QueriesWrapper
      gherkinQuery={gherkinQuery}
      cucumberQuery={cucumberQuery}
      envelopesQuery={envelopesQuery}
      query={ query }
      >
      <h1> Highligthing: { query } </h1>
      <p>
      <HighLight text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
      </p>
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

  storiesOf('Durations', module)
    .add('sub second', () => {
      return <Duration durationMillis={123} />
    })
    .add('sub minutes', () => {
      return <ul>
        <li> with millis: <Duration durationMillis={12300} /></li>
        <li> no millis: <Duration durationMillis={12000} /></li>
      </ul>
    })
    .add('sub hours', () => {
      return <ul>
        <li> with seconds: <Duration durationMillis={312301} /></li>
        <li> no seconds: <Duration durationMillis={120000} /></li>
      </ul>
    })
    .add('sub days', () => {
      return <ul>
        <li> with minutes: <Duration durationMillis={3660000} /></li>
        <li> no minutes: <Duration durationMillis={3600000} /></li>
      </ul>
    })
    .add('more than a day', () => {
      return <ul>
        <li> all fields sets: <Duration durationMillis={25*3600000 + 61234} /></li>
        <li> just days: <Duration durationMillis={24 * 3600000} /></li>
      </ul>
    })