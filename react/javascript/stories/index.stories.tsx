import { storiesOf } from '@storybook/react'
import React from 'react'
import { messages } from '@cucumber/messages'
import GherkinDocumentList from '../src/components/app/GherkinDocumentList'
import '../src/styles/react-accessible-accordion.css'
import '../src/styles/styles.css'
// @ts-ignore
import ndjson from '../testdata/all.ndjson'
import Wrapper from '../src/components/app/Wrapper'

const envelopes: messages.IEnvelope[] = ndjson.trim().split('\n')
  .map((json: string) => messages.Envelope.fromObject(JSON.parse(json)))

storiesOf('Features', module)
  .add('Document list', () => {
    return <Wrapper envelopes={envelopes}>
      <GherkinDocumentList/>
    </Wrapper>
  })
