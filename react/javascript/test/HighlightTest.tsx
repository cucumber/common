import assert from 'assert'
import ReactDOM from 'react-dom'
import React from 'react'
import HighLight from '../src/components/app/HighLight'
import { JSDOM } from 'jsdom'
import SearchQueryContext from '../src/SearchQueryContext'

describe('HighLight', () => {
  function renderHighlight(text: string, query: string): Document {
    const dom = new JSDOM(
      '<html lang="en"><body><div id="content"></div></body></html>'
    )
    // @ts-ignore
    global.window = dom.window
    // global.navigator = dom.window.navigator
    const document = dom.window.document

    const app = (
      <SearchQueryContext.Provider value={{ query: query }}>
        <HighLight text={text} />
      </SearchQueryContext.Provider>
    )
    ReactDOM.render(app, document.getElementById('content'))
    return document
  }

  it('renders', () => {
    const document = renderHighlight(
      'Some text with a keyword inside',
      'keyword'
    )
    const highlighted = Array.from(
      document.querySelectorAll('#content mark')
    ).map((span) => span.textContent)

    assert.deepStrictEqual(highlighted, ['keyword'])
  })

  it('highlights the stemmed query words', () => {
    const document = renderHighlight(
      'This step has failed when a failure occured (so it fails)',
      'failed'
    )
    const highlighted = Array.from(
      document.querySelectorAll('#content mark')
    ).map((span) => span.textContent)

    // The first one is the exact match.
    // The second one correponds to the "failure" word, which stem is "fail"
    // The third one corresponds to the "fails" word
    assert.deepStrictEqual(highlighted, ['failed', 'fail', 'fail'])
  })

  it('may highlight multiple words and stems', () => {
    const document = renderHighlight(
      'Given a passed step\nWhen a failed step\nThen a skipped step',
      'step fail pass skipped'
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
})
