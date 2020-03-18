import GherkinDocument from '../src/GherkinDocument'
import assert from 'assert'

describe('GherkinDocument', () => {
  context('#toFile', () => {
    it('returns an ExportFile with the path to the document', () => {
      const document = new GherkinDocument('path/to/the.feature')

      assert.equal(document.toFile().path, 'path/to/the.feature')
    })
  })
})
