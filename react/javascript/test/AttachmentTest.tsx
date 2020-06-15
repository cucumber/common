import { JSDOM } from 'jsdom'
import ReactDOM from 'react-dom'
import React from 'react'
import Attachment from '../src/components/gherkin/Attachment'
import { messages } from '@cucumber/messages'
import assert from 'assert'

describe('<Attachment>', () => {
  it('renders an image', () => {
    const dom = new JSDOM(
      '<!DOCTYPE html><html lang="en"><body><div id="content"></div></body></html>'
    )
    // React complains if we don't do this
    // @ts-ignore
    global.window = dom.window

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

  it('renders base64 encoded plaintext', () => {
    const dom = new JSDOM(
      '<!DOCTYPE html><html lang="en"><body><div id="content"></div></body></html>'
    )
    // React complains if we don't do this
    // @ts-ignore
    global.window = dom.window

    const document = dom.window.document

    const attachment = messages.Attachment.create({
      mediaType: 'text/plain',
      body: Buffer.from('hello').toString('base64'),
      contentEncoding: messages.Attachment.ContentEncoding.BASE64,
    })
    const attachmentElement = <Attachment attachment={attachment} />
    ReactDOM.render(attachmentElement, document.getElementById('content'))

    const pre = document.querySelector('#content pre')
    assert.strictEqual(pre.textContent, 'hello')
  })

  it('correctly renders ANSI characters', () => {
    const dom = new JSDOM(
      '<!DOCTYPE html><html lang="en"><body><div id="content"></div></body></html>'
    )
    // React complains if we don't do this
    // @ts-ignore
    global.window = dom.window

    const document = dom.window.document

    const attachment = messages.Attachment.create({
      mediaType: 'text/x.cucumber.log+plain',
      body: '\x1b[30mblack\x1b[37mwhite',
      contentEncoding: messages.Attachment.ContentEncoding.IDENTITY,
    })
    const attachmentElement = <Attachment attachment={attachment} />
    ReactDOM.render(attachmentElement, document.getElementById('content'))

    const span = document.querySelector('#content pre > span')
    assert.strictEqual(
      span.innerHTML,
      '<span style="color:#000">black<span style="color:#AAA">white</span></span>'
    )
  })
})
