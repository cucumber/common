import * as messages from '@cucumber/messages'
import { components, EnvelopesQuery, searchFromURLParams } from '@cucumber/react'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import { Query as CucumberQuery } from '@cucumber/query'
import React from 'react'
import ReactDOM from 'react-dom'
import './styles.scss'

const { CucumberReact } = components
const { FilteredResults, QueriesWrapper } = components.app

declare global {
  interface Window {
    CUCUMBER_MESSAGES: messages.Envelope[]
  }
}

const gherkinQuery = new GherkinQuery()
const cucumberQuery = new CucumberQuery()
const envelopesQuery = new EnvelopesQuery()

for (const envelope of window.CUCUMBER_MESSAGES as messages.Envelope[]) {
  gherkinQuery.update(envelope)
  cucumberQuery.update(envelope)
  envelopesQuery.update(envelope)
}

const app = (
  <CucumberReact>
    <QueriesWrapper
      gherkinQuery={gherkinQuery}
      cucumberQuery={cucumberQuery}
      envelopesQuery={envelopesQuery}
      {...searchFromURLParams()}
    >
      <FilteredResults className="html-formatter" />
    </QueriesWrapper>
  </CucumberReact>
)

ReactDOM.render(app, document.getElementById('content'))
