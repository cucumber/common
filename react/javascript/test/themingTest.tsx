import assert from 'assert'
import ReactDOM from 'react-dom'
import React from 'react'
import { JSDOM } from 'jsdom'
import Tags from '../src/components/gherkin/Tags'

describe('theming', () => {
  it('uses the generated class names from built-in styles by default', () => {
    const dom = new JSDOM('<html lang="en"><body><div id="content"></div></body></html>')
    // @ts-ignore
    global.window = dom.window
    // global.navigator = dom.window.navigator
    const document = dom.window.document

    const tags = [
      {
        name: 'sometag',
      },
      {
        name: 'othertag',
      },
    ]

    const app = <Tags tags={tags} />
    ReactDOM.render(app, document.getElementById('content'))

    assert.equal(document.querySelector('ul').className, 'tags__generated')
    assert.equal(document.querySelector('ul > li').className, 'tag__generated')
  })
})
