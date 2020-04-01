import { storiesOf } from '@storybook/react'
import { messages } from '@cucumber/messages'
import QueriesWrapper from '../src/components/app/QueriesWrapper'
import StepContainer from '../src/components/gherkin/StepContainer'
import {Query as GherkinQuery} from '@cucumber/gherkin'
import {Query as CucumberQuery} from '@cucumber/query'
import SearchBar from '../src/components/app/SearchBar'
import FilteredResults from '../src/components/app/FilteredResults'
import GherkinDocumentList from '../src/components/app/GherkinDocumentList'
import React from 'react'

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
import minimal from '../../../compatibility-kit/javascript/features/minimal/minimal.ndjson'
// @ts-ignore
import parameterTypes from '../../../compatibility-kit/javascript/features/parameter-types/parameter-types.ndjson'
// @ts-ignore
import rules from '../../../compatibility-kit/javascript/features/rules/rules.ndjson'
// @ts-ignore
import stackTraces from '../../../compatibility-kit/javascript/features/stack-traces/stack-traces.ndjson'

function envelopes(ndjson: string): messages.IEnvelope[] {
  return ndjson.trim().split('\n')
    .map((json: string) => messages.Envelope.fromObject(JSON.parse(json)))
}

function props(ndjson: string): {gherkinQuery: GherkinQuery, cucumberQuery: CucumberQuery} {
  const gherkinQuery = new GherkinQuery()
  const cucumberQuery = new CucumberQuery()
  for (const json of ndjson.trim().split('\n')) {
    const envelope = messages.Envelope.fromObject(JSON.parse(json))
    gherkinQuery.update(envelope)
    cucumberQuery.update(envelope)
  }
  return {gherkinQuery, cucumberQuery}
}

storiesOf('Features', module)
  .add('Step Container', () => {
    return <QueriesWrapper {...props(documentList)}>
      <StepContainer status={messages.TestStepResult.Status.PASSED}>
        <div>Given a passed step</div>
      </StepContainer>
      <StepContainer status={messages.TestStepResult.Status.FAILED}>
        <div>When a failed step</div>
      </StepContainer>
      <StepContainer status={messages.TestStepResult.Status.SKIPPED}>
        <div>Then a skipped step</div>
      </StepContainer>
    </QueriesWrapper>
  })
  .add('Search bar', () => {
    return<QueriesWrapper {...props(documentList)}>
      <SearchBar queryUpdated={(query) => console.log("query:", query)} />
    </QueriesWrapper>
  })
  .add('Filtered results', () => {
    return <QueriesWrapper {...props(documentList)}>
      <FilteredResults />
    </QueriesWrapper>
  })
  .add('Document list', () => {
    return <QueriesWrapper {...props(documentList)}>
      <GherkinDocumentList/>
    </QueriesWrapper>
  })
  .add('Attachments', () => {
    const queries = props(attachments)
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
