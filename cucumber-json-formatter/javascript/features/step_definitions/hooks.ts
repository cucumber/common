import { After, Before } from '@cucumber/fake-cucumber'

Before('@before-passed', function() {
})

After('@after-failed', function() {
  throw new Error('Something went wrong')
})
