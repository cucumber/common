import { After, Before } from '../src/dsl'

Before('@before-passed', () => {
  // no-op
})

Before('@before-failed', () => {
  throw new Error('Something went wrong in before hook')
})

After('@after-passed', () => {
  // no-op
})

After('@after-failed', () => {
  throw new Error('Something went wrong in after hook')
})
