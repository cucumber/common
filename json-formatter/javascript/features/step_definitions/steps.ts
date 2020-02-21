import { Given, Then, When } from '@cucumber/fake-cucumber'

Given('a passed {word}', (word: string) => undefined)

Given('a passed {word} with', (word: string, arg: any) => undefined)

Given('a passed {word} with text attachment {string}', function(word: string, attachmentText: string) {
  this.attach(attachmentText, 'text/plain')
})

Given('a step outputs:', function(txt: string) {
  this.log(txt)
})

When('a failed {word}', () => {
  throw new Error('Some error')
})

When('a failed {word} with', () => {
  throw new Error('Some error')
})

Then('a skipped {word}', (word: string) => {
  throw new Error('Should never be called')
})
