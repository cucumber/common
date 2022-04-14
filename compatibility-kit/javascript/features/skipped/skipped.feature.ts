import { Before, Given } from '@cucumber/fake-cucumber'

Before('@skip', function () {
  return 'skipped'
})

Given('an implemented step', function () {
  // no-op
})

Given('a step that we expect to be skipped', function () {
  // no-op
})

Given('a step that skips', function () {
  return 'skipped'
})
