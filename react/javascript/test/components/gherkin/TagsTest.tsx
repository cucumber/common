import assert from 'assert'
import ReactDOM from 'react-dom'
import React from 'react'
import { JSDOM } from 'jsdom'
import * as messages from '@cucumber/messages'
import Description from '../../../src/components/gherkin/Description'
import Tags from '../../../src/components/gherkin/Tags'

describe('Tags', () => {
  function render(tags: messages.Tag[]): Document {
    const dom = new JSDOM('<html lang="en"><body><div id="content"></div></body></html>')
    // @ts-ignore
    global.window = dom.window
    // global.navigator = dom.window.navigator
    const document = dom.window.document

    const app = (
      <Tags tags={tags}/>
    )
    ReactDOM.render(app, document.getElementById('content'))
    return document
  }

  it('doesnt render anything if no tags', () => {
    const document = render([])
    const rendered = document.getElementById('content')
    assert.strictEqual(rendered.innerHTML, '')
  })

  it('renders if we really have some tags', () => {
    const document = render([
      {
        location: {
          line: 1
        },
        name: '@foo',
        id: '1'
      },
      {
        location: {
          line: 3
        },
        name: '@bar',
        id: '2'
      },
    ])
    const rendered = document.querySelectorAll('#content ul li')
    assert.strictEqual(rendered.length, 2)
  })
})
