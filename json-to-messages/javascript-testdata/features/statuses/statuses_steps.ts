import { When } from '@cucumber/cucumber'

When('a passed step', function () {
  // no-op
})

When('a failed step', function () {
  throw new Error('BOOM !')
})

When('a pending step', function () {
  return 'pending'
})
