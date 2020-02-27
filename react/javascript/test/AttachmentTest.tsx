import { JSDOM } from 'jsdom'
import ReactDOM from 'react-dom'
import React from 'react'
import BtoaContext from '../src/BtoaContext'
import Attachment from '../src/components/gherkin/Attachment'
import { messages } from '@cucumber/messages'
import * as assert from 'assert'

function nodejsBtoa(data: string): string {
  return Buffer.from(data).toString('base64')
}

describe('<Attachment>', () => {
  it('renders an image', () => {
    const dom = new JSDOM(
      '<html lang="en"><body><div id="content"></div></body></html>'
    )
    // @ts-ignore
    global.window = dom.window
    // global.navigator = dom.window.navigator
    const document = dom.window.document

    const binary = new Uint8Array(10)
    binary.fill(255, 0, binary.length)
    const attachment = messages.Attachment.create({
      mediaType: 'image/png',
      binary,
    })
    const attachmentElement = (
      <BtoaContext.Provider value={nodejsBtoa}>
        <Attachment attachment={attachment} />
      </BtoaContext.Provider>
    )
    ReactDOM.render(attachmentElement, document.getElementById('content'))

    const img = document.querySelector('#content img')
    assert.strictEqual(
      img.getAttribute('src'),
      'data:image/png;base64,w7/Dv8O/w7/Dv8O/w7/Dv8O/w78='
    )
  })
})
