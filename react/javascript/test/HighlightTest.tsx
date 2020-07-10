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
    htmlText = false
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
        <HighLight text={text} htmlText={htmlText} />
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

  context('when htmlContent is not set', () => {
    it('escapes HTML characters', () => {
      const document = renderHighlight(
        '<span>Given</span> a passed step',
        'step'
      )
      const highlighted = Array.from(
        document.querySelectorAll('#content .highlight')
      )
        .map((span) => span.innerHTML)
        .join('')

      assert.equal(
        highlighted,
        '<span>&lt;span&gt;Given&lt;/span&gt; a passed </span><mark>step</mark>'
      )
    })

    it('also highlight the tags', () => {
      const document = renderHighlight(
        '<strong>Given</strong> a strong step',
        'strong'
      )
      const highlighted = Array.from(
        document.querySelectorAll('#content .highlight')
      )
        .map((span) => span.innerHTML)
        .join('')

      assert.equal(
        highlighted,
        '<span>&lt;</span><mark>strong</mark><span>&gt;Given&lt;/</span><mark>strong</mark><span>&gt; a </span><mark>strong</mark><span> step</span>'
      )
    })
  })

  context('when htmlContent is set to true', () => {
    it('keeps the HTML content', () => {
      const document = renderHighlight(
        '<em>Given</em> a passed step',
        'step',
        true
      )
      const highlighted = Array.from(
        document.querySelectorAll('#content .highlight')
      )
        .map((span) => span.innerHTML)
        .join('')

      assert.equal(highlighted, '<em>Given</em> a passed <mark>step</mark>')
    })

    it('does not highlight the tags', () => {
      const document = renderHighlight(
        '<strong>Given</strong> a strong step',
        'strong',
        true
      )
      const highlighted = Array.from(
        document.querySelectorAll('#content .highlight')
      )
        .map((span) => span.innerHTML)
        .join('')

      assert.equal(
        highlighted,
        '<strong>Given</strong> a <mark>strong</mark> step'
      )
    })
  })
})
