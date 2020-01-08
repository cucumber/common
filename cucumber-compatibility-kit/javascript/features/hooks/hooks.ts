import assert from 'assert'
import { When, Before, After } from 'fake-cucumber'

Before(function() {
})

When('a step passes', function() {
  // no-op
})

When('a step throws an exception', function() {
  throw new Error('Exception in step')
})

After(function() {
  throw new Error('Exception in hook')
})

After('@some-tag or @some-other-tag', function() {
  throw new Error('Exception in conditional hook')
})
