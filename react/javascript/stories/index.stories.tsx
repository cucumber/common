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
import minimal from '../../../compatibility-kit/javascript/features/minimal/minimal.ndjson'
// @ts-ignore
import parameterTypes from '../../../compatibility-kit/javascript/features/parameter-types/parameter-types.ndjson'
// @ts-ignore
import rules from '../../../compatibility-kit/javascript/features/rules/rules.ndjson'
// @ts-ignore
import stackTraces from '../../../compatibility-kit/javascript/features/stack-traces/stack-traces.ndjson'
import Step from '../src/components/gherkin/Step'


function envelopes(ndjson: string): messages.IEnvelope[] {
  return ndjson.trim().split('\n')
    .map((json: string) => messages.Envelope.fromObject(JSON.parse(json)))
}

storiesOf('Features', module)
  .add('Step Container', () => {
    return <Wrapper envelopes={[]} btoa={window.btoa}>
      <StepContainer status={messages.TestStepResult.Status.PASSED}>
        <div>Given a passed step</div>
      </StepContainer>
      <StepContainer status={messages.TestStepResult.Status.FAILED}>
        <div>When a failed step</div>
      </StepContainer>
      <StepContainer status={messages.TestStepResult.Status.SKIPPED}>
        <div>Then a skipped step</div>
      </StepContainer>
    </Wrapper>
  })
  .add('Document list', () => {
    return <Wrapper envelopes={envelopes(documentList)} btoa={window.btoa}>
      <GherkinDocumentList/>
    </Wrapper>
  })
  .add('Attachments', () => {
    return <Wrapper envelopes={envelopes(attachments)} btoa={window.btoa}>
      <GherkinDocumentList/>
    </Wrapper>
  })
  .add('Examples Tables', () => {
    return <Wrapper envelopes={envelopes(examplesTables)} btoa={window.btoa}>
      <GherkinDocumentList/>
    </Wrapper>
  })
  .add('Data Tables', () => {
    return <Wrapper envelopes={envelopes(dataTables)} btoa={window.btoa}>
      <GherkinDocumentList/>
    </Wrapper>
  })
  .add('Hooks', () => {
    return <Wrapper envelopes={envelopes(hooks)} btoa={window.btoa}>
      <GherkinDocumentList/>
    </Wrapper>
  })
  .add('Minimal', () => {
    return <Wrapper envelopes={envelopes(minimal)} btoa={window.btoa}>
      <GherkinDocumentList/>
    </Wrapper>
  })
  .add('Parameter Types', () => {
    return <Wrapper envelopes={envelopes(parameterTypes)} btoa={window.btoa}>
      <GherkinDocumentList/>
    </Wrapper>
  })
  .add('Rules', () => {
    return <Wrapper envelopes={envelopes(rules)} btoa={window.btoa}>
      <GherkinDocumentList/>
    </Wrapper>
  })
  .add('Stack Traces', () => {
    return <Wrapper envelopes={envelopes(stackTraces)} btoa={window.btoa}>
      <GherkinDocumentList/>
    </Wrapper>
  })
