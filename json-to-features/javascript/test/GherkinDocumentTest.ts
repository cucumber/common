import GherkinDocument from '../src/GherkinDocument'
import assert from 'assert'
import Feature from '../src/Feature'

describe('GherkinDocument', () => {
  context('#toFile', () => {
    it('returns an ExportFile with the path to the document', () => {
      const document = new GherkinDocument('path/to/the.feature')

      assert.equal(document.toFile().path, 'path/to/the.feature')
    })

    it('outputs feature content', () => {
      const document = new GherkinDocument(
        'path/to/the.feature',
        new Feature(
          4,
          'Feature',
          'My feature',
          '  This is a feature\n  described on multiple lines'
        )
      )

      assert.equal(
        document.toFile().content,
        `


Feature: My feature
  This is a feature
  described on multiple lines
`
      )
    })
  })
})
