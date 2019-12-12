import { When } from 'fake-cucumber'

When('the string {string} is attached as {string}', function(
  text: string,
  contentType: string
) {
  this.attach(text, contentType)
})

When('{int} bytes are attached as {string}', function(
  size: number,
  contentType: string
) {
  const data: number[] = []
  for (let i = 0; i < size; i++) {
    data[i] = i % 256
  }
  this.attach(Buffer.from(data), contentType)
})
