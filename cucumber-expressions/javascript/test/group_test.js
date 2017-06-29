/* eslint-env mocha */
const assert = require('assert')
const Group = require('../src/group')
const Regex = require('becke-ch--regex--s0-0-v1--base--pl--lib')

describe('Group', () => {
  it('matches optional group', () => {
    const regex = new Regex(/^Something( with an optional argument)?/)
    const string = 'Something'
    const matches = regex.exec(string)
    const group = new Group(matches)

    assert.equal(group.children[0].value, null)
  })

  it('matches two groups', () => {
    const regex = new Regex(/^the step "([^"]*)" has status "([^"]*)"$/)
    const string = 'the step "a pending step" has status "pending"'
    const matches = regex.exec(string)
    const group = new Group(matches)

    assert.equal(group.children[0].value, 'a pending step')
    assert.equal(group.children[1].value, 'pending')
  })

  it('matches nested groups with same match data', () => {
    const regex = new Regex(/^the step "(a ([^"]*) step)"$/)
    const string = 'the step "a pending step"'
    const matches = regex.exec(string)
    const group = new Group(matches)

    assert.equal(group.children[0].value, 'a pending step')
    assert.equal(group.children[0].children[0].value, 'pending')
  })

  it('matches nested groups', () => {
    const regex = new Regex(
      /^A (\d+) thick line from ((\d+),\s*(\d+),\s*(\d+)) to ((\d+),\s*(\d+),\s*(\d+))?/
    )
    const string = 'A 5 thick line from 10,20,30 to 40,50,60'

    const matches = regex.exec(string)
    const group = new Group(matches)

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
