import assert from 'assert'
import ReactDOM from 'react-dom'
import React from 'react'
import { JSDOM } from 'jsdom'
import Tags from '../../../src/components/gherkin/Tags'
import CustomRendering from '../../../src/components/customise/CustomRendering'
import * as messages from '@cucumber/messages'

describe('custom rendering and theming', () => {
  it('uses the generated class names from built-in styles by default', () => {
    const dom = new JSDOM('<html lang="en"><body><div id="content"></div></body></html>')
    // @ts-ignore
    global.window = dom.window
    // global.navigator = dom.window.navigator
    const document = dom.window.document

    const tags: messages.Tag[] = [
      {
        id: '123',
        name: 'sometag',
        location: {
          line: 1,
          column: 1,
        },
      },
    ]

    const app = <Tags tags={tags} />
    ReactDOM.render(app, document.getElementById('content'))

    assert.equal(document.querySelector('ul').className, 'tags__generated')
    assert.equal(document.querySelector('ul > li').className, 'tag__generated')
  })

  it('uses the custom classnames provided via custom rendering', () => {
    const dom = new JSDOM('<html lang="en"><body><div id="content"></div></body></html>')
    // @ts-ignore
    global.window = dom.window
    // global.navigator = dom.window.navigator
    const document = dom.window.document

    const tags: messages.Tag[] = [
      {
        id: '123',
        name: 'sometag',
        location: {
          line: 1,
          column: 1,
        },
      },
    ]

    const app = (
      <CustomRendering
        support={{
          Tags: {
            tags: 'custom-list-class',
            tag: 'custom-item-class',
          },
        }}
      >
        <Tags tags={tags} />
      </CustomRendering>
    )
    ReactDOM.render(app, document.getElementById('content'))

    assert.equal(document.querySelector('ul').className, 'custom-list-class')
    assert.equal(document.querySelector('ul > li').className, 'custom-item-class')
  })

  it('uses a partial of custom classes and falls back to built-in styles where omitted', () => {
    const dom = new JSDOM('<html lang="en"><body><div id="content"></div></body></html>')
    // @ts-ignore
    global.window = dom.window
    // global.navigator = dom.window.navigator
    const document = dom.window.document

    const tags: messages.Tag[] = [
      {
        id: '123',
        name: 'sometag',
        location: {
          line: 1,
          column: 1,
        },
      },
    ]

    const app = (
      <CustomRendering
        support={{
          Tags: {
            tags: 'custom-list-class',
          },
        }}
      >
        <Tags tags={tags} />
      </CustomRendering>
    )
    ReactDOM.render(app, document.getElementById('content'))

    assert.equal(document.querySelector('ul').className, 'custom-list-class')
    assert.equal(document.querySelector('ul > li').className, 'tag__generated')
  })

  it('uses a custom component implementation where provided', () => {
    const dom = new JSDOM('<html lang="en"><body><div id="content"></div></body></html>')
    // @ts-ignore
    global.window = dom.window
    // global.navigator = dom.window.navigator
    const document = dom.window.document

    const tags: messages.Tag[] = [
      {
        id: '123',
        name: 'sometag',
        location: {
          line: 1,
          column: 1,
        },
      },
    ]

    const CustomComponent = () => {
      return <p>Totally custom!</p>
    }

    const app = (
      <CustomRendering
        support={{
          Tags: CustomComponent,
        }}
      >
        <Tags tags={tags} />
      </CustomRendering>
    )
    ReactDOM.render(app, document.getElementById('content'))

    assert.equal(document.getElementById('content').innerHTML, '<p>Totally custom!</p>')
  })

  it('a custom component can defer to the default renderer if it wants to', () => {
    const dom = new JSDOM('<html lang="en"><body><div id="content"></div></body></html>')
    // @ts-ignore
    global.window = dom.window
    // global.navigator = dom.window.navigator
    const document = dom.window.document

    const tags: messages.Tag[] = [
      {
        id: '123',
        name: 'sometag',
        location: {
          line: 1,
          column: 1,
        },
      },
    ]

    const CustomComponent = (props: any) => {
      return <props.DefaultRenderer {...props} />
    }

    const app = (
      <CustomRendering
        support={{
          Tags: CustomComponent,
        }}
      >
        <Tags tags={tags} />
      </CustomRendering>
    )
    ReactDOM.render(app, document.getElementById('content'))

    assert.equal(document.querySelector('ul').className, 'tags__generated')
    assert.equal(document.querySelector('ul > li').className, 'tag__generated')
  })
})
