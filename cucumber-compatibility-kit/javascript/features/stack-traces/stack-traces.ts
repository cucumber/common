import { When } from 'fake-cucumber'

When('a step throws an exception', function() {
  throw new Error('BOOM')
})
