/* eslint-env mocha */
const assert = require('assert')
const TreeRegexp = require('../src/tree_regexp')

describe('TreeRegexp', () => {
  it('builds tree', () => {
    const tr = new TreeRegexp(/(a(?:b)?)(c)/)
    const group = tr.match('ac')
    assert.equal(group.value, 'ac')
    assert.equal(group.children[0].value, 'a')
    assert.deepEqual(group.children[0].children, [])
    assert.equal(group.children[1].value, 'c')
  })

  it('ignores non-capturing groups', () => {
    const tr = new TreeRegexp(/(a(?:b)?)(c)/)
    const group = tr.match('ac')
    assert.equal(group.value, 'ac')
    assert.equal(group.children[0].value, 'a')
    assert.deepEqual(group.children[0].children, [])
    assert.equal(group.children[1].value, 'c')
  })

  it('matches optional group', () => {
    const tr = new TreeRegexp(/^Something( with an optional argument)?/)
    const group = tr.match('Something')
    assert.equal(group.children[0].value, null)
  })

  it('matches nested groups', () => {
    const tr = new TreeRegexp(
      /^A (\d+) thick line from ((\d+),\s*(\d+),\s*(\d+)) to ((\d+),\s*(\d+),\s*(\d+))/
    )
    const group = tr.match('A 5 thick line from 10,20,30 to 40,50,60')

    assert.equal(group.children[0].value, '5')
    assert.equal(group.children[1].value, '10,20,30')
    assert.equal(group.children[1].children[0].value, '10')
    assert.equal(group.children[1].children[1].value, '20')
    assert.equal(group.children[1].children[2].value, '30')
    assert.equal(group.children[2].value, '40,50,60')
    assert.equal(group.children[2].children[0].value, '40')
    assert.equal(group.children[2].children[1].value, '50')
    assert.equal(group.children[2].children[2].value, '60')
  })

  it('detects multiple non capturing groups', () => {
    const tr = new TreeRegexp(/(?:a)(:b)(\?c)(d)/)
    const group = tr.match('a:b?cd')
    assert.equal(group.children.length, 3)
  })

  it('captures non capturing groups with capturing groups inside', () => {
    const tr = new TreeRegexp('the stdout(?: from "(.*?)")?')
    const group = tr.match('the stdout')
    assert.equal(group.value, 'the stdout')
    assert.equal(group.children[0].value, null)
    assert.equal(group.children.length, 1)
  })
})
