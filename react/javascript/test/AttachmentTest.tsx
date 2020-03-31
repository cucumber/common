import { JSDOM } from 'jsdom'
import ReactDOM from 'react-dom'
import React from 'react'
import Attachment from '../src/components/gherkin/Attachment'
import { messages } from '@cucumber/messages'
import assert from 'assert'

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
      body: 'fake-base64',
      contentEncoding: messages.Attachment.ContentEncoding.BASE64,
    })
    const attachmentElement = <Attachment attachment={attachment} />
    ReactDOM.render(attachmentElement, document.getElementById('content'))

    const img = document.querySelector('#content img')
    assert.strictEqual(
      img.getAttribute('src'),
      'data:image/png;base64,fake-base64'
    )
  })
})
