import assert from 'assert'
import ReactDOM from 'react-dom'
import React from 'react'
import HighLight from '../src/components/app/HighLight'
import { JSDOM } from 'jsdom'
import SearchQueryContext from '../src/SearchQueryContext'

describe('HighLight', () => {
  function renderHighlight(
    text: string,
    query: string,
    markdown: boolean
  ): Document {
    const dom = new JSDOM(
      '<html lang="en"><body><div id="content"></div></body></html>'
    )
    // @ts-ignore
    global.window = dom.window
    // global.navigator = dom.window.navigator
    const document = dom.window.document

    const app = (
      <SearchQueryContext.Provider value={{ query: query }}>
        <HighLight text={text} markdown={markdown} />
      </SearchQueryContext.Provider>
    )
    ReactDOM.render(app, document.getElementById('content'))
    return document
  }

  it('puts <mark> around exact matches', () => {
    const document = renderHighlight(
      'Some text with a keyword inside',
      'keyword',
      false
    )
    const highlighted = Array.from(
      document.querySelectorAll('#content mark')
    ).map((span) => span.textContent)

    assert.deepStrictEqual(highlighted, ['keyword'])
  })

  it('puts <mark> around stemmed query words', () => {
    const document = renderHighlight(
      'This step has failed when a failure occurred (so it fails)',
      'failed',
      false
    )
    const highlighted = Array.from(
      document.querySelectorAll('#content mark')
    ).map((span) => span.textContent)

    // The first one is the exact match.
    // The second one corresponds to the "failure" word, which stem is "fail"
    // The third one corresponds to the "fails" word
    assert.deepStrictEqual(highlighted, ['failed', 'fail', 'fail'])
  })

  it('puts <mark> around multiple words and stems', () => {
    const document = renderHighlight(
      'Given a passed step\nWhen a failed step\nThen a skipped step',
      'step fail pass skipped',
      false
    )
    const highlighted = Array.from(
      document.querySelectorAll('#content mark')
    ).map((span) => span.textContent)

    assert.deepStrictEqual(highlighted, [
      'pass',
      'step',
      'fail',
      'step',
      'skipped',
      'step',
    ])
  })

  it('puts <mark> around matches in markdown', () => {
    const document = renderHighlight(
      '* This is\n* a bullet list',
      'bullet',
      true
    )
    const highlighted = Array.from(
      document.querySelectorAll('#content mark')
    ).map((span) => span.textContent)

    assert.deepStrictEqual(highlighted, ['bullet'])
  })
})
