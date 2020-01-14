// import { Given, When } from '@cucumber/fake-cucumber'
// We're running with --globals which makes API available globally.
// It's generally not recommended, but we do it here just to avoid a
// runtime error when loading `fake-cucumber` because we don't have
// any node modules in this project.

Given('a passed step', () => undefined)

When('a failed step', () => {
  throw new Error('Some error') 
})
