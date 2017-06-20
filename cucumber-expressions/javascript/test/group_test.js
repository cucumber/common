/* eslint-env mocha */
const assert = require('assert')
const Group = require('../src/group')

describe('Group', () => {
  it('matches optional group', () => {
    const regexp = /^Something( with an optional argument)?/
    const string = 'Something'
    const matches = regexp.exec(string)
    const group = new Group(matches, string)

    assert.equal(null, group.children[0].value)
  })

  it('matches nested groups', () => {
    const regexp = /^A (\d+) thick line from ((\d+),\s*(\d+),\s*(\d+)) to ((\d+),\s*(\d+),\s*(\d+))?/
    const string = 'A 5 thick line from 10,20,30 to 40,50,60'

    const matches = regexp.exec(string)
    const group = new Group(matches, string)

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
})
