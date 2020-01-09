import { Given, When, Then } from '@cucumber/fake-cucumber'

Given('a passed step', (table: string[][]) => {

})

When('a step has failed', () => {
  throw new Error('Oh no we have an error')
})
