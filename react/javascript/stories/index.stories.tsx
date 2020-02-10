import { storiesOf } from '@storybook/react'
import React from 'react'
import { messages } from '@cucumber/messages'
import GherkinDocumentList from '../src/components/app/GherkinDocumentList'
import '../src/styles/react-accessible-accordion.css'
import '../src/styles/styles.scss'
import Wrapper from '../src/components/app/Wrapper'
import StepContainer from '../src/components/gherkin/StepContainer'

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
import parameterTypes from '../../../compatibility-kit/javascript/features/parameter-types/parameter-types.ndjson'
// @ts-ignore
import rules from '../../../compatibility-kit/javascript/features/rules/rules.ndjson'
// @ts-ignore
import stackTraces from '../../../compatibility-kit/javascript/features/stack-traces/stack-traces.ndjson'
import Step from '../src/components/gherkin/Step'
import SearchBar from '../src/components/app/SearchBar'

function envelopes(ndjson: string): messages.IEnvelope[] {
  return ndjson.trim().split('\n')
    .map((json: string) => messages.Envelope.fromObject(JSON.parse(json)))
}

storiesOf('Features', module)
  .add('Step Container', () => {
    return <Wrapper envelopes={[]}>
      <StepContainer status={messages.TestResult.Status.PASSED}>
        <div>Given a passed step</div>
      </StepContainer>
      <StepContainer status={messages.TestResult.Status.FAILED}>
        <div>When a failed step</div>
      </StepContainer>
      <StepContainer status={messages.TestResult.Status.SKIPPED}>
        <div>Then a skipped step</div>
      </StepContainer>
    </Wrapper>
  })
  .add('Search bar', () => {
    return <Wrapper envelopes={[]}>
      <SearchBar queryUpdated={(query) => console.log("query:", query)} />
    </Wrapper>
  })
  .add('Document list', () => {
    return <Wrapper envelopes={envelopes(documentList)}>
      <GherkinDocumentList/>
    </Wrapper>
  })
  .add('Attachments', () => {
    return <Wrapper envelopes={envelopes(attachments)}>
      <GherkinDocumentList/>
    </Wrapper>
  })
  .add('Examples Tables', () => {
    return <Wrapper envelopes={envelopes(examplesTables)}>
      <GherkinDocumentList/>
    </Wrapper>
  })
  .add('Data Tables', () => {
    return <Wrapper envelopes={envelopes(dataTables)}>
      <GherkinDocumentList/>
    </Wrapper>
  })
  .add('Hooks', () => {
    return <Wrapper envelopes={envelopes(hooks)}>
      <GherkinDocumentList/>
    </Wrapper>
  })
  .add('Parameter Types', () => {
    return <Wrapper envelopes={envelopes(parameterTypes)}>
      <GherkinDocumentList/>
    </Wrapper>
  })
  .add('Rules', () => {
    return <Wrapper envelopes={envelopes(rules)}>
      <GherkinDocumentList/>
    </Wrapper>
  })
  .add('Stack Traces', () => {
    return <Wrapper envelopes={envelopes(stackTraces)}>
      <GherkinDocumentList/>
    </Wrapper>
  })
