import assert from 'assert'
import ReactDOM from 'react-dom'
import React from 'react'
import { JSDOM } from 'jsdom'
import Description from '../../../src/components/gherkin/Description'

describe('Description', () => {
  function render(description?: string): Document {
    const dom = new JSDOM('<html lang="en"><body><div id="content"></div></body></html>')
    // @ts-ignore
    global.window = dom.window
    // global.navigator = dom.window.navigator
    const document = dom.window.document

    const app = (
      <Description description={description}/>
    )
    ReactDOM.render(app, document.getElementById('content'))
    return document
  }

  it('doesnt render anything if description empty', () => {
    const document = render('')
    const rendered = document.getElementById('content')
    assert.strictEqual(rendered.innerHTML, '')
  })

  it('doesnt render anything if description is just whitespace', () => {
    const document = render('  ')
    const rendered = document.getElementById('content')
    assert.strictEqual(rendered.innerHTML, '')
  })

  it('doesnt render anything if description is just whitespace including newlines', () => {
    const document = render(`
    
    `)
    const rendered = document.getElementById('content')
    assert.strictEqual(rendered.innerHTML, '')
  })

  it('renders if we really have a description', () => {
    const document = render('## This is a heading')
    const rendered = document.querySelector('#content h2')
    assert.strictEqual(rendered.innerHTML, 'This is a heading')
  })
})
