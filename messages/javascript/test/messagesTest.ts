import assert from 'assert'
import { GherkinDocument } from '../src/index'

describe('messages', () => {
  it('can be imported', () => {
    const gherkinDocument: GherkinDocument = { uri: 'blablabla', comments: [] }
    assert(gherkinDocument)
  })
})
