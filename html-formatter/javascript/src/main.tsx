import * as messages from '@cucumber/messages'
import { components, searchFromURLParams } from '@cucumber/react'
import React from 'react'
import ReactDOM from 'react-dom'
import './styles.scss'

const { CucumberReact } = components
const { FilteredResults, EnvelopesWrapper, SearchWrapper } = components.app

declare global {
  interface Window {
    CUCUMBER_MESSAGES: messages.Envelope[]
  }
}

const app = (
  <CucumberReact theme="auto">
    <EnvelopesWrapper envelopes={window.CUCUMBER_MESSAGES}>
      <SearchWrapper {...searchFromURLParams()}>
        <FilteredResults className="html-formatter" />
      </SearchWrapper>
    </EnvelopesWrapper>
  </CucumberReact>
)

ReactDOM.render(app, document.getElementById('content'))
