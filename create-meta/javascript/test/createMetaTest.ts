import createMeta from '../src/createMeta'
import assert from 'assert'

describe('createMeta', () => {
  it('generate a Meta message', () => {
    const meta = createMeta('someTool', '1.2.3')

    assert.equal(meta.implementation.name, 'someTool')
    assert.equal(meta.implementation.version, '1.2.3')
  })
})
