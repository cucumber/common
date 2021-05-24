import { Given, When, Then, DataTable } from '@cucumber/fake-cucumber'

Given('some TypeScript code:', function (dataTable: DataTable) {
})

Given('some classic Gherkin:', function (gherkin: string) {
})

When('we use a data table and attach something and then {word}', function (word: string, dataTable: DataTable) {
  this.log(`We are logging some plain text (${word})`)
  if(word === 'fail') {
    throw new Error('You asked me to fail')
  }
})

Then('this might or might not run', function () {
})
