import { When } from '@cucumber/fake-cucumber'

When('a step throws an exception', function() {
  throw new Error('BOOM')
})
