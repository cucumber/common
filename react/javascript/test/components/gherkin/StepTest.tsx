import assert from 'assert'
import ReactDOM from 'react-dom'
import React from 'react'
import { messages } from '@cucumber/messages'
import { Query as CucumberQuery } from '@cucumber/query'
import Step from '../../../src/components/gherkin/Step'
import { JSDOM } from 'jsdom'

import UriContext from '../../../src/UriContext'
import GherkinQueryContext from '../../../src/contexts/GherkinQueryContext'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import CucumberQueryContext from '../../../src/contexts/CucumberQueryContext'
import { IAttachmentProps } from '../../../src/components/gherkin/Attachment'
import MessageToComponentMappingContext from '../../../src/contexts/MessageToComponentMappingContext'

describe('<Step>', () => {
  const dom = new JSDOM(
    '<html lang="en"><body><div id="content"></div></body></html>'
  )
  // @ts-ignore
  global.window = dom.window
  // global.navigator = dom.window.navigator
  const document = dom.window.document

  const step = new messages.GherkinDocument.Feature.Step({
    keyword: 'Given',
    text: 'the 48 pixies',
    location: new messages.Location({ column: 1, line: 1 }),
  })

  it('renders', () => {
    const app = (
      <GherkinQueryContext.Provider value={new StubGherkinQuery()}>
        <UriContext.Provider value={'some.feature'}>
          <CucumberQueryContext.Provider
            value={new StubCucumberQueryWithArguments()}
          >
            <Step
              step={step}
              renderStepMatchArguments={true}
              renderMessage={true}
            />
          </CucumberQueryContext.Provider>
        </UriContext.Provider>
      </GherkinQueryContext.Provider>
    )
    ReactDOM.render(app, document.getElementById('content'))

    const plainTexts = Array.from(
      document.querySelectorAll(
        '#content h3 .cucumber-step__text, #content h3 .cucumber-step__keyword'
      )
    ).map((span) => span.textContent)
    assert.deepStrictEqual(plainTexts, ['Given', 'the ', ' pixies'])

    const paramTexts = Array.from(
      document.querySelectorAll('#content h3 .cucumber-step__param')
    ).map((a) => a.textContent)
    assert.deepStrictEqual(paramTexts, ['48'])
  })

  it('renders attachments', () => {
    const app = (
      <GherkinQueryContext.Provider value={new StubGherkinQuery()}>
        <UriContext.Provider value={'some.feature'}>
          <CucumberQueryContext.Provider
            value={new StubCucumberQueryWithTextAttachment()}
          >
            <Step
              step={step}
              renderStepMatchArguments={true}
              renderMessage={true}
            />
          </CucumberQueryContext.Provider>
        </UriContext.Provider>
      </GherkinQueryContext.Provider>
    )

    ReactDOM.render(app, document.getElementById('content'))
    const attachmentsText = Array.from(
      document.querySelectorAll('#content .cucumber-attachments')
    )
      .map((span) => span.textContent)
      .join('\n')
    assert.ok(
      attachmentsText.includes('This is an attached text'),
      `Expected "${attachmentsText}" to include "This is an attached text"`
    )
  })

  it('looks up attachments using MessageToComponentMappingContext', () => {
    const CapitalizedAttachment: React.FunctionComponent<IAttachmentProps> = ({
      attachment,
    }) => {
      return <div>{attachment.body.toUpperCase()}</div>
    }
    const messageToComponentMapping = { attachment: CapitalizedAttachment }

    const app = (
      <GherkinQueryContext.Provider value={new StubGherkinQuery()}>
        <UriContext.Provider value={'some.feature'}>
          <CucumberQueryContext.Provider
            value={new StubCucumberQueryWithTextAttachment()}
          >
            <MessageToComponentMappingContext.Provider
              value={messageToComponentMapping}
            >
              <Step
                step={step}
                renderStepMatchArguments={true}
                renderMessage={true}
              />
            </MessageToComponentMappingContext.Provider>
          </CucumberQueryContext.Provider>
        </UriContext.Provider>
      </GherkinQueryContext.Provider>
    )

    ReactDOM.render(app, document.getElementById('content'))

    const attachmentsText = Array.from(
      document.querySelectorAll('#content .cucumber-attachments')
    )
      .map((span) => span.textContent)
      .join('\n')
    assert.ok(
      attachmentsText.includes('THIS IS AN ATTACHED TEXT'),
      `Expected "${attachmentsText}" to include "THIS IS AN ATTACHED TEXT"`
    )
  })
})

class StubGherkinQuery extends GherkinQuery {
  getPickleStepIds(): string[] {
    return ['dummy-id']
  }
}

class StubCucumberQueryWithArguments extends CucumberQuery {
  public getStepMatchArgumentsLists(): messages.TestCase.TestStep.IStepMatchArgumentsList[] {
    return [
      new messages.TestCase.TestStep.StepMatchArgumentsList({
        stepMatchArguments: [
          new messages.TestCase.TestStep.StepMatchArgumentsList.StepMatchArgument(
            {
              group: new messages.TestCase.TestStep.StepMatchArgumentsList.StepMatchArgument.Group(
                {
                  start: 4,
                  value: '48',
                  children: [],
                }
              ),
            }
          ),
        ],
      }),
    ]
  }
}

class StubCucumberQueryWithTextAttachment extends CucumberQuery {
  public getStepMatchArgumentsLists(): messages.TestCase.TestStep.IStepMatchArgumentsList[] {
    return []
  }

  public getPickleStepAttachments(): messages.IAttachment[] {
    return [
      new messages.Attachment({
        body: 'This is an attached text',
        mediaType: 'text/plain',
        contentEncoding: messages.Attachment.ContentEncoding.IDENTITY,
      }),
    ]
  }
}
