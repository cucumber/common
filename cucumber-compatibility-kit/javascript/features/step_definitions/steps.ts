import { When } from 'fake-cucumber'

When('the string {word} is attached as {word}', function(text: string, contentType: string) {
  this.attach(text, contentType)
})
