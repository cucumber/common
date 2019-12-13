import { When } from 'fake-cucumber'

When('the string {string} is attached as {string}', function(
  text: string,
  mediaType: string
) {
  this.attach(text, mediaType)
})

When('{int} bytes are attached as {string}', function(
  size: number,
  mediaType: string
) {
  const data = [...Array(size).keys()]
  const buffer = Buffer.from(data)
  this.attach(buffer, mediaType)
})
