import assert from 'assert'
import { Given, When, Then } from '@cucumber/fake-cucumber'

Given('some TypeScript code:', function (dataTable: string[][]) {
  assert(dataTable)
})

Given('some classic Gherkin:', function (gherkin: string) {
  assert(gherkin)
})

When(
  'we use a data table and attach something and then {word}',
  function (word: string, dataTable: string[][]) {
    assert(dataTable)
    this.log(`We are logging some plain text (${word})`)
    if (word === 'fail') {
      throw new Error('You asked me to fail')
    }
  }
)

Then('this might or might not run', function () {
  // no-op
})
