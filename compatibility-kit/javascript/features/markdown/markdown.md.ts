import assert from 'assert'
import { Given, When } from '@cucumber/fake-cucumber'

Given('the following step definition:', function (code: string) {
  assert(code)
})

Given('the following Gherkin step:', function (gherkin: string) {
  assert(gherkin)
})

When('the step runs', function () {
  throw new Error('An exception was thrown')
})
