import assert from 'assert'
import isTagExpression from '../src/is_tag_expression'

describe('isTagExpression', () => {
  it('returns false with empty string', () => {
    assert.strictEqual(isTagExpression(''), false)
  })

  it('returns false when there is no tag in the expression', () => {
    assert.strictEqual(isTagExpression('Something'), false)
  })

  it('returns true when with a tag', () => {
    assert.strictEqual(isTagExpression('@something'), true)
  })

  it('is pretty permisive on what a tag is', () => {
    assert.strictEqual(isTagExpression('@&é"(§è!çà)-'), true)
  })

  it('accepts spaces arounds the tag', () => {
    assert.strictEqual(isTagExpression('  @something  '), true)
  })

  it('recognises "and", "or" and "not" keywords', () => {
    assert.strictEqual(isTagExpression('@2b or not @2b'), true)
    assert.strictEqual(isTagExpression('@turner and @hootch'), true)
  })

  it('needs non-keyords to be tags to be recognized as tag expressions', () => {
    assert.strictEqual(isTagExpression('2b or not 2b'), false)
    assert.strictEqual(isTagExpression('turner and hootch'), false)
  })

  it('accepts parenthesis in an expression', () => {
    assert.strictEqual(isTagExpression('(@2b or not @2b) and @true'), true)
  })

  it('does not ensure parenthesis are correctly written that said ...', () => {
    assert.strictEqual(isTagExpression('((((@2b or )not @2b) and @true'), true)
  })
})
