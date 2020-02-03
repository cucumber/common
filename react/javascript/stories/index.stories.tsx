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
import stackTraces from '../../../compatibility-kit/javascript/features/stack-traces/stack-traces.ndjson'


function envelopes(ndjson: string): messages.IEnvelope[] {
  return ndjson.trim().split('\n')
    .map((json: string) => messages.Envelope.fromObject(JSON.parse(json)))
}

storiesOf('Features', module)
  .add('Step Container', () => {
    return <StepContainer status={messages.TestResult.Status.PASSED}>Hello</StepContainer>
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
  .add('Stack Traces', () => {
    return <Wrapper envelopes={envelopes(stackTraces)}>
      <GherkinDocumentList/>
    </Wrapper>
  })
